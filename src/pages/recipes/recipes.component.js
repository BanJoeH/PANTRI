import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { notification } from "../../App/app.utils";

import CardList from "../../components/cardList/card-list.component";
import SearchBox from "../../components/search-box/searchbox.component.js";
import CustomButton from "../../components/custom-button/custom-button.component.jsx";
import IngredientInput from "../../components/ingredient-input/ingredient-input.component.js";
import CustomInput from "../../components/custom-input/custom-input.component";

const Recipes = () => {
  const [editingRecipe, setEditingRecipe] = useState({
    id: "",
    name: "",
    link: "",
    ingredients: [],
  });
  const [inputList, setInputList] = useState([
    {
      ingredient: "",
      ingredientRef: null,
    },
  ]);
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

  console.log(recipes);
  if (recipes) {
    filteredRecipes = recipes.filter((recipe) => {
      if (recipe !== null) {
        return recipe.name.toLowerCase().includes(searchField.toLowerCase());
      }
    });
  }

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const inputEditChangeHandler = (event) => {
    setEditingRecipe((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const addToShoppingList = (event) => {
    event.preventDefault();
    let { value } = event.target;
    recipes.find((recipe) => {
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

  const editRecipeDone = (event) => {
    event.preventDefault();

    recipesCollectionRef
      .doc(editingRecipe.id)
      .delete()
      .then(() => {
        recipesCollectionRef
          .add(editingRecipe)
          .then((docRef) => {
            docRef.update({
              id: docRef.id,
            });
          })
          .catch((error) => {
            console.log("error adding replacing with new recipe", error);
          });
      })
      .catch((error) => {
        console.log("error removing old recipe", error);
      });
    notification(editingRecipe.name, "edited", "info");
    setEditingRecipe({
      id: "",
      name: "",
      link: "",
      ingredients: [],
    });
    setInputList([
      {
        ingredient: "",
        ingredientRef: null,
      },
    ]);
  };

  useEffect(() => {
    setEditingRecipe((prevState) => ({
      ...prevState,
      ingredients: inputList
        .map((item) => {
          return item.ingredient;
        })
        .filter(Boolean),
    }));
  }, [inputList]);

  useEffect(() => {
    let newState = [];
    if (editingRecipe.id) {
      newState = editingRecipe.ingredients.map((ingredient) => {
        return { ingredient: ingredient, ingredientRef: null };
      });
    } else {
      return (newState = [
        {
          ingredient: "",
          ingredientRef: null,
        },
      ]);
    }
    setInputList(newState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingRecipe.ingredients.length]);

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h2 className="title">Recipe List</h2>
        {editingRecipe.id === "" ? null : (
          <article className="card">
            <h2>Edit Recipe</h2>

            <div className="card-body">
              <CustomInput
                name="name"
                label="Recipe Name"
                handleChange={inputEditChangeHandler}
                value={editingRecipe.name}
                autoComplete="off"
              />
              <CustomInput
                name="link"
                label="Link"
                handleChange={inputEditChangeHandler}
                value={editingRecipe.link}
                autoComplete="off"
              />
              <IngredientInput
                inputList={inputList}
                setInputList={setInputList}
              />
            </div>

            <CustomButton value="editRecipe" onClick={editRecipeDone}>
              Done
            </CustomButton>
          </article>
        )}

        <SearchBox searchChange={onSearchChange} searchField={searchField} />
      </div>
      {filteredRecipes ? (
        <CardList
          recipes={filteredRecipes}
          removeFromRecipes={removeFromRecipes}
          cardButton={addToShoppingList}
          editRecipeCardButton={editRecipeCardButton}
        />
      ) : searchField.length ? (
        <h2 className="title">Recipe not found.</h2>
      ) : (
        <div className="recipes-empty">
          <h2>No recipes in your recipe list.</h2>
          <h2>Go to Add a recipe to add some!</h2>
        </div>
      )}
    </div>
  );
};

export default Recipes;
