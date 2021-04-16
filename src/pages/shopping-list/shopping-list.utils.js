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
  ingredient,
  ref,
  firestore
) => {
  ref.doc(recipeId).update({
    ingredients: firestore.FieldValue.arrayRemove(ingredient),
  });
};
