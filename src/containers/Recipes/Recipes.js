import { useState } from "react";
import Card from "../../elements/Card/Card.js";
import SearchBox from "../../elements/SearchBox/SearchBox.js";
import FadeIn from "react-fade-in";

function Recipes({
  recipes,
  cardButton,
  removeFromRecipes,
  onSearchChange,
  searchField,
}) {
  return (
    <div className="pb6">
      <FadeIn>
        <h2 className="tc">Recipe List</h2>
        <div className="tc w-100">
          <div className="tc center w-50-ns w-100">
            <SearchBox
              searchChange={onSearchChange}
              searchField={searchField}
            />
          </div>
        </div>
        {recipes.length > 0 ? (
          <div className="flex flex-wrap">
            {recipes.map((recipe, i) => {
              return (
                <Card
                  recipeIndex={i}
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
        ) : (
          <div>
            <h4 className="tc center">No recipes in your recipe list.</h4>
            <h4 className="tc center">Go to Add a recipe to add some!</h4>
          </div>
        )}
      </FadeIn>
    </div>
  );
}

export default Recipes;
