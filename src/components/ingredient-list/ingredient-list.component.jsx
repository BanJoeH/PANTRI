import React from "react";

const IngredientList = ({
  recipeId,
  ingredients,
  pathname,
  ingredientButton,
  recipeIndex,
}) => {
  return ingredients
    ? ingredients.map((ingredient, i) => {
        return (
          <div
            className="items-center mb1 bb bn-last b--light-silver flex justify-between"
            key={recipeId + ingredient + i}
          >
            <div htmlFor={ingredient} className="lh-copy">
              {ingredient}
            </div>
            {pathname === "/" ? (
              <button
                className={`mr2 ba ph1 b--moon-gray gray br2 tc bg-white hover-bg-near-white pointer`}
                onClick={ingredientButton}
                name={recipeId + " " + ingredient + " " + i}
                value={ingredient + i}
              >
                &#10005;
              </button>
            ) : null}
          </div>
        );
      })
    : null;
};

export default IngredientList;
