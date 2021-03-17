import React, { useState, useEffect } from "react";
import Card from "../../components/card/card.component.jsx";
import OddBits from "../../components/oddbits/oddbits.component.jsx";
import CustomButton from "../../components/custom-button/custom-button.component.jsx";
import FadeIn from "react-fade-in";
import Masonry from "react-masonry-css";
import { useDispatch, useSelector } from "react-redux";
import {
  shoppingListAdded,
  shoppingListRemoved,
  shoppingIngredientRemoved,
} from "./shopping-listSlice";

function Home() {
  const recipes = useSelector((state) => state.shoppingList);
  const dispatch = useDispatch();
  const [oddBits, setOddBits] = useState(
    JSON.parse(localStorage.getItem("storedOdd")) || [""]
  );

  useEffect(() => {
    localStorage.setItem("storedOdd", JSON.stringify(oddBits));
  }, [oddBits]);

  useEffect(() => {
    localStorage.setItem("storedShopping", JSON.stringify(recipes));
  }, [recipes]);

  const recipeNames = recipes.map((recipe) => {
    return recipe.name;
  });

  const removeFromShoppingList = (event) => {
    event.preventDefault();
    let recipe = recipes.find((recipe) => recipe.id === event.target.value);
    dispatch(shoppingListRemoved(recipe.id));
  };

  const removeIngredientFromShoppingList = (event) => {
    event.preventDefault();
    let { name } = event.target;
    dispatch(shoppingIngredientRemoved(name));
  };

  const sortShopping = (event) => {
    event.preventDefault();
    let ingredientList = recipes
      .map((recipe, i) => {
        return recipe.ingredients;
      })
      .flat()
      .sort();
    let unique = [...new Set(ingredientList)];
    let duplicates = unique.map((value) => [
      value,
      ingredientList.filter((str) => str === value).length,
    ]);
    let formatted = duplicates.map((ingredient, i) => [
      ingredient[0] + "  X" + ingredient[1],
    ]);

    let temp = {
      id: "sort",
      name: "Shopping List",
      ingredients: formatted,
      link: "",
    };
    dispatch(shoppingListAdded(temp));
  };

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
        {recipeNames.includes("Shopping List") ||
        recipes.length === 0 ? null : (
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
              {recipes.map((recipe) => {
                return (
                  <Card
                    removeFromRecipes={removeFromShoppingList}
                    recipe={recipe}
                    key={recipe.id}
                    button={removeFromShoppingList}
                    ingredientButton={removeIngredientFromShoppingList}
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
