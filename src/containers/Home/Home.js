import { useState, useEffect } from "react";
import Card from "../../elements/Card/Card.js";
import Button from "../../elements/Button/Button.js";
import OddBits from "../../components/OddBits/OddBits.js";

function Home({ recipes, cardButton, ingredientButton }) {
  return (
    <div className="center">
      <h2 className="tc">Shopping List</h2>
      <OddBits />
      {recipes.map((recipe, i) => {
        return (
          <Card
            recipe={recipe}
            key={recipe + i}
            button={cardButton}
            buttonText="Done"
            ingredientButton={ingredientButton}
          />
        );
      })}
    </div>
  );
}

export default Home;
