import { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { notification } from "../../App/app.utils";

import CardList from "../../components/cardList/card-list.component";
import SearchBox from "../../components/search-box/searchbox.component.js";
import NewRecipe from "../new-recipe/new-recipe.component";
import EditRecipe from "../../components/edit-recipe/edit-recipe.component";

const Recipes = () => {
  const [editingRecipe, setEditingRecipe] = useState({
    id: "",
    name: "",
    link: "",
    ingredients: [],
  });
  const [searchField, setSearchField] = useState("");
  const { uid } = useSelector((state) => state.firebase.auth);
  useFirestoreConnect({
    collection: `users/${uid}/recipes`,
    storeAs: "recipes",
  });
  const firestore = useFirestore();

  const shoppingListCollectionRef = firestore
    .collection("users")
    .doc(uid)
    .collection("shoppingList");

  const recipesCollectionRef = firestore
    .collection("users")
    .doc(uid)
    .collection("recipes");

  const recipes = useSelector((state) => state.firestore.ordered.recipes);
  let filteredRecipes = [];

  if (recipes?.length) {
    filteredRecipes = recipes.filter((recipe) => {
      if (recipe?.name) {
        return recipe.name.toLowerCase().includes(searchField.toLowerCase());
      }
    });
  }

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const addToShoppingList = (event) => {
    event.preventDefault();
    let { value } = event.target;
    recipes.forEach((recipe) => {
      if (recipe.id !== null && recipe.id === value) {
        shoppingListCollectionRef.add(recipe).then((docRef) => {
          docRef.update({
            id: docRef.id,
          });
        });
        notification(recipe.name, "Added to your shopping list", "success");
      }
    });
    setSearchField("");
  };

  const removeFromRecipes = async (event) => {
    event.preventDefault();

    if (
      window.confirm("Are you sure you want to permanently delete this recipe?")
    ) {
      let id = event.target.value;

      recipesCollectionRef
        .doc(id)
        .delete()
        .then(() => {
          notification("", "Deleted", "danger");
        })
        .catch((error) => {
          console.log("error removing document", error);
        });
      setSearchField("");
    }
  };

  const editRecipeCardButton = (event) => {
    event.preventDefault();
    let recipeToEdit = recipes.find((item) => item.id === event.target.value);
    setEditingRecipe(recipeToEdit);
  };

  const updateRecipe = (event) => {
    event.preventDefault();
    recipesCollectionRef
      .doc(editingRecipe.id)
      .update(editingRecipe)
      .then(notification(editingRecipe.name, "edited", "info"))
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

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h2 className="title">Recipe List</h2>
        <EditRecipe
          editingRecipe={editingRecipe}
          setEditingRecipe={setEditingRecipe}
          updateRecipe={updateRecipe}
        />
        <NewRecipe />
        <SearchBox searchChange={onSearchChange} searchField={searchField} />
      </div>
      {filteredRecipes?.length ? (
        <CardList
          recipes={filteredRecipes}
          removeFromRecipes={removeFromRecipes}
          cardButton={addToShoppingList}
          editRecipeCardButton={editRecipeCardButton}
        />
      ) : searchField.length ? (
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
