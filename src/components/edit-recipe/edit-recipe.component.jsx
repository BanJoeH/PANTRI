import React, { useEffect, useState } from "react";
import CustomButton from "../custom-button/custom-button.component";
import CustomInput from "../custom-input/custom-input.component";
import IngredientInput from "../ingredient-input/ingredient-input.component";

const EditRecipe = ({ editingRecipe, setEditingRecipe, updateRecipe }) => {
  const [inputList, setInputList] = useState([
    {
      ingredient: "",
      ingredientRef: null,
    },
  ]);

  useEffect(() => {
    setEditingRecipe((prevState) => ({
      ...prevState,
      ingredients: inputList
        .map((item) => {
          return item.ingredient;
        })
        .filter(Boolean),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleInputEditChange = (event) => {
    setEditingRecipe((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setEditingRecipe({
      id: "",
      name: "",
      ingredients: [],
      link: "",
    });
  };

  return !editingRecipe.id ? null : (
    <article className="card">
      <h2>Edit Recipe</h2>

      <div className="card-body">
        <CustomInput
          name="name"
          label="Recipe Name"
          handleChange={handleInputEditChange}
          value={editingRecipe.name}
          autoComplete="off"
        />
        <CustomInput
          name="link"
          label="Link"
          handleChange={handleInputEditChange}
          value={editingRecipe.link}
          autoComplete="off"
        />
        <IngredientInput inputList={inputList} setInputList={setInputList} />
      </div>
      <div className="new-recipe-button-group">
        <CustomButton value="editRecipe" onClick={updateRecipe}>
          Done
        </CustomButton>
        <CustomButton value="Cancel" onClick={handleCancelClick}>
          Cancel
        </CustomButton>
      </div>
    </article>
  );
};

export default EditRecipe;
