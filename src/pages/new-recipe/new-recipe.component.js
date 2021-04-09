import { useState, useEffect } from "react";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { notification } from "../../App/app.utils";
import CustomButton from "../../components/custom-button/custom-button.component.jsx";
import IngredientInput from "../../components/ingredient-input/ingredient-input.component.js";
import CustomInput from "../../components/custom-input/custom-input.component";

const ID = () => {
  return Math.random().toString(36).substr(2, 9);
};

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const addNewRecipe = (event) => {
    event.preventDefault();
    if (!newRecipe.name) {
      setError(true);
    } else {
      firestore
        .collection("users")
        .doc(uid)
        .collection("recipes")
        .add(newRecipe)
        .then((docRef) => {
          docRef.update({
            id: docRef.id,
          });
        });
      notification(newRecipe.name, "Added to Recipes", "success");
      setNewRecipe({ id: ID(), name: "", link: "", ingredients: [] });
      setInputList([{ ingredient: "", ingredientRef: null }]);
      setError(false);
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

  return (
    <>
      {!showNewRecipeCard ? (
        <CustomButton
          value="newRecipe"
          onClick={() => {
            setShowNewRecipeCard(!showNewRecipeCard);
          }}
        >
          Add a Recipe
        </CustomButton>
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
          {error ? <div className="error">Recipe name Required</div> : null}
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
            <CustomButton value="AddRecipe" onClick={addNewRecipe}>
              Add Recipe
            </CustomButton>
            <CustomButton
              value="Cancel"
              onClick={() => {
                setShowNewRecipeCard(false);
                setError(false);
              }}
            >
              Cancel
            </CustomButton>
          </div>
        </div>
      )}
    </>
  );
}

export default NewRecipe;
