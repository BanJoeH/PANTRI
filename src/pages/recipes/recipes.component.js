import { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { notification } from "../../App/app.utils";
import {
  updateRecipe,
  filteredRecipesByIngredientAndName,
} from "./recipes.utils";

import {
  findRecipe,
  addToFirebaseCollection,
  removeFromFirebaseCollection,
} from "../../App/app.utils";
import useDebounce from "../../App/useDebounce.utils";

import CardList from "../../components/cardList/card-list.component";
import SearchBox from "../../components/search-box/searchbox.component.js";
import NewRecipe from "../../components/new-recipe/new-recipe.component";
import EditRecipe from "../../components/edit-recipe/edit-recipe.component";
import PageContainer from "../../components/page-container/page-container";
import PageHeaderContainer from "../../components/page-header-container/page-header-container";

const Recipes = () => {
  const [editingRecipe, setEditingRecipe] = useState({
    id: "",
    name: "",
    link: "",
    ingredients: [],
  });
  const [searchField, setSearchField] = useState("");
  const debouncedSearchTerm = useDebounce(searchField, 200);

  const firestore = useFirestore();
  const uid = useSelector((state) => state.firebase.auth.uid);
  const recipesObject = useSelector((state) => state.firestore.ordered.recipes);
  const recipes = Object.entries(recipesObject || {}).map(([key, value]) => {
    if (value) {
      return {
        id: key,
        ...value,
      };
    }
    return null
  }).filter(Boolean);
  const isloading = useSelector(
    (state) => state.firestore.status.requesting.recipes
  );
  const loaded = useSelector(
    (state) => state.firestore.status.requested.recipes
  );
  const recipesFiltered = filteredRecipesByIngredientAndName(
    recipes,
    debouncedSearchTerm
  );
  useFirestoreConnect({
    collection: `users/${uid}/recipes`,
    storeAs: "recipes",
  });

  const shoppingListCollectionRef = firestore
    .collection("users")
    .doc(uid)
    .collection("shoppingList");

  const recipesCollectionRef = firestore
    .collection("users")
    .doc(uid)
    .collection("recipes");

  const handleRemoveFromRecipesClick = async (e, recipe) => {
    e.preventDefault();
    if (
      window.confirm(
        `Are you sure you want to permanently delete ${recipe.name}?`
      )
    ) {
      const response = await removeFromFirebaseCollection(
        recipe,
        recipesCollectionRef
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
    }
  };

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleAddToShoppingListClick = async (e, recipe) => {
    console.log("adding to shopping List")
    e.preventDefault();
    const response = await addToFirebaseCollection(
      recipe,
      shoppingListCollectionRef
    );
    if (response === "error") {
      notification("Error", "error adding to shopping list", "danger");
    } else {
      notification(response.name, "Added to your shopping list", "success");
      setSearchField("");
    }
  };

  const handleEditRecipeCardButtonClick = (e, recipe) => {
    e.preventDefault();
    console.log(recipe)
    if (recipe === undefined) {
      notification(
        "error",
        "error finding recipe, please contact admin to resolve issue",
        "danger"
      );
    } else {
      setEditingRecipe(recipe);
    }
  };

  const handleUpdateRecipeClick = async (e) => {
    e.preventDefault();

    const response = await updateRecipe(editingRecipe, recipesCollectionRef);
    if (response === "succeeded") {
      setEditingRecipe({
        id: "",
        name: "",
        link: "",
        ingredients: [],
      });
      notification(editingRecipe.name, "updated", "info");
    } else {
      notification("Error", "error updating recipe, please try again", "info");
    }
  };

  return (
    !isloading && (
      <PageContainer>
        <PageHeaderContainer title="Recipe List">
          <EditRecipe
            editingRecipe={editingRecipe}
            setEditingRecipe={setEditingRecipe}
            updateRecipe={handleUpdateRecipeClick}
          />
          <NewRecipe />
          <SearchBox searchChange={onSearchChange} searchField={searchField} />
        </PageHeaderContainer>
        {!isloading && loaded && recipesFiltered.length ? (
          <CardList
            recipes={recipesFiltered}
            removeFromRecipes={handleRemoveFromRecipesClick}
            cardButton={handleAddToShoppingListClick}
            editRecipeCardButton={handleEditRecipeCardButtonClick}
          />
        ) : searchField ? (
          <div className="card">
            <h2>Recipe not found.</h2>
          </div>
        ) : (
          <div className="card">
            <h2>No recipes in your recipe list.</h2>
            <h2>Click add a recipe above to add some!</h2>
          </div>
        )}
      </PageContainer>
    )
  );
};

export default Recipes;
