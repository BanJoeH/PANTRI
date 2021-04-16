import React from "react";

import { useFirestoreConnect, useFirestore } from "react-redux-firebase";

import { useSelector } from "react-redux";
import {
  removeRecipeFromShoppingList,
  removeIngredientFromShoppingList,
} from "./shopping-list.utils";

import OddBits from "../../components/oddbits/oddbits.component.jsx";
import CardList from "../../components/cardList/card-list.component.jsx";
import SortShopping from "../../components/sort-shopping/sort-shopping.component.jsx";

function ShoppingList() {
  const { uid } = useSelector((state) => state.firebase.auth);
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

  const handleRemoveRecipeFromShoppingListClick = (e) => {
    e.preventDefault();
    const id = e.target.value;
    removeRecipeFromShoppingList(id, shoppingListCollectionRef);
  };

  const handleRemoveIngredientFromShoppingListItemClick = (e) => {
    e.preventDefault();
    const [id, ingredient] = e.target.name.split("&");
    removeIngredientFromShoppingList(
      id,
      ingredient,
      shoppingListCollectionRef,
      firestore
    );
  };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h2 className="title">Shopping List</h2>
        <OddBits />
        {recipes?.length ? <SortShopping recipes={recipes} /> : null}
      </div>
      {recipes?.length ? (
        <CardList
          recipes={recipes}
          removeFromRecipes={handleRemoveRecipeFromShoppingListClick}
          cardButton={handleRemoveRecipeFromShoppingListClick}
          ingredientButton={handleRemoveIngredientFromShoppingListItemClick}
        />
      ) : (
        <div className="card">
          <h2>No recipes in your shopping list.</h2>
          <h2>Go to Recipes to add some!</h2>
        </div>
      )}
    </div>
  );
}

export default ShoppingList;
