import React, { useMemo } from "react";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

import {
  buildSortedIngredients,
  normalizeIngredients,
  setPurchasedInOddBits,
  setPurchasedInShoppingList,
} from "../shopping-list/shopping-list.utils";

import IngredientList from "../../components/ingredient-list/ingredient-list.component";
import PageContainer from "../../components/page-container/page-container";
import PageHeaderContainer from "../../components/page-header-container/page-header-container";
import CustomButton from "../../components/custom-button/custom-button.component";
import { useAppSelector } from "../../App/hooks";
import type { ShoppingRecipe, SortedIngredient } from "../../types";

import "./sorted-shopping.styles.scss";

const SortedShopping = (): JSX.Element | null => {
  const uid = useAppSelector((state) => state.firebase.auth.uid);
  const history = useHistory();

  useFirestoreConnect({
    collection: `users/${uid}/shoppingList`,
    storeAs: "shoppingList",
  });

  const isLoading = useAppSelector(
    (state) => state.firestore.status.requesting.shoppingList,
  );
  const recipesObject = useAppSelector(
    (state) =>
      state.firestore.data.shoppingList as unknown as
        | Record<string, ShoppingRecipe>
        | undefined,
  );
  const oddBits = useAppSelector((state) => state.firebase.profile.oddBits);

  const firestore = useFirestore();
  const profileRef = firestore.collection("users").doc(uid);
  const shoppingListCollectionRef = profileRef.collection("shoppingList");

  const recipes = useMemo<ShoppingRecipe[]>(
    () =>
      Object.entries(recipesObject || {})
        .map(([key, value]) =>
          value
            ? {
                ...value,
                id: key,
                ingredients: normalizeIngredients(value.ingredients),
              }
            : null,
        )
        .filter((recipe): recipe is ShoppingRecipe => Boolean(recipe)),
    [recipesObject],
  );

  const { toBuy, gotIt } = useMemo(() => {
    const flat = buildSortedIngredients(recipes, oddBits);
    return {
      toBuy: flat.filter((i) => !i.purchased),
      gotIt: flat.filter((i) => i.purchased),
    };
  }, [recipes, oddBits]);
  const isEmpty = toBuy.length === 0 && gotIt.length === 0;

  const handleToggle = (ingredient: { name: string; purchased?: boolean }) => {
    const newValue = !ingredient.purchased;
    // Fan out to both stores: a row may correspond to recipe ingredients,
    // odd bits, or both. Each writer no-ops if it has no matches.
    Promise.all([
      setPurchasedInShoppingList(
        ingredient.name,
        newValue,
        recipes,
        shoppingListCollectionRef,
      ),
      setPurchasedInOddBits(ingredient.name, newValue, oddBits, profileRef),
    ]);
  };

  if (isLoading) {
    return null;
  }

  return (
    <PageContainer>
      <PageHeaderContainer title="Sorted Shopping">
        <div className="sorted-shopping-actions">
          <CustomButton onClick={() => history.push("/home/shopping-list")}>
            Back to list
          </CustomButton>
        </div>
      </PageHeaderContainer>
      {isEmpty ? (
        <div className="card">
          <h2>Nothing to shop for.</h2>
          <h2>Add some recipes to your shopping list first.</h2>
        </div>
      ) : (
        <div className="card sorted-shopping-card">
          {toBuy.length > 0 ? (
            <IngredientList
              recipeId="sorted-to-buy"
              ingredients={toBuy}
              ingredientButton={handleToggle}
            />
          ) : (
            <div className="sorted-shopping-empty-section">
              All done — nothing left to buy.
            </div>
          )}
          {gotIt.length > 0 ? (
            <>
              <div className="sorted-shopping-divider" role="separator">
                <span>Got it ({gotIt.length})</span>
              </div>
              <div className="sorted-shopping-got-it">
                <IngredientList
                  recipeId="sorted-got-it"
                  ingredients={gotIt}
                  ingredientButton={handleToggle}
                />
              </div>
            </>
          ) : null}
        </div>
      )}
    </PageContainer>
  );
};

export default SortedShopping;
