import { store } from "react-notifications-component";
import type firebase from "firebase/app";

type NotificationType = "success" | "danger" | "info" | "warning" | "default";

export const notification = (
  titl: string,
  msg: string,
  type: NotificationType,
): void => {
  store.addNotification({
    title: titl,
    message: msg,
    type: type,
    insert: "bottom",
    container: "bottom-center",
    dismiss: {
      duration: 2000,
    },
  });
};

type HasId = { id: string };

export const findRecipe = <T extends HasId>(
  recipeId?: string,
  recipeList?: T[] | null,
): T | null => {
  if (!recipeId || !recipeList) {
    return null;
  }
  const recipe = recipeList.find((recipe) => recipe.id === recipeId);
  if (recipe === undefined) {
    return null;
  }
  return recipe;
};

export const filterRecipeOut = <T extends HasId>(
  recipeId?: string,
  recipeList?: T[] | null,
): T[] | null => {
  if (!recipeId || !recipeList) {
    return null;
  }
  return recipeList.filter((recipe) => recipe.id !== recipeId);
};

// Firestore CollectionReference type from v8 compat — narrow enough that we
// could swap implementations later. Both writers consume an object that maps
// .doc(id) and .add() to the standard Firestore semantics.
type CollectionRef = firebase.firestore.CollectionReference;

export const removeFromFirebaseCollection = async <T extends HasId>(
  recipe: T,
  collectionRef: CollectionRef,
): Promise<T | "error"> => {
  try {
    await collectionRef.doc(recipe.id).delete();
  } catch (error) {
    console.log("ERROR REMOVING DOCUMENT", error);
    return "error";
  }
  return recipe;
};

export const addToFirebaseCollection = async <T extends object>(
  recipe: T,
  collectionRef: CollectionRef,
): Promise<T | "error"> => {
  try {
    const docRef = await collectionRef.add(recipe);
    await docRef.update({
      id: docRef.id,
    });
  } catch (error) {
    console.log("error adding document", error);
    return "error";
  }
  return recipe;
};
