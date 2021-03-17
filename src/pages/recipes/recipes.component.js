import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notification } from "../../App/app.utils";

import { recipeEdited, recipeRemoved } from "./recipesSlice";
import { shoppingListAdded } from "../home/shopping-listSlice";

import Card from "../../components/card/card.component.jsx";
import SearchBox from "../../components/search-box/searchbox.component.js";
import FadeIn from "react-fade-in";
import CustomButton from "../../components/custom-button/custom-button.component.jsx";
import IngredientInput from "../../components/ingredient-input/ingredient-input.component.js";
import Masonry from "react-masonry-css";

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

  const numOfColumns = () => {
    if (recipes.length === 1) {
      return 1;
    } else if (recipes.length === 2) {
      return 2;
    } else {
      return 3;
    }
  };

  const breakpointColumnsObj = {
    default: numOfColumns(),
    1400: 2,
    1000: 1,
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
    <div className="center">
      <FadeIn>
        <h2 className="tc w-90 w-80-m w-50-ns mw6 center pv3 bg-nearwhite shadow-4 br3">
          Recipe List
        </h2>
        {editingRecipe.id === "" ? null : (
          <article className="center w-90 w-80-m w-50-ns mw6 bg-nearwhite shadow-4 br3 hidden ba b--black-10 pa2 mv4">
            <h2 className="tc w-90 w-80-m w-50-ns mw6 center mv1">
              Edit Recipe
            </h2>
            <div className="tc pa1 ph2-ns w-100 ">
              <div className="ph2">
                <input
                  name="name"
                  placeholder="Recipe Name"
                  className={` ma1 ph1 pv2 input-reset ba bg-transparent br2 hover-bg-light-gray w-50-ns w-90  `}
                  onChange={inputEditChangeHandler}
                  value={editingRecipe.name}
                  autoComplete="off"
                />
                <input
                  name="link"
                  placeholder="Link"
                  className={` ma1 ph1 pv2 input-reset ba bg-transparent br2 hover-bg-light-gray w-50-ns w-90 `}
                  onChange={inputEditChangeHandler}
                  value={editingRecipe.link}
                  autoComplete="off"
                />
              </div>

              <IngredientInput
                inputList={inputList}
                setInputList={setInputList}
              />
            </div>
            <div className="center ph1 tc w-50-ns w-90">
              <CustomButton
                className="pv3 w-90"
                value="editRecipe"
                onClick={editRecipeDone}
              >
                Done
              </CustomButton>
            </div>
          </article>
        )}
        <div className="center mw6 br3 bg-nearwhite w-90 w-80-m w-50-ns ma2 hidden shadow-4 ttc ba b--black-10 mv4">
          <div className="">
            <SearchBox
              searchChange={onSearchChange}
              searchField={searchField}
            />
          </div>
        </div>
        {filteredRecipes.length ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {filteredRecipes.map((recipe) => {
              return (
                <Card
                  removeFromRecipes={removeFromRecipes}
                  recipe={recipe}
                  key={recipe.id}
                  button={addToShoppingList}
                  editRecipe={editRecipeCardButton}
                />
              );
            })}
          </Masonry>
        ) : searchField.length ? (
          <div className="tc w-90 w-80-m w-50-ns mv3 mw6 center pv3 bg-nearwhite shadow-4 br3">
            <h2 className="tc center">Recipe not found.</h2>
          </div>
        ) : (
          <div className="tc w-90 w-80-m w-50-ns mv3 mw6 center pv3 bg-nearwhite shadow-4 br3">
            <h2 className="tc center">No recipes in your recipe list.</h2>
            <h2 className="tc center">Go to Add a recipe to add some!</h2>
          </div>
        )}
      </FadeIn>
    </div>
  );
};

export default Recipes;
