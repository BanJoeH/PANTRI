import React from "react";
import Card from "../../components/card/card.component.jsx";
import OddBits from "../../components/oddbits/oddbits.component.jsx";
import CustomButton from "../../components/custom-button/custom-button.component.jsx";
import FadeIn from "react-fade-in";
import Masonry from "react-masonry-css";

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

  const numOfColumns = () => {
    if (recipes.length === 1) {
      return 1;
    } else if (recipes.length === 2) {
      return 2;
    } else {
      return 3;
    }
  };
  const breakpointColumnsObj = {
    default: numOfColumns(),
    1400: 2,
    1000: 1,
  };
  return (
    <div className="center">
      <FadeIn>
        <h2 className="tc w-90 w-80-m w-50-ns mw6 center pv3 bg-nearwhite shadow-4 br3">
          Shopping List
        </h2>
        {recipeIds.includes("sort") || recipes.length === 0 ? null : (
          <div className="tc w-90 w-80-m w-50-ns mw6 center">
            <CustomButton
              className=" pointer pv3"
              value="AddRecipe"
              onClick={sortShopping}
            >
              Sort shopping list
            </CustomButton>
          </div>
        )}
        <OddBits setOddBits={setOddBits} oddBits={oddBits} />

        {recipes.length === 0 ? (
          <div className="tc w-90 w-80-m w-50-ns mw6 mv3 center pv3 bg-nearwhite shadow-4 br3">
            <h2 className="tc center">No recipes in your shopping list.</h2>
            <h2 className="tc center">Go to Recipes to add some!</h2>
          </div>
        ) : (
          <FadeIn>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {recipes.map((recipe, i) => {
                return (
                  <Card
                    removeFromRecipes={cardButton}
                    recipe={recipe}
                    key={recipe.name + i}
                    button={cardButton}
                    buttonText="Done"
                    ingredientButton={ingredientButton}
                    recipeIndex={i}
                  />
                );
              })}
            </Masonry>
          </FadeIn>
        )}
      </FadeIn>
    </div>
  );
}

export default Home;
