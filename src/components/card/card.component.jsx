import React from "react";
import IngredientList from "../ingredient-list/ingredient-list.component";
import "./card.styles.scss";

function Card({
  recipe,
  button,
  ingredientButton,
  removeFromRecipes,
  editRecipe,
}) {
  const pathname = window.location.pathname;

  return (
    <article className="card">
      <div className="card-header">
        <h2 className="card-title">{recipe.name}</h2>
        {!recipe.link ? null : (
          <a
            className="title-link"
            target="_blank"
            rel="noopener noreferrer"
            href={recipe.link}
          >
            Link
          </a>
        )}
        <div className="card-header-buttons">
          {pathname === "/recipes" ? (
            <button
              value={recipe.id}
              onClick={editRecipe}
              className="title-link"
            >
              Edit
            </button>
          ) : null}
          <button
            href="#"
            value={recipe.id}
            onClick={(e) => removeFromRecipes(e)}
            className=" title-link"
          >
            &#10005;
          </button>
        </div>
      </div>
      {recipe.ingredients.length ? (
        <div className="card-body">
          <IngredientList
            recipeId={recipe.id}
            ingredients={recipe.ingredients}
            pathname={pathname}
            ingredientButton={ingredientButton}
          />

          <button className="card-button" onClick={button} value={recipe.id}>
            {pathname === "/" ? "Done" : "Add to Shopping List"}
          </button>
        </div>
      ) : null}
    </article>
  );
}

export default Card;
