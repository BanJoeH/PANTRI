import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../Home/Home.js";
import Recipes from "../Recipes/Recipes.js";
import NewRecipe from "../NewRecipe/NewRecipe.js";
import { RecipesArray } from "../../assets/RecipesArray.js";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export default function App() {
  const [recipes, setRecipes] = useState(RecipesArray);
  const [shoppingList, setShoppingList] = useState([]);

  const addToShoppingList = (event) => {
    event.preventDefault();
    let recipesCopy = JSON.parse(JSON.stringify(recipes));
    recipesCopy.forEach((recipe) => {
      if (recipe.id === +event.target.value) {
        setShoppingList([...shoppingList, recipe]);
        store.addNotification({
          title: `${recipe.name}`,
          message: "added to Shopping List",
          type: "success",
          insert: "bottom",
          container: "top-center",
          dismiss: {
            duration: 2000,
          },
        });
      }
    });
  };

  const removeRecipeFromRecipes = (event) => {
    event.preventDefault();
    //work to do
  };

  const removeIngredientFromShoppingList = (event) => {
    event.preventDefault();
    let tempShoppingList = shoppingList.map((recipe) => {
      if (recipe.id === +event.target.name) {
        let tempIngredientList = recipe.ingredients.filter((ingredient) => {
          if (ingredient !== event.target.value) {
            return ingredient;
          }
        });
        recipe.ingredients = tempIngredientList;
        return recipe;
      } else {
        return recipe;
      }
    });
    setShoppingList(tempShoppingList);
  };

  const removeFromShoppingList = (event) => {
    event.preventDefault();
    let tempShoppingList = shoppingList.filter((recipe) => {
      if (recipe.id !== +event.target.value) {
        return recipe;
      }
    });
    setShoppingList(tempShoppingList);
  };

  return (
    <div>
      <ReactNotification />
      <Router>
        <div>
          <header className="bg-dark-gray w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
            <nav className="f6 fw6 ttu tracked tc">
              <Link className="link dim white pa2 dib mr3" to="/">
                Shopping list
              </Link>
              <Link className="link dim white pa2 dib mr3" to="/recipes">
                Recipes
              </Link>
              <Link className="link dim white pa2 dib mr3" to="/newrecipe">
                Add a recipe
              </Link>
            </nav>
          </header>
          <Switch>
            <Route path="/recipes">
              <Recipes recipes={recipes} cardButton={addToShoppingList} />
            </Route>
            <Route path="/newrecipe">
              <NewRecipe setRecipes={setRecipes} recipes={recipes} />
            </Route>
            <Route path="/">
              <Home
                recipes={shoppingList}
                cardButton={removeFromShoppingList}
                ingredientButton={removeIngredientFromShoppingList}
              />
            </Route>
          </Switch>
        </div>
      </Router>
      <div className="bg-dark-gray w-100 ph3 pv3 pv4-ns ph4-m ph5-l white">
        Footer
      </div>
    </div>
  );
}
