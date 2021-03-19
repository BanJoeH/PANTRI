import { createSlice } from "@reduxjs/toolkit";

const ID = () => {
  return Math.random().toString(36).substr(2, 9);
};

const initialState = JSON.parse(localStorage.getItem("storedShopping")) || [];

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    shoppingListAdded: {
      reducer(shoppingList, action) {
        shoppingList.unshift(action.payload);
      },
      prepare(recipe) {
        return {
          payload: {
            ...recipe,
            id: ID(),
          },
        };
      },
    },
    shoppingListRemoved: (shoppingList, action) => {
      return shoppingList.filter((recipe) => recipe.id !== action.payload);
    },
    shoppingIngredientRemoved: (shoppingList, action) => {
      let [recipeId, ingredientToRemove, index] = action.payload.split(" ");

      let tempShoppingList = shoppingList.map((shoppingRecipe) => {
        if (shoppingRecipe.id === recipeId) {
          let tempIngredientList = shoppingRecipe.ingredients.filter(
            (ingredient, i) => ingredient + i !== ingredientToRemove + index
          );
          shoppingRecipe.ingredients = tempIngredientList;
          return shoppingRecipe;
        } else {
          return shoppingRecipe;
        }
      });
      shoppingList = tempShoppingList;
    },
  },
});

const { actions, reducer } = shoppingListSlice;

export const {
  shoppingListAdded,
  shoppingListRemoved,
  shoppingIngredientRemoved,
} = actions;

export default reducer;

export const selectAllShoppingRecipes = (state) => state.shoppingList;
