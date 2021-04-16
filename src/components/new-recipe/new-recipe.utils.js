export const addNewRecipe = async (recipe, ref) => {
  await ref.add(recipe).then((docRef) => {
    docRef.update({
      id: docRef.id,
    });
  });
};
