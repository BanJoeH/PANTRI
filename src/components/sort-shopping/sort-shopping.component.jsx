import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import { useModal } from "../modal/useModal";
import SortShoppingModal from "./sort-shopping-modal.component";

const SortShopping = ({ recipes }) => {
  const { openModal } = useModal();
  const [sortShoppingRecipe, setSortShoppingRecipe] = useState({
    id: "sort",
    name: "Sorted Shopping List",
    link: "",
    ingredients: [],
  });
  const oddBits = useSelector((state) => state.firebase.profile.oddBits);

  const togleShowSort = (recipe = null) => {
    openModal(
      <SortShoppingModal shoppingList={recipe || sortShoppingRecipe} />
    );
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
    togleShowSort({ ...sortShoppingRecipe, ingredients: formattedIngredients });
  };

  const sortAllIngredients = (recipes) => {
    const ingredients = [
      recipes.map((recipe) => recipe.ingredients),
      oddBits.filter(Boolean),
    ]
      .flat(Infinity)
      .sort();

    const unique = [...new Set(ingredients)];
    const duplicates = unique.map((value) => [
      value,
      ingredients.filter((str) => str === value).length,
    ]);
    const formatted = duplicates.map(
      (ingredient) => ingredient[0] + "  X" + ingredient[1]
    );

    return formatted;
  };

  return (
    <div style={{ margin: "0 5%" }}>
      <CustomButton value="Sort shopping" onClick={handleSortClick}>
        Sort Shopping
      </CustomButton>
    </div>
  );
};

export default SortShopping;
