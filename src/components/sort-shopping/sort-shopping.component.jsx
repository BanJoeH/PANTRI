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
      <SortShoppingModal shoppingList={recipe || sortShoppingRecipe} />,
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
    console.log(recipes, oddBits);
    const ingredients = [
      recipes.flatMap((recipe) =>
        recipe.ingredients.map((ingredient) => ({
          name: ingredient.name.toLowerCase(),
          source: recipe.name,
        })),
      ),
      oddBits
        .map((oddBit) =>
          oddBit ? { name: oddBit.toLowerCase(), source: "Odd Bits" } : null,
        )
        .filter(Boolean),
    ]
      .flat(Infinity)
      .sort((a, b) => a.name.localeCompare(b.name));

    const map = new Map();
    ingredients.forEach((ingredient) => {
      if (map.has(ingredient.name)) {
        const existing = map.get(ingredient.name);
        existing.count += 1;
        existing.sources.push(ingredient.source);
        map.set(ingredient.name, existing);
      } else {
        map.set(ingredient.name, {
          name: ingredient.name,
          sources: [ingredient.source],
          count: 1,
        });
      }
    });
    const formatted = Array.from(map.values());

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
