import React from "react";

import "./ingredient-list.styles.scss";

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

type Ingredient = {
  name: string;
  sources?: string[];
  count?: number;
  totalCount?: number;
  purchased?: boolean;
};

function CountBadge({
  count,
  totalCount,
}: {
  count?: number;
  totalCount?: number;
}) {
  if (!count) return null;
  return (
    <>
      X {count}
      {totalCount && totalCount > count ? (
        <span className="ingredient-count-total"> of {totalCount}</span>
      ) : null}
    </>
  );
}

const IngredientList = ({
  recipeId,
  ingredients,
  ingredientButton,
  renderIngredientMeta,
}: {
  recipeId: string;
  ingredients: Ingredient[];
  ingredientButton?: (
    ingredient: Ingredient,
    recipeId: string,
    ingredientIndex: number,
  ) => void;
  renderIngredientMeta?: (ingredient: Ingredient) => React.ReactNode;
}) => {
  return ingredients ? (
    <div className="ingredient-list">
      {ingredients.map((ingredient, i) => {
        if (ingredient.name == null) return null;
        return (
          <div
            className={`ingredient${ingredient.purchased ? " ingredient--purchased" : ""}`}
            key={recipeId + ingredient.name + i}
          >
            <IngredientTextButton ingredient={ingredient} />
            {renderIngredientMeta ? (
              <div className="ingredient-meta">
                {renderIngredientMeta(ingredient)}
              </div>
            ) : null}
            {ingredientButton ? (
              <button
                className="ingredient-button"
                onClick={() => ingredientButton(ingredient, recipeId, i)}
                name={recipeId + "&" + ingredient.name + "&" + i}
                aria-pressed={ingredient.purchased ?? undefined}
              >
                {ingredient.purchased ? "\u21BA" : "\u2715"}
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  ) : null;
};

export default IngredientList;

function IngredientTextButton({ ingredient }: { ingredient: Ingredient }) {
  const [showSources, setShowSources] = React.useState(false);
  return (
    <button
      type="button"
      className="ingredient-text"
      onClick={() => setShowSources(!showSources)}
    >
      {capitalize(ingredient.name)}{" "}
      <CountBadge count={ingredient.count} totalCount={ingredient.totalCount} />
      {ingredient.sources && showSources && (
        <div className="ingredient-sources">
          <div>From recipes:</div>
          <ul>
            {ingredient.sources.map((source, i) => (
              <li key={ingredient.name + "-source-" + i}>
                {capitalize(source)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
}
