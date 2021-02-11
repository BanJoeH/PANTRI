import React, { useState } from "react";
import { store } from "react-notifications-component";
import Button from "../../elements/Button/Button.js";

function NewRecipe({ setRecipes, recipes }) {
  const [newRecipeName, setNewRecipeName] = useState("");
  const [newRecipeLink, setNewRecipeLink] = useState("");
  const [newRecipeIngredient, setNewRecipeIngredient] = useState("");
  const [newRecipeIngredients, setNewRecipeIngredients] = useState([]);

  const addToIngredients = (event) => {
    event.preventDefault();
    setNewRecipeIngredients([newRecipeIngredient, ...newRecipeIngredients]);
    setNewRecipeIngredient("");
  };

  const removeNewIngredient = (event) => {
    event.preventDefault();
    let tempIngredients = newRecipeIngredients.filter((ingredient, i) => {
      if (ingredient + i !== event.target.value) {
        return ingredient;
      }
    });
    setNewRecipeIngredients(tempIngredients);
  };

  const addIngredientOnEnter = (event) => {
    if (event.key === "Enter") {
      setNewRecipeIngredients([newRecipeIngredient, ...newRecipeIngredients]);
      setNewRecipeIngredient("");
    }
  };

  const addRecipeNotification = () => {
    store.addNotification({
      title: `${newRecipeName} added to recipes`,
      message: "Success",
      type: "success",
      insert: "bottom",
      container: "bottom-center",
      dismiss: {
        duration: 2000,
      },
    });
  };

  const addRecipe = (event) => {
    event.preventDefault();
    setRecipes([
      ...recipes,
      {
        id: recipes.length,
        name: newRecipeName,
        link: newRecipeLink,
        ingredients: newRecipeIngredients,
      },
    ]);
    addRecipeNotification();
    setNewRecipeName("");
    setNewRecipeLink("");
    setNewRecipeIngredient("");
    setNewRecipeIngredients([]);
  };

  return (
    <div className="center pb5">
      <h2 className="tc">New Recipe</h2>
      <article className="center mw9 mw6-ns shadow-4 br3 hidden ba b--black-10 pa2 mv4">
        <div className="tc pa1 cf ph2-ns mw9 ">
          <input
            name="recipeName"
            placeholder="Recipe Name"
            className={` ma1 pa1 input-reset ba bg-transparent br2 hover-bg-light-gray w-50-ns w-90 `}
            onChange={(e) => setNewRecipeName(e.target.value)}
            value={newRecipeName}
          />
          <input
            name="recipeLink"
            placeholder="Link"
            className={` ma1 pa1 input-reset ba bg-transparent br2 hover-bg-light-gray w-50-ns w-90 `}
            onChange={(e) => setNewRecipeLink(e.target.value)}
            value={newRecipeLink}
          />
          <input
            name="recipeIngredient"
            placeholder="Ingredient"
            className={` ma1 pa1 input-reset ba bg-transparent br2 hover-bg-light-gray w-50-ns w-90 `}
            onChange={(e) => setNewRecipeIngredient(e.target.value)}
            value={newRecipeIngredient}
            onKeyDown={(e) => addIngredientOnEnter(e)}
          />
          <Button
            className="w-50-ns w-900 "
            value="AddIngredient"
            inner="+"
            button={addToIngredients}
          />
        </div>
        <div className="pa3 bt b--black-10 flex">
          <form className="bn ph1 center w-80 ">
            {newRecipeIngredients.map((ingredient, i) => {
              return (
                <div
                  className="items-center mb1 bb b--light-silver flex justify-between"
                  key={ingredient + i}
                >
                  <div htmlFor={ingredient} className="lh-copy">
                    {ingredient}
                  </div>
                  <button
                    className="mr2 ba ph1  b--moon-gray gray br2  tc bg-white hover-bg-near-white pointer"
                    name={ingredient}
                    value={ingredient + i}
                    onClick={removeNewIngredient}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </form>
        </div>
        <div className="center w-80">
          <Button
            className=" pv2 w-90"
            value="AddRecipe"
            inner="Add Recipe"
            button={addRecipe}
          />
        </div>
      </article>
    </div>
  );
}

export default NewRecipe;
