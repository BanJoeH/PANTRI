import React from "react";

import { useFirestoreConnect, useFirestore } from "react-redux-firebase";

import { useSelector } from "react-redux";
import {
  normalizeIngredients,
  setPurchasedInRecipeIngredient,
} from "./shopping-list.utils";

import OddBits from "../../components/oddbits/oddbits.component";
import CardList from "../../components/cardList/card-list.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import {
  findRecipe,
  removeFromFirebaseCollection,
  notification,
} from "../../App/app.utils";
import PageContainer from "../../components/page-container/page-container";
import PageHeaderContainer from "../../components/page-header-container/page-header-container";
import { useHistory } from "react-router-dom";

const ShoppingList = () => {
  const { uid } = useSelector((state) => state.firebase.auth);
  const isLoading = useSelector(
    (state) => state.firestore.status.requesting.shoppingList,
  );
  const history = useHistory();

  useFirestoreConnect({
    collection: `users/${uid}/shoppingList`,
    storeAs: "shoppingList",
  });

  const firestore = useFirestore();
  const recipesObject = useSelector((state) => {
    return state.firestore.data.shoppingList;
  });
  const recipes = Object.entries(recipesObject || {})
    .map(([key, value]) => {
      if (value) {
        // Stable sort: purchased ingredients fall to the bottom of each
        // recipe card while preserving the user's original ordering inside
        // each group.
        const ingredients = normalizeIngredients(value.ingredients).sort(
          (a, b) => Number(a.purchased) - Number(b.purchased),
        );
        return {
          id: key,
          ...value,
          ingredients,
        };
      }
      return null;
    })
    .filter(Boolean);
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
      shoppingListCollectionRef,
    );
    if (response === "error") {
      notification(
        "Error",
        "Error removing recipe, please try again",
        "danger",
      );
    } else {
      notification(response.name, "Deleted", "success");
    }
  };

  // Local-only tick: flips just this one ingredient instance inside this
  // recipe. The grouped view's mental model is "this recipe's stuff", so we
  // deliberately don't fan out to other recipes or odd bits here. The sorted
  // view is where the "I bought potatoes once, that's enough for everything"
  // gesture lives.
  const handleToggleIngredientPurchased = (ingredient, recipeId, index) => {
    setPurchasedInRecipeIngredient(
      recipeId,
      index,
      !ingredient.purchased,
      recipes,
      shoppingListCollectionRef,
    );
  };

  if (isLoading) {
    return null;
  }
  return (
    <PageContainer>
      <PageHeaderContainer title="Shopping List">
        <OddBits />
        {recipes?.length ? (
          <div style={{ margin: "0 5%" }}>
            <CustomButton onClick={() => history.push("/home/sorted")}>
              Sort Shopping
            </CustomButton>
          </div>
        ) : null}
      </PageHeaderContainer>
      {recipes?.length ? (
        <CardList
          recipes={recipes}
          removeFromRecipes={handleRemoveFromShoppingClick}
          cardButton={handleRemoveFromShoppingClick}
          ingredientButton={handleToggleIngredientPurchased}
        />
      ) : (
        <div
          className="card"
          onClick={() => {
            history.push("/home/recipes");
          }}
          style={{ cursor: "pointer" }}
        >
          <h2>No recipes in your shopping list.</h2>
          <h2>Go to Recipes to add some!</h2>
        </div>
      )}
    </PageContainer>
  );
};

export default ShoppingList;
