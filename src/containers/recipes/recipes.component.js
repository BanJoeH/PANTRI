import { useState, useEffect } from "react";
import Card from "../../components/card/card.component.jsx";
import SearchBox from "../../components/search-box/searchbox.component.js";
import FadeIn from "react-fade-in";
import CustomButton from "../../components/custom-button/custom-button.component.jsx";
import IngredientInput from "../../components/ingredient-input/ingredient-input.component.js";
import Masonry from "react-masonry-css";

function Recipes({
  recipes,
  cardButton,
  removeFromRecipes,
  onSearchChange,
  searchField,
  setRecipes,
}) {
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

  const inputEditChangeHandler = (event) => {
    setEditingRecipe((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const editRecipeCardButton = (event) => {
    event.preventDefault();
    let recipe = recipes.find((item) => item.id === event.target.value);
    setEditingRecipe(recipe);
  };

  const editRecipeDone = (event) => {
    event.preventDefault();
    setRecipes(
      recipes.map((recipe) => {
        if (editingRecipe.id === recipe.id) {
          return editingRecipe;
        } else {
          return recipe;
        }
      })
    );
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
      defaultState = editingRecipe.ingredients.map((item) => {
        return { ingredient: item, ingredientRef: null };
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
                Onclick={editRecipeDone}
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
        {recipes.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {recipes.map((recipe, i) => {
              return (
                <Card
                  recipeIndex={i}
                  removeFromRecipes={removeFromRecipes}
                  recipe={recipe}
                  key={recipe + i}
                  button={cardButton}
                  buttonText="Add To Shopping List"
                  editRecipe={editRecipeCardButton}
                />
              );
            })}
          </Masonry>
        ) : (
          <div className="tc w-90 w-80-m w-50-ns mv3 mw6 center pv3 bg-nearwhite shadow-4 br3">
            <h2 className="tc center">No recipes in your recipe list.</h2>
            <h2 className="tc center">Go to Add a recipe to add some!</h2>
          </div>
        )}
      </FadeIn>
    </div>
  );
}

export default Recipes;
