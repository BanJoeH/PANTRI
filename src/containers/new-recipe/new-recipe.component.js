import { useState, useEffect } from "react";
import { store } from "react-notifications-component";
import CustomButton from "../../components/custom-button/custom-button.component.jsx";
import IngredientInput from "../../components/ingredient-input/ingredient-input.component.js";
import CustomInput from "../../components/custom-input/custom-input.component";
import FadeIn from "react-fade-in";

const ID = () => {
  return Math.random().toString(36).substr(2, 9);
};

function NewRecipe({ setRecipes, recipes }) {
  const [inputList, setInputList] = useState([
    { ingredient: "", ingredientRef: null },
  ]);
  const [newRecipe, setNewRecipe] = useState({
    id: ID(),
    name: "",
    link: "",
    ingredients: [],
  });

  const addRecipeNotification = () => {
    store.addNotification({
      title: `${newRecipe.name} added to recipes`,
      message: "Success",
      type: "success",
      insert: "bottom",
      container: "bottom-center",
      dismiss: {
        duration: 2000,
      },
    });
  };

  const handleChange = (event) => {
    console.log(event);
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
    setRecipes([...recipes, newRecipe]);
    addRecipeNotification();
    setNewRecipe({ id: ID(), name: "", link: "", ingredients: [] });
    setInputList([{ ingredient: "", ingredientRef: null }]);
  };

  return (
    <div className="center pb6">
      <FadeIn>
        <h1 className="tc mw9 mw6-ns center pv3  bg-nearwhite shadow-4 br3">
          New Recipe
        </h1>
        <article className="center mw9 mw6-ns bg-nearwhite shadow-4 br3 hidden ba b--black-10 pa2 mv4">
          <div className="tc pa1 ph2-ns w-100 ">
            <div className="ph2">
              <CustomInput
                name="name"
                placeholder="Recipe Name"
                handleChange={handleChange}
                value={newRecipe.name}
              />
              <CustomInput
                name="link"
                placeholder="Link"
                handleChange={handleChange}
                value={newRecipe.link}
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
              value="AddRecipe"
              onClick={addRecipe}
            >
              Add Recipe
            </CustomButton>
          </div>
        </article>
      </FadeIn>
    </div>
  );
}

export default NewRecipe;
