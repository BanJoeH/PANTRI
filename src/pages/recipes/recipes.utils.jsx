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

export const filteredRecipes = (list, debouncedSearchTerm) => {
  let recipes = [];
  if (list) {
    recipes = list.filter((recipe) => {
      if (recipe.name) {
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

export const addToShoppingList = async (value, list, ref) => {
  let response;
  list.forEach((item) => {
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

export const editRecipeCardButton = (event, list) => {
  const recipeToEdit = list.find((item) => item.id === event.target.value);
  return recipeToEdit;
};
