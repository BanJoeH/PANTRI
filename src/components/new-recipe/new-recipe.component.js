import { useState, useEffect } from "react";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { notification } from "../../App/app.utils";
import { addNewRecipe } from "./new-recipe.utils";
import CustomButton from "../custom-button/custom-button.component.jsx";
import IngredientInput from "../ingredient-input/ingredient-input.component.js";
import CustomInput from "../custom-input/custom-input.component";

// const ID = () => {
//   return Math.random().toString(36).substr(2, 9);
// };
function NewRecipe() {
  const [inputList, setInputList] = useState([
    { ingredient: "", ingredientRef: null },
  ]);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    link: "",
    ingredients: [],
  });
  const [error, setError] = useState(false);
  const [showNewRecipeCard, setShowNewRecipeCard] = useState(false);

  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);
  const recipesCollectionRef = firestore
    .collection("users")
    .doc(uid)
    .collection("recipes");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleAddNewRecipeClick = (e) => {
    e.preventDefault();
    if (!newRecipe.name) {
      setError(true);
    } else {
      addNewRecipe(newRecipe, recipesCollectionRef);
      setError(false);
      notification(newRecipe.name, "Added to Recipes", "success");
      setNewRecipe({ name: "", link: "", ingredients: [] });
      setInputList([{ ingredient: "", ingredientRef: null }]);
      setShowNewRecipeCard(!showNewRecipeCard);
    }
  };

  useEffect(() => {
    let ingredients = inputList
      .map((input, i) => {
        return input.ingredient.toLowerCase();
      })
      .filter(Boolean);
    setNewRecipe({ ...newRecipe, ingredients: ingredients });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputList]);

  const handleShowNewRecipeClick = (e) => {
    e.preventDefault();
    setShowNewRecipeCard(!showNewRecipeCard);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setShowNewRecipeCard(false);
    setError(false);
  };

  return !showNewRecipeCard ? (
    <div style={{ margin: "0 5%" }}>
      <CustomButton value="newRecipe" onClick={handleShowNewRecipeClick}>
        Add a Recipe
      </CustomButton>
    </div>
  ) : (
    <div className="card">
      <h3 className="new-recipe-title">Add a new recipe</h3>
      <CustomInput
        name="name"
        label="Recipe Name"
        handleChange={handleChange}
        value={newRecipe.name}
        required
      />
      {error ? <div className="error">Recipe name required</div> : null}
      <CustomInput
        name="link"
        label="Link"
        handleChange={handleChange}
        value={newRecipe.link}
      />
      <IngredientInput
        inputList={inputList}
        setInputList={setInputList}
        label="Ingredient"
      />
      <div className="new-recipe-button-group">
        <CustomButton value="AddRecipe" onClick={handleAddNewRecipeClick}>
          Add Recipe
        </CustomButton>
        <CustomButton value="Cancel" onClick={handleCancelClick}>
          Cancel
        </CustomButton>
      </div>
    </div>
  );
}

export default NewRecipe;
