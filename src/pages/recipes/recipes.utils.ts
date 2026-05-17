import type firebase from "firebase/app";

// In-memory recipe shape used by the recipe-list view: ingredient strings are
// wrapped as { name } before search, see Recipes component.
type SearchableRecipe = {
  id: string;
  name: string;
  link?: string;
  ingredients: { name: string }[];
};

export const filteredRecipesByIngredientAndName = <T extends SearchableRecipe>(
  recipeList?: T[] | null,
  debouncedSearchTerm?: string,
): T[] => {
  const recipes: T[] = [];
  if (!recipeList) {
    return recipes;
  }
  if (!debouncedSearchTerm) {
    return recipeList;
  }

  recipeList.forEach((recipe) => {
    if (!recipe.name || !recipe.ingredients.length) {
      return;
    } else if (
      // Search the recipeName for the searchTerm
      recipe.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ) {
      recipes.push(recipe);
    } else if (
      // Search the ingredients for the searchTerm
      recipe.ingredients.some((ingredient) => {
        return ingredient.name
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      })
    ) {
      recipes.push(recipe);
    }
  });

  return recipes;
};

export const updateRecipe = async (
  item: { id: string } & object,
  ref: firebase.firestore.CollectionReference,
): Promise<"succeeded" | "failed"> => {
  try {
    await ref.doc(item.id).update(item);
    return "succeeded";
  } catch (error) {
    console.log("error updating recipe", error);
    return "failed";
  }
};
