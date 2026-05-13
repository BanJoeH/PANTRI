import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import {
  SHOPPING_SECTIONS,
  type IngredientCategoryOverrides,
  type ShoppingRecipe,
  type SortedIngredient,
} from "../../types";
import { getCanonicalIngredientName } from "../shopping-list/shopping-list.utils";
import {
  getIngredientSection,
  groupIngredientsBySection,
} from "./sorted-shopping.utils";

import "./sorted-shopping.styles.scss";

type SortMode = "alphabetical" | "section";

const SortedShopping = (): JSX.Element | null => {
  const uid = useAppSelector((state) => state.firebase.auth.uid);
  const history = useHistory();
  const [sortMode, setSortMode] = useState<SortMode>("section");
  const [openCategoryMenu, setOpenCategoryMenu] = useState<string | null>(null);
  const categoryMenuRef = useRef<HTMLDivElement | null>(null);

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
  const ingredientCategories =
    useAppSelector((state) => state.firebase.profile.ingredientCategories) ||
    {};

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
  const sectionGroups = useMemo(
    () => groupIngredientsBySection(toBuy, ingredientCategories),
    [toBuy, ingredientCategories],
  );
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

  const handleSortModeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortMode(event.target.value as SortMode);
  };

  const handleSectionChange = (
    ingredient: { name: string },
    section: string,
  ) => {
    const key = getCanonicalIngredientName(ingredient.name);
    const updated: IngredientCategoryOverrides = {
      ...ingredientCategories,
      [key]: section as IngredientCategoryOverrides[string],
    };
    profileRef.set({ ingredientCategories: updated }, { merge: true });
    setOpenCategoryMenu(null);
  };

  useEffect(() => {
    if (!openCategoryMenu) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      const clickedInside = categoryMenuRef.current?.contains(target);
      if (!clickedInside) {
        setOpenCategoryMenu(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [openCategoryMenu]);

  const renderCategoryMenu = (ingredient: { name: string }) => {
    const key = getCanonicalIngredientName(ingredient.name);
    const isOpen = openCategoryMenu === key;
    const currentSection = getIngredientSection(
      ingredient.name,
      ingredientCategories,
    );

    return (
      <div
        className="sorted-shopping-category-menu"
        ref={isOpen ? categoryMenuRef : undefined}
      >
        <button
          aria-expanded={isOpen}
          aria-label={`Change section for ${ingredient.name}`}
          className="sorted-shopping-category-menu-button"
          onClick={() => setOpenCategoryMenu(isOpen ? null : key)}
          type="button"
        >
          ⋯
        </button>
        {isOpen ? (
          <div className="sorted-shopping-category-menu-popover">
            <div className="sorted-shopping-category-menu-title">
              Move to section
            </div>
            {SHOPPING_SECTIONS.map((section) => (
              <button
                className={
                  section === currentSection
                    ? "sorted-shopping-category-option sorted-shopping-category-option--active"
                    : "sorted-shopping-category-option"
                }
                key={section}
                onClick={() => handleSectionChange(ingredient, section)}
                type="button"
              >
                {section}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
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
          <label className="sorted-shopping-sort">
            <span>Sort</span>
            <select value={sortMode} onChange={handleSortModeChange}>
              <option value="section">By section</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </label>
        </div>
      </PageHeaderContainer>
      {isEmpty ? (
        <div className="card">
          <h2>Nothing to shop for.</h2>
          <h2>Add some recipes to your shopping list first.</h2>
        </div>
      ) : (
        <div className="card sorted-shopping-card">
          {toBuy.length > 0 && sortMode === "alphabetical" ? (
            <IngredientList
              recipeId="sorted-to-buy"
              ingredients={toBuy}
              ingredientButton={handleToggle}
              renderIngredientMeta={renderCategoryMenu}
            />
          ) : toBuy.length > 0 ? (
            <div className="sorted-shopping-sections">
              {sectionGroups.map(({ section, ingredients }) => (
                <section className="sorted-shopping-section" key={section}>
                  <h3 className="sorted-shopping-section-title">{section}</h3>
                  <IngredientList
                    recipeId={`sorted-to-buy-${section}`}
                    ingredients={ingredients}
                    ingredientButton={handleToggle}
                    renderIngredientMeta={renderCategoryMenu}
                  />
                </section>
              ))}
            </div>
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
