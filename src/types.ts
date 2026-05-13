// Shared domain types for Pantri. Components and utils throughout the codebase
// import from here so the data model has a single source of truth.

/**
 * A shopping-list ingredient after normalisation. Older docs may still hold
 * raw strings; see `normalizeIngredient` in `pages/shopping-list/shopping-list.utils`.
 */
export type Ingredient = {
  name: string;
  purchased: boolean;
};

/**
 * What we accept on read for a single ingredient. Anything that came out of
 * Firestore — could be the modern object shape or a legacy raw string.
 */
export type RawIngredient = string | { name: string; purchased?: boolean };

/**
 * A recipe living in the shoppingList collection. Its ingredients are
 * normalised objects (post-`normalizeIngredients`).
 */
export type ShoppingRecipe = {
  id: string;
  name: string;
  link?: string;
  ingredients: Ingredient[];
};

/**
 * A row in the sorted-shopping view. Aggregates every instance of an
 * ingredient name across all shopping-list recipes and odd bits.
 *
 * - `count` is the number of *still-unpurchased* instances; drives the badge.
 * - `totalCount` is every instance regardless of state; powers "N of M".
 * - `purchased` is `every instance is purchased` — only true when all are.
 */
export type SortedIngredient = {
  name: string;
  sources: string[];
  count: number;
  totalCount: number;
  purchased: boolean;
};

export const SHOPPING_SECTIONS = [
  "Produce",
  "Meat & Fish",
  "Dairy & Eggs",
  "Bakery",
  "Pantry",
  "Frozen",
  "Household",
  "Other",
] as const;

export type ShoppingSection = (typeof SHOPPING_SECTIONS)[number];

export type IngredientCategoryOverrides = Record<string, ShoppingSection>;

/**
 * Return value of the various `setPurchasedIn*` writers. Lets callers decide
 * whether to fire a notification, retry, etc.
 */
export type WriteResult = "succeeded" | "failed" | "noop";

/**
 * The shape `Card`/`CardList` consume. It's the common subset of recipe
 * templates (ingredients are `{name}` objects, post-mapping in the Recipes
 * page) and shopping-list recipes (ingredients are full `Ingredient` objects).
 * `purchased` is optional because template ingredients don't carry it.
 */
export type CardRecipe = {
  id: string;
  name: string;
  link?: string;
  ingredients: Array<{ name: string; purchased?: boolean }>;
};

/**
 * The shape of a recipe template as stored in Firestore (the `recipes`
 * collection). Distinct from `ShoppingRecipe` — templates store ingredients
 * as plain strings.
 */
export type RecipeTemplate = {
  id: string;
  name: string;
  link?: string;
  ingredients: string[];
};

/**
 * App-specific extension of the react-redux-firebase profile. The standard
 * fields (email, displayName, etc.) come from the library; this adds the
 * fields Pantri stores on the user doc.
 */
export type AppProfile = {
  oddBits?: RawIngredient[];
  ingredientCategories?: IngredientCategoryOverrides;
};

/**
 * Schema for the redux-firestore reducer — the top-level Firestore
 * collections we read into Redux.
 */
export type AppFirestoreSchema = {
  recipes: RecipeTemplate;
  shoppingList: ShoppingRecipe;
};
