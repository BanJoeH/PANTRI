import React, { useState } from "react";
import Card from "../card/card.component";
import CustomButton from "../custom-button/custom-button.component";

const SortShopping = ({ recipes }) => {
  const [showSort, setShowSort] = useState(false);
  const [sortShoppingRecipe, setSortShoppingRecipe] = useState({
    id: "sort",
    name: "Sorted Shopping List",
    link: "",
    ingredients: [],
  });

  const reverseShowSort = () => {
    setShowSort(!showSort);
  };

  const removeIngredient = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const [id, ingredientToRemove, index] = event.target.name.split("&");

    let temp = sortShoppingRecipe.ingredients.filter(
      (ingredient) => ingredient !== ingredientToRemove
    );
    setSortShoppingRecipe({ ...sortShoppingRecipe, ingredients: temp });
  };

  const sortShopping = () => {
    if (recipes) {
      let ingredientList = recipes
        .map((recipe) => {
          return recipe.ingredients;
        })
        .flat()
        .sort();
      let unique = [...new Set(ingredientList)];
      let duplicates = unique.map((value) => [
        value,
        ingredientList.filter((str) => str === value).length,
      ]);
      let formatted = duplicates
        .map((ingredient, i) => [ingredient[0] + "  X" + ingredient[1]])
        .flat();

      setSortShoppingRecipe((state) => {
        return {
          ...state,
          ingredients: formatted,
        };
      });
    }
    reverseShowSort();
  };

  return (
    <>
      {showSort ? (
        <Card
          recipe={sortShoppingRecipe}
          removeFromRecipes={reverseShowSort}
          button={reverseShowSort}
          ingredientButton={removeIngredient}
        />
      ) : (
        <CustomButton value="Sort shopping" onClick={sortShopping}>
          Sort Shopping
        </CustomButton>
      )}
    </>
  );
};

export default SortShopping;
