import React from "react";
import Card from "../../elements/Card/Card.js";
import OddBits from "../../components/OddBits/OddBits.js";
import Button from "../../elements/Button/Button.js";
import FadeIn from "react-fade-in";

function Home({
  recipes,
  cardButton,
  ingredientButton,
  oddBits,
  setOddBits,
  sortShopping,
}) {
  const recipeIds = recipes.map((recipe) => {
    return recipe.id;
  });
  return (
    <div className="center pb6">
      <FadeIn>
        <h2 className="tc">Shopping List</h2>
        {recipeIds.includes("sort") ? (
          <div></div>
        ) : (
          <div className="tc w-20-ns center">
            <Button
              className=" pv2"
              value="AddRecipe"
              inner="Sort shopping list"
              button={sortShopping}
            />
          </div>
        )}
        <OddBits setOddBits={setOddBits} oddBits={oddBits} />

        {recipes.length === 0 ? (
          <div>
            <h4 className="tc center">No recipes in your shopping list.</h4>
            <h4 className="tc center">Go to Recipes to add some!</h4>
          </div>
        ) : (
          <FadeIn>
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
          </FadeIn>
        )}
      </FadeIn>
    </div>
  );
}

export default Home;
