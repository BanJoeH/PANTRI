import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notification } from "../../App/app.utils";

import { recipeEdited, recipeRemoved } from "./recipesSlice";
import { shoppingListAdded } from "../home/shopping-listSlice";

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

  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("storedRecipes", JSON.stringify(recipes));
  }, [recipes]);

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const inputEditChangeHandler = (event) => {
    setEditingRecipe((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchField.toLowerCase());
  });

  const addToShoppingList = (event) => {
    event.preventDefault();
    let { value } = event.target;
    recipes.find((recipe) => {
      if (recipe.id === value) {
        dispatch(shoppingListAdded(recipe));
        notification(recipe.name, "Added to your shopping list");
      }
    });
    setSearchField("");
  };

  const removeFromRecipes = (event) => {
    event.preventDefault();

    if (
      window.confirm("Are you sure you want to permanently delete this recipe?")
    ) {
      let id = event.target.value.split(" ")[0];
      dispatch(recipeRemoved(id));
      setSearchField("");
    }
  };

  const editRecipeCardButton = (event) => {
    event.preventDefault();
    console.log(event);
    let recipeToEdit = recipes.find((item) => item.id === event.target.value);
    setEditingRecipe(recipeToEdit);
  };

  const editRecipeDone = (event) => {
    event.preventDefault();
    console.log(event);
    dispatch(recipeEdited(editingRecipe));
    notification(editingRecipe.name, "edited");
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
    let defaultState = [];
    if (editingRecipe.id !== "") {
      defaultState = editingRecipe.ingredients.map((ingredient) => {
        return { ingredient: ingredient, ingredientRef: null };
      });
    } else {
      return (defaultState = [
        {
          ingredient: "",
          ingredientRef: null,
        },
      ]);
    }
    setInputList(defaultState);
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
      {filteredRecipes.length ? (
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
