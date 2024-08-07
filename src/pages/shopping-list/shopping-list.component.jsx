import React from "react";

import { useFirestoreConnect, useFirestore } from "react-redux-firebase";

import { useSelector } from "react-redux";
import { removeIngredientFromShoppingList } from "./shopping-list.utils";

import OddBits from "../../components/oddbits/oddbits.component";
import CardList from "../../components/cardList/card-list.component";
import SortShopping from "../../components/sort-shopping/sort-shopping.component";
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
        return {
          id: key,
          ...value,
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

  const handleRemoveIngredientFromShoppingListItemClick = (e) => {
    e.preventDefault();
    const [recipeId, , ingredientIndex] = e.target.name.split("&");
    const recipe = findRecipe(recipeId, recipes);
    const updatedIngredients = recipe.ingredients.slice();
    updatedIngredients.splice(ingredientIndex, 1);

    removeIngredientFromShoppingList(
      recipeId,
      updatedIngredients,
      shoppingListCollectionRef,
    );
  };

  return (
    !isLoading && (
      <PageContainer>
        <PageHeaderContainer title="Shopping List">
          <OddBits />
          {recipes?.length ? <SortShopping recipes={recipes} /> : null}
        </PageHeaderContainer>
        {recipes?.length ? (
          <CardList
            recipes={recipes}
            removeFromRecipes={handleRemoveFromShoppingClick}
            cardButton={handleRemoveFromShoppingClick}
            ingredientButton={handleRemoveIngredientFromShoppingListItemClick}
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
    )
  );
};

export default ShoppingList;
