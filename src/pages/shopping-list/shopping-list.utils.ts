import type firebase from "firebase/app";
import { debug } from "../../App/debug.utils";
import type {
  Ingredient,
  RawIngredient,
  ShoppingRecipe,
  SortedIngredient,
  WriteResult,
} from "../../types";

const logToggle = debug("toggle");
const logSort = debug("sort");

type CollectionRef = firebase.firestore.CollectionReference;
type DocumentRef = firebase.firestore.DocumentReference;

// Shopping list ingredients are persisted as { name, purchased } objects.
// Older docs may still have raw strings, so we normalize on read.
export const normalizeIngredient = (item: RawIngredient): Ingredient => {
  if (typeof item === "string") {
    return { name: item, purchased: false };
  }
  return { name: item.name, purchased: item.purchased ?? false };
};

export const normalizeIngredients = (
  items?: RawIngredient[] | null,
): Ingredient[] => (items || []).map(normalizeIngredient);

const namesMatch = (a?: string, b?: string): boolean =>
  (a ?? "").toLowerCase() === (b ?? "").toLowerCase();

// Flip `purchased` on a single ingredient instance inside one recipe. Used by
// the recipe-grouped shopping view, where a tick should only mean "I got this
// for *this* recipe" — no fan-out to other recipes. The sorted view uses
// setPurchasedInShoppingList instead, where one tick *should* fan out across
// every matching instance.
export const setPurchasedInRecipeIngredient = async (
  recipeId: string,
  ingredientIndex: number,
  newValue: boolean,
  recipes: ShoppingRecipe[],
  ref: CollectionRef,
): Promise<WriteResult> => {
  const recipe = recipes.find((r) => r.id === recipeId);
  if (!recipe) {
    logToggle("setPurchasedInRecipeIngredient: recipe not found", { recipeId });
    return "noop";
  }
  const updatedIngredients = recipe.ingredients.map((i, idx) =>
    idx === ingredientIndex ? { ...i, purchased: newValue } : i,
  );
  logToggle("setPurchasedInRecipeIngredient", {
    recipeId,
    ingredientIndex,
    newValue,
    updatedIngredients,
  });
  try {
    await ref.doc(recipeId).update({ ingredients: updatedIngredients });
    return "succeeded";
  } catch (error) {
    console.log("error toggling purchased in recipe", error);
    return "failed";
  }
};

// Toggle `purchased` on every ingredient with this name across every recipe in
// the shopping list. The sorted view shows one row per ingredient name, so a
// single tick has to fan out to all matching instances. Matching is
// case-insensitive — stored ingredient names can be mixed case while the
// sorted-view row name is lowercased for grouping.
export const setPurchasedInShoppingList = async (
  ingredientName: string,
  newValue: boolean,
  recipes: ShoppingRecipe[],
  ref: CollectionRef,
): Promise<WriteResult> => {
  const matching = recipes.filter((r) =>
    r.ingredients.some((i) => namesMatch(i.name, ingredientName)),
  );
  logToggle("setPurchasedInShoppingList", {
    ingredientName,
    newValue,
    totalRecipes: recipes.length,
    matchingRecipeIds: matching.map((r) => r.id),
  });
  if (matching.length === 0) {
    // Not necessarily an error — could be an oddBit-only name. Caller is
    // expected to also try setPurchasedInOddBits.
    logToggle("no recipes contained this ingredient (likely an odd bit)", {
      ingredientName,
    });
    return "noop";
  }
  const updates = matching.map((r) => {
    const updatedIngredients = r.ingredients.map((i) =>
      namesMatch(i.name, ingredientName) ? { ...i, purchased: newValue } : i,
    );
    logToggle("updating recipe", {
      recipeId: r.id,
      recipeName: r.name,
      updatedIngredients,
    });
    return ref.doc(r.id).update({ ingredients: updatedIngredients });
  });
  try {
    await Promise.all(updates);
    logToggle("shopping-list writes succeeded");
    return "succeeded";
  } catch (error) {
    console.log("error toggling purchased", error);
    return "failed";
  }
};

// Toggle `purchased` on a matching odd bit on the user profile. OddBits live
// at users/{uid}.oddBits, separate from the shoppingList collection, so they
// need their own writer.
export const setPurchasedInOddBits = async (
  ingredientName: string,
  newValue: boolean,
  oddBits: RawIngredient[] | undefined | null,
  profileRef: DocumentRef,
): Promise<WriteResult> => {
  const normalized = (oddBits || []).filter(Boolean).map(normalizeIngredient);
  if (!normalized.some((b) => namesMatch(b.name, ingredientName))) {
    logToggle("no oddBit matched", { ingredientName });
    return "noop";
  }
  const updated = normalized.map((b) =>
    namesMatch(b.name, ingredientName) ? { ...b, purchased: newValue } : b,
  );
  logToggle("updating oddBits", { updated });
  try {
    await profileRef.set({ oddBits: updated }, { merge: true });
    logToggle("oddBits write succeeded");
    return "succeeded";
  } catch (error) {
    console.log("error toggling oddBit purchased", error);
    return "failed";
  }
};

// Flatten every recipe's ingredients (plus odd bits) into a single sorted list.
// Each row shows: how many recipes call for it, which recipes, and whether the
// user has marked it purchased. A row is purchased only when every underlying
// instance is — that way adding a new recipe with the same ingredient brings
// the row back as "needed".
export const buildSortedIngredients = (
  recipes: ShoppingRecipe[],
  oddBits?: RawIngredient[] | null,
): SortedIngredient[] => {
  logSort("buildSortedIngredients input", {
    recipes: recipes.map((r) => ({
      id: r.id,
      name: r.name,
      ingredients: r.ingredients,
    })),
    oddBits,
  });

  type FlatRow = { name: string; purchased: boolean; source: string };

  const flattened: FlatRow[] = [
    ...recipes.flatMap<FlatRow>((r) =>
      r.ingredients.map((i) => ({
        name: i.name.toLowerCase(),
        purchased: i.purchased,
        source: r.name,
      })),
    ),
    ...(oddBits || [])
      .filter((b): b is RawIngredient => Boolean(b))
      .map(normalizeIngredient)
      // Drop empty placeholder rows that exist only so the OddBits input has
      // somewhere for the user to type — they shouldn't appear in the
      // sorted-shopping list.
      .filter((bit) => bit.name)
      .map<FlatRow>((bit) => ({
        name: bit.name.toLowerCase(),
        purchased: bit.purchased,
        source: "Odd Bits",
      })),
  ];

  // `count` is the number of *still-unpurchased* instances; `totalCount` is
  // the total instances regardless of state. The sorted view renders
  // "X count of totalCount" when partially purchased, "X count" when none are
  // purchased yet, and nothing in the "got it" section (where count = 0).
  const map = new Map<string, SortedIngredient>();
  for (const item of flattened) {
    const existing = map.get(item.name);
    if (existing) {
      if (!item.purchased) existing.count += 1;
      existing.totalCount += 1;
      existing.sources.push(item.source);
      existing.purchased = existing.purchased && item.purchased;
    } else {
      map.set(item.name, {
        name: item.name,
        sources: [item.source],
        count: item.purchased ? 0 : 1,
        totalCount: 1,
        purchased: item.purchased,
      });
    }
  }

  const result = Array.from(map.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  logSort("buildSortedIngredients output", result);
  return result;
};
