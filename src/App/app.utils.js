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

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export const findRecipe = (recipeId, recipeList) => {
  const recipe = recipeList.filter((recipe) => recipe.id === recipeId);

  return recipe[0];
};

export const filterRecipeOut = (recipeId, recipeList) => {
  const recipes = recipeList.filter((recipe) => recipe.id !== recipeId);

  return recipes;
};
