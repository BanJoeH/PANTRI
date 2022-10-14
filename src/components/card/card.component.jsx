import React, { useState } from "react";
import IngredientList from "../ingredient-list/ingredient-list.component";
import "./card.styles.scss";
import CustomButton from "../custom-button/custom-button.component";

function Card({
  recipe,
  button,
  ingredientButton,
  removeFromRecipes,
  editRecipe,
  showBodyOnMount,
}) {
  const [showBody, setShowBody] = useState(() => showBodyOnMount || false);
  const pathname = window.location.pathname;

  const toggleShowBody = (e) => {
    e.preventDefault();
    setShowBody((state) => !state);
  };

  return (
    <article className="card">
      <div className="card-header">
        <h2 className="card-title" onClick={toggleShowBody}>
          {recipe.name}
        </h2>

        <div className="card-header-buttons">
          {recipe.link ? (
            <a
              className="title-link"
              target="_blank"
              rel="noopener noreferrer"
              href={recipe.link}
            >
              Link
            </a>
          ) : null}
          {pathname === "/home/recipes" ? (
            <>
              <button
                value={recipe.id}
                onClick={(e) => button(e, recipe)}
                className="rotate title-link"
              >
                &#10005;
              </button>
              <button
                value={recipe.id}
                onClick={(e) => editRecipe(e, recipe)}
                className="title-link"
              >
                Edit
              </button>
            </>
          ) : null}
          <button
            href="#"
            value={recipe.id}
            onClick={(e) => removeFromRecipes(e, recipe)}
            className=" title-link"
          >
            &#10005;
          </button>
        </div>
      </div>
      {showBody ? (
        <div className="card-body fade-in">
          {recipe.ingredients.length ? (
            <IngredientList
              recipeId={recipe.id}
              ingredients={recipe.ingredients}
              pathname={pathname}
              ingredientButton={ingredientButton}
            />
          ) : (
            <div>No ingredients</div>
          )}
          <CustomButton onClick={button} value={recipe.id} recipe={recipe}>
            {pathname === "/home/shopping-list"
              ? "Done"
              : "Add to Shopping List"}
          </CustomButton>
        </div>
      ) : null}
    </article>
  );
}

export default Card;
