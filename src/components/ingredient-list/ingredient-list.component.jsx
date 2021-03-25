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
              {pathname === "/PANTRI/shoppingList" ? (
                <button
                  className="ingredient-button"
                  onClick={ingredientButton}
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
