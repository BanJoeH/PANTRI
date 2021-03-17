import { configureStore } from "@reduxjs/toolkit";

import recipesReducer from "../pages/recipes/recipesSlice";
import shoppingListReducer from "../pages/home/shopping-listSlice";

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    shoppingList: shoppingListReducer,
  },
});

export default store;
