import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("storedRecipes")) || [];

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    recipeAdded: (recipes, action) => {
      recipes.push(action.payload);
    },
    recipeRemoved: (recipes, action) => {
      return recipes.filter((recipe) => recipe.id !== action.payload);
    },
    recipeEdited: (recipes, action) => {
      return recipes.map((recipe) => {
        if (recipe.id === action.payload.id) {
          return action.payload;
        } else {
          return recipe;
        }
      });
    },
  },
});

const { actions, reducer } = recipeSlice;

export const { recipeAdded, recipeRemoved, recipeEdited } = actions;

export default reducer;
