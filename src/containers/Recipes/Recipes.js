import React from "react";
import Card from "../../elements/Card/Card.js";

function Recipes({ recipes, cardButton, removeFromRecipes }) {
  return (
    <div className="pb6">
      <h2 className="tc">Recipe List</h2>
      {recipes.length > 0 ? (
        recipes.map((recipe, i) => {
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
        })
      ) : (
        <div>
          <h4 className="tc center">No recipes in your recipe list.</h4>
          <h4 className="tc center">Go to Add a recipe to add some!</h4>
        </div>
      )}
    </div>
  );
}

export default Recipes;
