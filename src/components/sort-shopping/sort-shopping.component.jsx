import React, { useState } from "react";
import Card from "../card/card.component";
import CustomButton from "../custom-button/custom-button.component";
import { useModal } from "../modal/useModal";

const SortShopping = ({ recipes }) => {
  const { openModal } = useModal();
  const [showSort, setShowSort] = useState(false);
  const [sortShoppingRecipe, setSortShoppingRecipe] = useState({
    id: "sort",
    name: "Sorted Shopping List",
    link: "",
    ingredients: [],
  });

  const togleShowSort = () => {
    openModal(
      <Card
        recipe={sortShoppingRecipe}
        removeFromRecipes={togleShowSort}
        button={togleShowSort}
        ingredientButton={handleRemoveIngredientClick}
      />
    );
    // setModalOpen(true);
    // setShowSort(!showSort);
  };

  const handleRemoveIngredientClick = (e) => {
    e.preventDefault();
    const ingredients = sortShoppingRecipe.ingredients;
    removeIngredient(e, ingredients);
  };

  const removeIngredient = (event, ingredients) => {
    const ingredientToRemove = event.target.name.split("&")[1];

    const temp = ingredients.filter(
      (ingredient) => ingredient !== ingredientToRemove
    );
    setSortShoppingRecipe({ ...sortShoppingRecipe, ingredients: temp });
  };

  const handleSortClick = (e) => {
    e.preventDefault();
    const formattedIngredients = sortAllIngredients(recipes);
    setSortShoppingRecipe((state) => {
      return {
        ...state,
        ingredients: formattedIngredients,
      };
    });
    togleShowSort();
  };

  const sortAllIngredients = (recipes) => {
    const ingredientListSorted = recipes
      .map((recipe) => {
        return recipe.ingredients;
      })
      .flat()
      .sort();
    const unique = [...new Set(ingredientListSorted)];
    const duplicates = unique.map((value) => [
      value,
      ingredientListSorted.filter((str) => str === value).length,
    ]);
    const formatted = duplicates.map(
      (ingredient) => ingredient[0] + "  X" + ingredient[1]
    );

    return formatted;
  };

  return showSort ? (
    <Card
      recipe={sortShoppingRecipe}
      removeFromRecipes={togleShowSort}
      button={togleShowSort}
      ingredientButton={handleRemoveIngredientClick}
    />
  ) : (
    <div style={{ margin: "0 5%" }}>
      <CustomButton value="Sort shopping" onClick={handleSortClick}>
        Sort Shopping
      </CustomButton>
    </div>
  );
};

export default SortShopping;
