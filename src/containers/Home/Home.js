import { useState, useEffect } from "react";
import Card from "../../elements/Card/Card.js";
import OddBits from "../../components/OddBits/OddBits.js";

function Home({ recipes, cardButton, ingredientButton, oddBits, setOddBits }) {
  return (
    <div className="center pb6">
      <h2 className="tc">Shopping List</h2>
      <OddBits setOddBits={setOddBits} oddBits={oddBits} />

      {recipes.length === 0 ? (
        <div>
          <h4 className="tc center">No recipes in your shopping list.</h4>
          <h4 className="tc center">Go to Recipes to add some!</h4>
        </div>
      ) : (
        <div className="flex flex-wrap">
          {recipes.map((recipe, i) => {
            return (
              <Card
                removeFromRecipes={cardButton}
                recipe={recipe}
                key={recipe + i}
                button={cardButton}
                buttonText="Done"
                ingredientButton={ingredientButton}
                recipeIndex={i}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
