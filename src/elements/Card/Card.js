import React from "react";
import Button from "../Button/Button.js";

function Card({
  recipe,
  button,
  buttonText,
  ingredientButton,
  removeFromRecipes,
  className,
  recipeIndex,
}) {
  return (
    <article className="center mw6 br3 hidden shadow-4 ttc ba b--black-10 mv4 ">
      <div className="bg-dark-gray ph3 br--bottom flex justify-between items-center">
        <h2 className="white dib mr3">{recipe.name}</h2>
        {recipe.link === "" ? (
          <div></div>
        ) : (
          <a
            className="link dim white dib mr3"
            target="_blank"
            rel="noopener noreferrer"
            href={recipe.link}
          >
            Recipe link
          </a>
        )}

        <button
          href="#"
          value={recipe.id}
          onClick={(e) => removeFromRecipes(e)}
          className=" link bn white bg-transparent dib mr3"
        >
          Delete
        </button>
      </div>
      <div className="pa3 bt b--black-10 flex">
        <form className="bn ph1 center w-80 ">
          {recipe.ingredients.map((ingredient, i) => {
            return (
              <div
                className="items-center mb1 bb b--light-silver flex justify-between"
                key={ingredient + recipe.id}
              >
                <div htmlFor={ingredient} className="lh-copy">
                  {ingredient}
                </div>
                <button
                  className={`mr2 ba ph1 ${className}  b--moon-gray gray br2  tc bg-white hover-bg-near-white pointer`}
                  onClick={ingredientButton}
                  name={recipe.id}
                  value={ingredient}
                >
                  X
                </button>
              </div>
            );
          })}
          <button
            className={`pv1 mb1 ph3 w-90 bg-white hover-bg-near-white center tc ba b--moon-gray br2 shadow-4`}
            onClick={button}
            value={recipe.id}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </article>
  );
}

export default Card;