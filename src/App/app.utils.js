import { useEffect, useState } from "react";
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

export const findRecipe = (recipeId, recipeList) => {
  const recipe = recipeList.find((recipe) => recipe.id === recipeId);

  return recipe;
};

export const filterRecipeOut = (recipeId, recipeList) => {
  const recipes = recipeList.filter((recipe) => recipe.id !== recipeId);

  return recipes;
};

export const addToFirebaseCollection = async (recipe, collectionRef) => {
  let response = null;
  collectionRef
    .add(recipe)
    .then((docRef) => {
      docRef.update({
        id: docRef.id,
      });
    })
    .then((response = recipe))
    .catch((error) => {
      response = "error";
    });

  return response;
};

export const removeFromFirebaseCollection = async (recipe, ref) => {
  let response = null;
  await ref
    .doc(recipe.id)
    .delete()
    .then((response = recipe))

    .catch((error) => {
      console.log("error removing document", error);
      response = "error";
    });
  return response;
};
