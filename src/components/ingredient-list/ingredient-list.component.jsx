import React from "react";

import "./ingredient-list.styles.scss";

const IngredientList = ({
  recipeId,
  ingredients,
  pathname,
  ingredientButton,
}) => {
  return ingredients ? (
    <div className="ingredient-list">
      {ingredients.map((ingredient, i) => {
        if (ingredient !== null) {
          return (
            <div className="ingredient" key={recipeId + ingredient + i}>
              <div htmlFor={ingredient} className="ingredient-text">
                {ingredient}
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
