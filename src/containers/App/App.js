import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../Home/Home.js";
import Recipes from "../Recipes/Recipes.js";
import NewRecipe from "../NewRecipe/NewRecipe.js";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export default function App() {
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem("storedRecipes")) || []
  );
  const [shoppingList, setShoppingList] = useState(
    JSON.parse(localStorage.getItem("storedShopping")) || []
  );
  const [oddBits, setOddBits] = useState(
    JSON.parse(localStorage.getItem("storedOdd")) || []
  );
  const [oddBit, setOddBit] = useState("");

  useEffect(() => {
    localStorage.setItem("storedRecipes", JSON.stringify(recipes));
    localStorage.setItem("storedShopping", JSON.stringify(shoppingList));
    localStorage.setItem("storedOdd", JSON.stringify(oddBits));
  }, [recipes, shoppingList, oddBits]);

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
          container: "bottom-center",
          dismiss: {
            duration: 2000,
          },
        });
      }
    });
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

  const removeFromRecipes = (event) => {
    event.preventDefault();
    let tempRecipes = recipes.filter((recipe) => {
      if (recipe.id !== +event.target.value) {
        return recipe;
      }
    });
    setRecipes(tempRecipes);
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

  const addToOddBits = (event) => {
    event.preventDefault();
    setOddBits([oddBit, ...oddBits]);
    setOddBit("");
  };

  const addOddBitOnEnter = (event) => {
    if (event.keyCode === 13) {
      addToOddBits(event);
    }
  };

  const removeOddBit = (event) => {
    event.preventDefault();
    let tempOddBits = oddBits.filter((item) => {
      if (item !== event.target.value) {
        return item;
      }
    });
    setOddBits(tempOddBits);
  };

  return (
    <div className="ttc relative min-h-90">
      <ReactNotification />
      <Router>
        <div className="pb-3">
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
              <Recipes
                recipes={recipes}
                cardButton={addToShoppingList}
                removeFromRecipes={removeFromRecipes}
              />
            </Route>
            <Route path="/newrecipe">
              <NewRecipe setRecipes={setRecipes} recipes={recipes} />
            </Route>
            <Route path="/">
              <Home
                recipes={shoppingList}
                cardButton={removeFromShoppingList}
                ingredientButton={removeIngredientFromShoppingList}
                addOddBitOnEnter={addOddBitOnEnter}
                addToOddBits={addToOddBits}
                removeOddBit={removeOddBit}
                oddBits={oddBits}
                oddBit={oddBit}
                setOddBit={setOddBit}
              />
            </Route>
          </Switch>
        </div>
      </Router>
      <div className="bg-dark-gray absolute bottom-0 h3 pa3 w-100 tc white">
        Made by Joe
      </div>
    </div>
  );
}
