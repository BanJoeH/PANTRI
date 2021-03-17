import React from "react";
import IngredientList from "../ingredient-list/ingredient-list.component";

function Card({
  recipe,
  button,
  ingredientButton,
  removeFromRecipes,
  editRecipe,
}) {
  const pathname = window.location.pathname;

  return (
    <article className="center mw6 br3 bg-nearwhite w-90   hidden shadow-4 ttc ba b--black-10 mv4 ">
      <div className="bg-dark-gray ph4 borrad--top flex justify-between items-center">
        <h2 className="white dib mr3">{recipe.name}</h2>
        {recipe.link === "" ? null : (
          <a
            className="link dim white dib mr3"
            target="_blank"
            rel="noopener noreferrer"
            href={recipe.link}
          >
            Link to Recipe
          </a>
        )}
        <div className="flex ml4">
          {pathname === "/recipes" ? (
            <button
              value={recipe.id}
              onClick={editRecipe}
              className="link bn white pointer bg-transparent dib mr3"
            >
              Edit
            </button>
          ) : null}
          <button
            href="#"
            value={recipe.id}
            onClick={(e) => removeFromRecipes(e)}
            className=" link bn white pointer bg-transparent dib mr3"
          >
            &#10005;
          </button>
        </div>
      </div>
      <div className="pa3 bt b--black-10 flex">
        <form className="bn ph1 tc center w-80 ">
          <IngredientList
            recipeId={recipe.id}
            ingredients={recipe.ingredients}
            pathname={pathname}
            ingredientButton={ingredientButton}
          />
          {recipe.ingredients ? (
            <button
              className={`pv2 mb1 ph3 w-100 bg-white pointer hover-bg-near-white center tc ba b--moon-gray br2 shadow-4`}
              onClick={button}
              value={recipe.id}
            >
              {pathname === "/" ? "Done" : "Add to Shopping List"}
            </button>
          ) : null}
        </form>
      </div>
    </article>
  );
}

export default Card;
