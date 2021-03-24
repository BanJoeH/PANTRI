import React, { useState, useEffect } from "react";

import { useFirestoreConnect, useFirestore } from "react-redux-firebase";

import { useDispatch, useSelector } from "react-redux";

import OddBits from "../../components/oddbits/oddbits.component.jsx";
import CustomButton from "../../components/custom-button/custom-button.component.jsx";
import CardList from "../../components/cardList/card-list.component.jsx";
import Card from "../../components/card/card.component.jsx";
import SortShopping from "../../components/sort-shopping/sort-shopping.component.jsx";

function ShoppingList() {
  const { uid } = useSelector((state) => state.firebase.auth);
  useFirestoreConnect({
    collection: `users/${uid}/shoppingList`,
    storeAs: "shoppingList",
  });

  const firestore = useFirestore();
  const recipes = useSelector((state) => state.firestore.data.shoppingList);

  const shoppingListCollectionRef = firestore
    .collection("users")
    .doc(uid)
    .collection("shoppingList");

  let recipeNames = [];
  if (recipes) {
    recipeNames = Object.values(recipes).map((recipe) => {
      if (recipe !== null) return recipe.name;
    });
  }

  const removeRecipeFromShoppingList = (event) => {
    event.preventDefault();
    let id = event.target.value;
    shoppingListCollectionRef
      .doc(id)
      .delete()
      .catch((error) => {
        console.log("error removing document", error);
      });
  };

  const removeIngredientFromShoppingList = (event) => {
    event.preventDefault();
    const [id, ingredient, index] = event.target.name.split("&");

    shoppingListCollectionRef.doc(id).update({
      ingredients: firestore.FieldValue.arrayRemove(ingredient),
    });
  };

  let sortShoppingRecipe = {};

  // shoppingListCollectionRef.add(temp).then((docRef) => {
  //   docRef.update({
  //     id: docRef.id,
  //   });
  // });

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h2 className="title">Shopping List</h2>
        <OddBits uid={uid} />
        <SortShopping recipes={recipes} />
      </div>
      {recipes ? (
        <CardList
          recipes={recipes}
          removeFromRecipes={removeRecipeFromShoppingList}
          cardButton={removeRecipeFromShoppingList}
          ingredientButton={removeIngredientFromShoppingList}
        />
      ) : (
        <div className="recipes-empty">
          <h2>No recipes in your shopping list.</h2>
          <h2>Go to Recipes to add some!</h2>
        </div>
      )}
    </div>
  );
}

export default ShoppingList;
