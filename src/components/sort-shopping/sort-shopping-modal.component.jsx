import React, { useState } from "react";
import IngredientList from "../ingredient-list/ingredient-list.component";

const SortShoppingModal = ({ shoppingList }) => {
  const [sortedShoppingList, setSortedShoppingList] = useState(
    () => shoppingList
  );

  const pathname = window.location.pathname;

  const removeIngredient = (ingredient) => {
    const ingredients = sortedShoppingList.ingredients;

    const temp = ingredients.filter(
      (ingredient) => ingredient.name !== ingredientToRemove
    );
    setSortedShoppingList({ ...sortedShoppingList, ingredients: temp });
  };

  const handleRemoveIngredientClick = (e) => {
    e.preventDefault();
    const ingredients = sortedShoppingList.ingredients;
    removeIngredient(e, ingredients);
  };

  return (
    <div style={{ margin: "20px" }}>
      <IngredientList
        recipeId={sortedShoppingList.id}
        ingredients={sortedShoppingList.ingredients}
        pathname={pathname}
        ingredientButton={handleRemoveIngredientClick}
      />
    </div>
  );
};

export default SortShoppingModal;
