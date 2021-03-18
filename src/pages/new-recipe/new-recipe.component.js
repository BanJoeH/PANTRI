import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { notification } from "../../App/app.utils";
import { recipeAdded } from "../recipes/recipesSlice";
import CustomButton from "../../components/custom-button/custom-button.component.jsx";
import IngredientInput from "../../components/ingredient-input/ingredient-input.component.js";
import CustomInput from "../../components/custom-input/custom-input.component";
import FadeIn from "react-fade-in";

const ID = () => {
  return Math.random().toString(36).substr(2, 9);
};

function NewRecipe() {
  const [inputList, setInputList] = useState([
    { ingredient: "", ingredientRef: null },
  ]);
  const [newRecipe, setNewRecipe] = useState({
    id: ID(),
    name: "",
    link: "",
    ingredients: [],
  });

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  useEffect(() => {
    let ingredients = inputList
      .map((input, i) => {
        return input.ingredient.toLowerCase();
      })
      .filter(Boolean);
    setNewRecipe({ ...newRecipe, ingredients: ingredients });
  }, [inputList]);

  const addRecipe = (event) => {
    event.preventDefault();
    dispatch(recipeAdded(newRecipe));
    notification(newRecipe.name, "Added to Recipes");
    setNewRecipe({ id: ID(), name: "", link: "", ingredients: [] });
    setInputList([{ ingredient: "", ingredientRef: null }]);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="title">New Recipe</h2>

        <div className="card">
          <h3>Add a new recipe here</h3>
          <CustomInput
            name="name"
            label="Recipe Name"
            handleChange={handleChange}
            value={newRecipe.name}
          />
          <CustomInput
            name="link"
            label="Link"
            handleChange={handleChange}
            value={newRecipe.link}
            autoComplete="off"
          />
          <IngredientInput inputList={inputList} setInputList={setInputList} />
          <CustomButton value="AddRecipe" onClick={addRecipe}>
            Add Recipe
          </CustomButton>
        </div>

        <div className="center ph1 tc w-50-ns w-90"></div>
      </div>
    </div>
  );
}

export default NewRecipe;
