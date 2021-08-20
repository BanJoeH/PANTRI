import { store } from "react-notifications-component";

export const notification = (title, msg, type) => {
  store.addNotification({
    title: title,
    message: msg,
    type: type,
    insert: "bottom",
    container: "bottom-center",
    dismiss: {
      duration: 2000,
    },
  });
};


export const filterRecipeOut = (recipeId, recipeList) => {
  if (!recipeId || !recipeList) {
    return null;
  }
  const recipes = recipeList.filter((recipe) => recipe.id !== recipeId);

  return recipes;
};

export const findRecipe = (recipeId, recipeList) => {
  if (!recipeId || !recipeList) {
    return null;
  }
  const recipe = recipeList.find((recipe) => recipe.id === recipeId);
  if (recipe === undefined) {
    return null;
  }
  return recipe;
};

export const addToFirebaseCollection = async (recipe, collectionRef) => {
  try {
    const docRef = await collectionRef.add(recipe);
    await docRef.update({
      id: docRef.id,
    });
  } catch (error) {
    console.log(error);
    return "error";
  }
  return recipe;
};

export const removeFromFirebaseCollection = async (recipe, collectionRef) => {
  try {
    await collectionRef.doc(recipe.id).delete();
  } catch (error) {
    console.log("ERROR REMOVING DOCUMENT", error);
    return "error";
  }
  return recipe;
};
