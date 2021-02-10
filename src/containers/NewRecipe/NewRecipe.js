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
      container: "top-center",
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
    <div className="center debug">
      <h2 className="tc">New Recipe</h2>
      <article className="center mw9 mw6-ns  br3 hidden ba b--black-10 mv4">
        <div className="tc cf ph2-ns mw9 ">
          <input
            name="recipeName"
            placeholder="Recipe Name"
            className={` ma1 pa1 input-reset ba bg-transparent br2 hover-bg-light-gray w-50-ns w-100 `}
            onChange={(e) => setNewRecipeName(e.target.value)}
            value={newRecipeName}
          />
          <input
            name="recipeLink"
            placeholder="Link"
            className={` ma1 pa1 input-reset ba bg-transparent br2 hover-bg-light-gray w-50-ns w-100 `}
            onChange={(e) => setNewRecipeLink(e.target.value)}
            value={newRecipeLink}
          />
          <input
            name="recipeIngredient"
            placeholder="Ingredient"
            className={` ma1 pa1 input-reset ba bg-transparent br2 hover-bg-light-gray w-50-ns w-100 `}
            onChange={(e) => setNewRecipeIngredient(e.target.value)}
            value={newRecipeIngredient}
            onKeyDown={(e) => addIngredientOnEnter(e)}
          />
          <Button
            className="w-50-ns w-100 "
            value="AddIngredient"
            inner="+"
            button={addToIngredients}
          />
        </div>
        <div className="pa3 bt b--black-10 flex">
          <form className="bn ph1 center w-80 ">
            {newRecipeIngredients.map((ingredient) => {
              return (
                <div
                  className="items-center mb1 bb b--light-silver flex justify-between"
                  key={ingredient}
                >
                  <div htmlFor={ingredient} className="lh-copy">
                    {ingredient}
                  </div>
                  <button
                    className="mr2 ba ph1  b--moon-gray gray br2  tc bg-white hover-bg-near-white pointer"
                    name={ingredient}
                    value={ingredient}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </form>
        </div>
        <Button
          className="w-60-ns w-100"
          value="AddRecipe"
          inner="Add Recipe"
          button={addRecipe}
        />
      </article>
    </div>
  );
}

export default NewRecipe;
