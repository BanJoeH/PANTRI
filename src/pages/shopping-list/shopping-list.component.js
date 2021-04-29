import React from "react";

import { useFirestoreConnect, useFirestore } from "react-redux-firebase";

import { useSelector } from "react-redux";
import { removeIngredientFromShoppingList } from "./shopping-list.utils";

import OddBits from "../../components/oddbits/oddbits.component.jsx";
import CardList from "../../components/cardList/card-list.component.jsx";
import SortShopping from "../../components/sort-shopping/sort-shopping.component.jsx";
import {
  findRecipe,
  removeFromFirebaseCollection,
  notification,
} from "../../App/app.utils";

const ShoppingList = () => {
  const { uid } = useSelector((state) => state.firebase.auth);
  const isLoading = useSelector(
    (state) => state.firestore.status.requesting.shoppingList
  );

  useFirestoreConnect({
    collection: `users/${uid}/shoppingList`,
    storeAs: "shoppingList",
  });

  const firestore = useFirestore();
  const recipes = useSelector((state) => state.firestore.ordered.shoppingList);

  const shoppingListCollectionRef = firestore
    .collection("users")
    .doc(uid)
    .collection("shoppingList");

  const handleRemoveFromShoppingClick = async (e) => {
    e.preventDefault();

    const recipeId = e.target.value;
    const recipeToRemove = findRecipe(recipeId, recipes);
    const response = await removeFromFirebaseCollection(
      recipeToRemove,
      shoppingListCollectionRef
    );
    if (response === "error") {
      notification(
        "Error",
        "error removing recipe, please try again",
        "danger"
      );
    } else {
      notification(response.name, "Deleted", "success");
    }
  };

  const handleRemoveIngredientFromShoppingListItemClick = (e) => {
    e.preventDefault();
    const [recipeId, , ingredientIndex] = e.target.name.split("&");
    const recipe = findRecipe(recipeId, recipes);
    const updatedIngredients = recipe.ingredients.slice();
    updatedIngredients.splice(ingredientIndex, 1);

    removeIngredientFromShoppingList(
      recipeId,
      updatedIngredients,
      shoppingListCollectionRef
    );
  };

  return (
    !isLoading && (
      <div className="page fade-in">
        <div className="page-header">
          <h2 className="title">Shopping List</h2>
          <OddBits />
          {recipes?.length ? <SortShopping recipes={recipes} /> : null}
        </div>
        {recipes?.length ? (
          <CardList
            recipes={recipes}
            removeFromRecipes={handleRemoveFromShoppingClick}
            cardButton={handleRemoveFromShoppingClick}
            ingredientButton={handleRemoveIngredientFromShoppingListItemClick}
          />
        ) : (
          <div className="card">
            <h2>No recipes in your shopping list.</h2>
            <h2>Go to Recipes to add some!</h2>
          </div>
        )}
      </div>
    )
  );
};

export default ShoppingList;
