import React from "react";
import IngredientList from "../ingredient-list/ingredient-list.component";
import "./card.styles.scss";
import CustomButton from "../custom-button/custom-button.component";

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
        <div className="card-header-buttons">
          {pathname === "/PANTRI/recipes" ? (
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

          <CustomButton onClick={button} value={recipe.id}>
            {pathname === "/PANTRI/shoppingList"
              ? "Done"
              : "Add to Shopping List"}
          </CustomButton>
        </div>
      ) : null}
    </article>
  );
}

export default Card;
