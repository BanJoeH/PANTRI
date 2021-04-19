export const removeRecipeFromShoppingList = (recipeId, ref) => {
  ref
    .doc(recipeId)
    .delete()
    .catch((error) => {
      console.log("error removing document", error);
    });
};

export const removeIngredientFromShoppingList = (
  recipeId,
  updatedIngredients,
  ref
) => {
  ref.doc(recipeId).update(
    {
      ingredients: updatedIngredients,
    },
    { merge: true }
  );
};
