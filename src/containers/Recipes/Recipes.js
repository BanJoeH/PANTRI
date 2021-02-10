import React from "react";
import Card from "../../elements/Card/Card.js";
import Scroll from "../../elements/Scroll/Scroll.js";

function Recipes({ recipes, cardButton }) {
  return (
    <div>
      <h2 className="tc">Recipe List</h2>
      {recipes.map((recipe, i) => {
        return (
          <Card
            recipe={recipe}
            key={recipe + i}
            button={cardButton}
            buttonText="Add To Shopping List"
          />
        );
      })}
    </div>
  );
}

export default Recipes;
