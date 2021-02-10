import React from "react";
import Button from "../Button/Button.js";

function Card({ recipe, button, buttonText, ingredientButton }) {
  return (
    <article className="center mw6 br3 hidden ba b--black-10 mv4 ">
      <div className="bg-dark-gray w-100 ph3 pv1 flex justify-between items-center">
        <h2 className="white dib mr3">{recipe.name}</h2>
        <a className="link dim white dib mr3" href={recipe.link}>
          Recipe link
        </a>
      </div>
      <div className="pa3 bt b--black-10 flex">
        <form className="bn ph1 center w-80 ">
          {recipe.ingredients.map((ingredient) => {
            return (
              <div
                className="items-center mb1 bb b--light-silver flex justify-between"
                key={ingredient + recipe.id}
              >
                <div htmlFor={ingredient} className="lh-copy">
                  {ingredient}
                </div>
                <button
                  className="mr2 ba ph1  b--moon-gray gray br2  tc bg-white hover-bg-near-white pointer"
                  onClick={ingredientButton}
                  name={recipe.id}
                  value={ingredient}
                >
                  X
                </button>
              </div>
            );
          })}
          <Button
            inner={buttonText}
            button={button}
            className="center"
            value={recipe.id}
          />
        </form>
      </div>
    </article>
  );
}

export default Card;
