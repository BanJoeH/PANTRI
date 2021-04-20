import { notification } from "../../App/app.utils";

export const removeFromRecipes = async (recipeId, ref) => {
  await ref
    .doc(recipeId)
    .delete()
    .then(() => {
      notification("", "Deleted", "danger");
    })
    .catch((error) => {
      console.log("error removing document", error);
    });
};

export const filteredRecipesByName = (recipeList, debouncedSearchTerm) => {
  let recipes = [];
  if (recipeList) {
    recipes = recipeList.filter((recipe) => {
      if (recipe.name) {
        return recipe.name
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      }
    });
  }
  return recipes;
};

export const filteredRecipesByIngredientAndName = (
  recipeList,
  debouncedSearchTerm
) => {
  let recipes = [];
  if (recipeList) {
    recipes = recipeList.filter((recipe) => {
      let ifFound;
      if (recipe.ingredients.length) {
        recipe.ingredients.forEach((ingredient) => {
          if (
            ingredient.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          )
            ifFound = true;
        });
      }
      if (ifFound) {
        return recipe;
      } else if (recipe.name) {
        return recipe.name
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      }
    });
  }
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

export const addToShoppingList = async (value, recipeList, ref) => {
  let response;
  recipeList.forEach((item) => {
    if (item.id && item.id === value) {
      response = item;
      ref.add(item).then((docRef) => {
        docRef.update({
          id: docRef.id,
        });
      });
    }
  });
  return response;
};

export const editRecipeCardButton = (event, recipeList) => {
  const recipeToEdit = recipeList.find(
    (item) => item.id === event.target.value
  );
  return recipeToEdit;
};
