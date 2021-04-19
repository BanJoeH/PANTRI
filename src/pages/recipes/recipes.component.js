import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { notification } from "../../App/app.utils";
import {
  removeFromRecipes,
  filteredRecipesByName,
  updateRecipe,
  addToShoppingList,
  editRecipeCardButton,
} from "./recipes.utils";

import CardList from "../../components/cardList/card-list.component";
import SearchBox from "../../components/search-box/searchbox.component.js";
import NewRecipe from "../../components/new-recipe/new-recipe.component";
import EditRecipe from "../../components/edit-recipe/edit-recipe.component";
import useDebounce from "../../App/useDebounce.utils";

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
  const { uid } = useSelector((state) => state.firebase.auth);
  const recipes = useSelector((state) => state.firestore.ordered.recipes) || [];
  const isloading = useSelector(
    (state) => state.firestore.status.requesting.recipes
  );
  const loaded = useSelector(
    (state) => state.firestore.status.requested.recipes
  );
  const recipesFiltered = filteredRecipesByName(recipes, debouncedSearchTerm);
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

  const handleRemoveFromRecipesClick = (e) => {
    e.preventDefault();
    if (
      window.confirm("Are you sure you want to permanently delete this recipe?")
    ) {
      const recipeId = e.target.value;
      removeFromRecipes(recipeId, recipesCollectionRef);
    }
  };

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleAddToShoppingListClick = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    const response = await addToShoppingList(
      value,
      recipes,
      shoppingListCollectionRef
    );
    notification(response.name, "Added to your shopping list", "success");
    setSearchField("");
  };

  useEffect(() => {
    console.log("mount");
  });

  const handleEditRecipeCardButtonClick = (e) => {
    e.preventDefault();
    setEditingRecipe(editRecipeCardButton(e, recipes));
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
      <div className="page fade-in">
        <div className="page-header">
          <h2 className="title">Recipe List</h2>
          <EditRecipe
            editingRecipe={editingRecipe}
            setEditingRecipe={setEditingRecipe}
            updateRecipe={handleUpdateRecipeClick}
          />
          <NewRecipe />
          <SearchBox searchChange={onSearchChange} searchField={searchField} />
        </div>
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
            <h2>Go to Add a recipe to add some!</h2>
          </div>
        )}
      </div>
    )
  );
};

export default Recipes;
