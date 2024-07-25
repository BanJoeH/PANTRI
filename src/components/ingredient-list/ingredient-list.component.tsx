import React from "react";

import "./ingredient-list.styles.scss";

/**
 * 
 * @param {string} string
 * @returns string
 */
function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const IngredientList = ({
  recipeId,
  ingredients,
  pathname,
  ingredientButton,
}: {
  recipeId: string;
  ingredients: string[];
  pathname: string;
  ingredientButton: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, recipeId: string, ingredient: string, i: number) => void;
}) => {
  console.log(ingredients, recipeId);
  return ingredients ? (
    <div className="ingredient-list">
      {ingredients.map((ingredient, i) => {
        if (ingredient !== null) {
          return (
            <div className="ingredient" key={recipeId + ingredient + i}>
              <div className="ingredient-text">
                {capitalize(ingredient)}
              </div>
              {pathname === "/home/shopping-list" ? (
                <button
                  className="ingredient-button"
                  onClick={(e) => ingredientButton(e, recipeId, ingredient, i)}
                  name={recipeId + "&" + ingredient + "&" + i}
                >
                  &#10005;
                </button>
              ) : (
                <div></div>
              )}
            </div>
          );
        } else return null;
      })}
    </div>
  ) : null;
};

export default IngredientList;
