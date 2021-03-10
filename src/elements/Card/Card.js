import React from "react";

function Card({
  recipe,
  button,
  buttonText,
  ingredientButton,
  removeFromRecipes,
  recipeIndex,
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
            Recipe link
          </a>
        )}
        <div>
          {pathname === "/recipes" ? (
            <button
              value={recipe.id}
              onClick={(e) => editRecipe(e)}
              className="link bn white pointer bg-transparent dib mr3"
            >
              Edit
            </button>
          ) : null}
          <button
            href="#"
            value={recipe.id + "-" + recipeIndex}
            onClick={(e) => removeFromRecipes(e)}
            className=" link bn white pointer bg-transparent dib mr3"
          >
            X
          </button>
        </div>
      </div>
      <div className="pa3 bt b--black-10 flex">
        <form className="bn ph1 tc center w-80 ">
          {recipe.ingredients.map((ingredient, i) => {
            return (
              <div
                className="items-center mb1 bb b--light-silver flex justify-between"
                key={`${ingredient}-${recipe.id}-${i}`}
              >
                <div htmlFor={ingredient} className="lh-copy">
                  {ingredient}
                </div>
                {pathname === "/" ? (
                  <button
                    className={`mr2 ba ph1   b--moon-gray gray br2  tc bg-white hover-bg-near-white pointer`}
                    onClick={ingredientButton}
                    name={recipeIndex}
                    value={ingredient + i}
                  >
                    X
                  </button>
                ) : null}
              </div>
            );
          })}
          {recipe.ingredients.length > 0 ? (
            <button
              className={`pv2 mb1 ph3 w-100 bg-white pointer hover-bg-near-white center tc ba b--moon-gray br2 shadow-4`}
              onClick={button}
              value={recipe.id + "-" + recipeIndex}
            >
              {buttonText}
            </button>
          ) : null}
        </form>
      </div>
    </article>
  );
}

export default Card;
