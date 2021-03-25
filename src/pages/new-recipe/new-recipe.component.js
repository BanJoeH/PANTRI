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

  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const addNewRecipe = (event) => {
    event.preventDefault();
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
    <div className="page fade-in">
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
          />
          <IngredientInput
            inputList={inputList}
            setInputList={setInputList}
            label="Ingredient"
          />

          <CustomButton value="AddRecipe" onClick={addNewRecipe}>
            Add Recipe
          </CustomButton>
        </div>

        <div className="center ph1 tc w-50-ns w-90"></div>
      </div>
    </div>
  );
}

export default NewRecipe;
