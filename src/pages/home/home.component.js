import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  shoppingListAdded,
  shoppingListRemoved,
  shoppingIngredientRemoved,
  selectAllShoppingRecipes,
} from "./shopping-listSlice";
import OddBits from "../../components/oddbits/oddbits.component.jsx";
import CustomButton from "../../components/custom-button/custom-button.component.jsx";
import CardList from "../../components/cardList/card-list.component.jsx";

function Home() {
  const recipes = useSelector(selectAllShoppingRecipes);
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

  const removeRecipeFromShoppingList = (event) => {
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

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h2 className="title">Shopping List</h2>
        {recipeNames.includes("Shopping List") ||
        recipes.length === 0 ? null : (
          <CustomButton value="AddRecipe" onClick={sortShopping}>
            Sort shopping list
          </CustomButton>
        )}
        <OddBits setOddBits={setOddBits} oddBits={oddBits} />
      </div>
      {recipes.length === 0 ? (
        <div className="recipes-empty">
          <h2>No recipes in your shopping list.</h2>
          <h2>Go to Recipes to add some!</h2>
        </div>
      ) : (
        <CardList
          recipes={recipes}
          removeFromRecipes={removeRecipeFromShoppingList}
          cardButton={removeRecipeFromShoppingList}
          ingredientButton={removeIngredientFromShoppingList}
        />
      )}
    </div>
  );
}

export default Home;
