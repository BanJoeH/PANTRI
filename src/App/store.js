import { configureStore } from "@reduxjs/toolkit";

import recipesReducer from "../pages/recipes/recipesSlice";
import shoppingListReducer from "../pages/home/shopping-listSlice";
import { userSlice } from "../pages/sign-in-and-sign-up/userSlice.js";

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    shoppingList: shoppingListReducer,
    user: userSlice.reducer,
  },
});

export default store;
