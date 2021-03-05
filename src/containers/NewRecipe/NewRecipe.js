import { useState, useEffect } from "react";
import { store } from "react-notifications-component";
import Button from "../../elements/Button/Button.js";
import IngredientInput from "../../components/IngredientInput/IngredientInput.js";
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
              <input
                name="name"
                placeholder="Recipe Name"
                className={` ma1 ph1 pv2 input-reset ba bg-transparent br2 hover-bg-light-gray w-50-ns w-90  `}
                onChange={handleChange}
                value={newRecipe.name}
              />
              <input
                name="link"
                placeholder="Link"
                className={` ma1 ph1 pv2 input-reset ba bg-transparent br2 hover-bg-light-gray w-50-ns w-90 `}
                onChange={handleChange}
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
            <Button
              className="pv3 w-90"
              value="AddRecipe"
              inner="Add Recipe"
              button={addRecipe}
            />
          </div>
        </article>
      </FadeIn>
    </div>
  );
}

export default NewRecipe;
