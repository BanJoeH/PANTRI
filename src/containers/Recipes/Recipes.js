import React from "react";
import Card from "../../elements/Card/Card.js";

function Recipes({ recipes, cardButton, removeFromRecipes }) {
  return (
    <div className="pb5">
      <h2 className="tc">Recipe List</h2>
      {recipes.map((recipe, i) => {
        return (
          <Card
            removeFromRecipes={removeFromRecipes}
            recipe={recipe}
            key={recipe + i}
            button={cardButton}
            buttonText="Add To Shopping List"
            className="dn"
          />
        );
      })}
    </div>
  );
}

export default Recipes;
