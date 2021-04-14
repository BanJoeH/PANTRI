import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { notification } from "../../App/app.utils";
import { removeFromRecipes } from "./recipes.utils";

import CardList from "../../components/cardList/card-list.component";
import SearchBox from "../../components/search-box/searchbox.component.js";
import NewRecipe from "../new-recipe/new-recipe.component";
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
  const recipes = useSelector((state) => state.firestore.ordered.recipes);
  const isloading = useSelector(
    (state) => state.firestore.status.requesting.recipes
  );
  const loaded = useSelector(
    (state) => state.firestore.status.requested.recipes
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

  const filteredRecipes = (list) => {
    let recipes = [];
    if (list) {
      recipes = list.filter((recipe) => {
        if (recipe.name) {
          return recipe.name
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase());
        }
      });
    }
    return recipes;
  };

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const addToShoppingList = (event, list, ref) => {
    event.preventDefault();
    let { value } = event.target;
    list.forEach((item) => {
      if (item.id && item.id === value) {
        ref.add(item).then((docRef) => {
          docRef.update({
            id: docRef.id,
          });
        });
        notification(item.name, "Added to your shopping list", "success");
      }
    });
    setSearchField("");
  };

  const editRecipeCardButton = (event, list) => {
    event.preventDefault();
    let recipeToEdit = list.find((item) => item.id === event.target.value);
    setEditingRecipe(recipeToEdit);
  };

  const updateRecipe = (event, item, ref) => {
    event.preventDefault();
    ref
      .doc(item.id)
      .update(item)
      .then(notification(item.name, "edited", "info"))
      .then(
        setEditingRecipe({
          id: "",
          name: "",
          link: "",
          ingredients: [],
        })
      )
      .catch((error) => {
        notification("ERROR", "error updating recipe", "info");
        console.log("error updating recipe", error);
      });
  };

  useEffect(() => {
    setSearchField("");
  }, [recipes]);

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h2 className="title">Recipe List</h2>
        <EditRecipe
          editingRecipe={editingRecipe}
          setEditingRecipe={setEditingRecipe}
          updateRecipe={(e) => {
            updateRecipe(e, editingRecipe, recipesCollectionRef);
          }}
        />
        <NewRecipe />
        <SearchBox searchChange={onSearchChange} searchField={searchField} />
      </div>
      {!isloading && loaded && filteredRecipes.length ? (
        <CardList
          recipes={filteredRecipes(recipes)}
          removeFromRecipes={(e) => {
            removeFromRecipes(e, recipesCollectionRef);
          }}
          cardButton={(e) => {
            addToShoppingList(e, recipes, shoppingListCollectionRef);
          }}
          editRecipeCardButton={(e) => {
            editRecipeCardButton(e, recipes);
          }}
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
  );
};

export default Recipes;
