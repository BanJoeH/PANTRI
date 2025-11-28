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
type Ingredient = {
  name: string;
  sources: string[];
  count?: number;
}


const IngredientList = ({
  recipeId,
  ingredients,
  pathname,
  ingredientButton,
}: {
  recipeId: string;
  ingredients: Ingredient[];
  pathname: string;
  ingredientButton: (ingredient: Ingredient) => void;
}) => {
  console.log(ingredients, recipeId);
  return ingredients ? (
    <div className="ingredient-list">
      {ingredients.map((ingredient, i) => {
        if (ingredient.name !== null) {
          return (
            <div className="ingredient" key={recipeId + ingredient.name + i}>
              <IngredientTextButton ingredient={ingredient} />
              {pathname === "/home/shopping-list" ? (
                <button
                  className="ingredient-button"
                  onClick={(e) => ingredientButton(ingredient)}
                  name={recipeId + "&" + ingredient.name + "&" + i}
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

function IngredientTextButton({ ingredient }: { ingredient: Ingredient }) {
  const [showSources, setShowSources] = React.useState(false);
  return (<button type="button" className="ingredient-text" onClick={() => setShowSources(!showSources)}>
    {capitalize(ingredient.name)} {ingredient.count != null ? `X ${ingredient.count}` : ""}
    {ingredient.sources && showSources &&
      <div className="ingredient-sources">
        <div>From recipes:</div>
        <ul>
          {ingredient.sources.map((source, i) => (
            <li key={ingredient.name + "-source-" + i}>{capitalize(source)}</li>
          ))}
        </ul>
      </div>}
  </button>
  );
}
