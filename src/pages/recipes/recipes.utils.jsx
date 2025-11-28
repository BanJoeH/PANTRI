export const filteredRecipesByIngredientAndName = (
  recipeList,
  debouncedSearchTerm
) => {
  let recipes = [];
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

export const updateRecipe = async (item, ref) => {
  let response;
  await ref
    .doc(item.id)
    .update(item)
    .then((response = "succeeded"))
    .catch((error) => {
      response = "failed";
      console.log("error updating recipe", error);
    });
  return response;
};
