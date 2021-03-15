import React from "react";

const IngredientList = ({
  recipe,
  pathname,
  ingredientButton,
  recipeIndex,
}) => {
  return recipe.ingredients.map((ingredient, i) => {
    return (
      <div
        className="items-center mb1 bb bn-last b--light-silver flex justify-between"
        key={`${ingredient}-${recipe.id}-${i}`}
      >
        <div htmlFor={ingredient} className="lh-copy">
          {ingredient}
        </div>
        {pathname === "/" ? (
          <button
            className={`mr2 ba ph1 b--moon-gray gray br2 tc bg-white hover-bg-near-white pointer`}
            onClick={ingredientButton}
            name={recipeIndex}
            value={ingredient + i}
          >
            &#10005;
          </button>
        ) : null}
      </div>
    );
  });
};

export default IngredientList;
