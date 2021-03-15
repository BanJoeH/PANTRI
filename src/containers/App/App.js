import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../home/home.component.js";
import Recipes from "../recipes/recipes.component.js";
import NewRecipe from "../new-recipe/new-recipe.component.js";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import FadeIn from "react-fade-in";
import "./App.css";

export default function App() {
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem("storedRecipes")) || []
  );
  const [shoppingList, setShoppingList] = useState(
    JSON.parse(localStorage.getItem("storedShopping")) || []
  );
  const [oddBits, setOddBits] = useState(
    JSON.parse(localStorage.getItem("storedOdd")) || [""]
  );
  const [searchField, setSearchField] = useState("");

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("storedRecipes", JSON.stringify(recipes));
    localStorage.setItem("storedShopping", JSON.stringify(shoppingList));
    localStorage.setItem("storedOdd", JSON.stringify(oddBits));
  }, [recipes, shoppingList, oddBits]);

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchField.toLowerCase());
  });

  const addToShoppingList = (event) => {
    event.preventDefault();
    let recipesCopy = JSON.parse(JSON.stringify(filteredRecipes));
    recipesCopy.forEach((recipe, i) => {
      if (recipe.id + "-" + i === event.target.value) {
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
    setSearchField("");
  };

  const sortShopping = (event) => {
    event.preventDefault();
    let ingredientList = shoppingList
      .map((recipe, i) => {
        return recipe.ingredients;
      })
      .flat()
      .sort();
    let unique = [...new Set(ingredientList)];
    let duplicates = unique.map((value) => [
      value,
      ingredientList.filter((str) => str === value).length,
    ]);
    let formatted = duplicates.map((ingredient, i) => [
      ingredient[0] + "  X" + ingredient[1],
    ]);

    let temp = {
      id: "sort",
      name: "Shopping List",
      ingredients: formatted,
      link: "",
    };
    setShoppingList([temp, ...shoppingList]);
  };

  const removeIngredientFromShoppingList = (event) => {
    event.preventDefault();
    let tempShoppingList = shoppingList.map((recipe, i) => {
      if (i === +event.target.name) {
        let tempIngredientList = recipe.ingredients.filter(
          (ingredient, j) => ingredient + j !== event.target.value
        );
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
    if (
      window.confirm("Are you sure you want to permanently delete this recipe?")
    ) {
      let id = event.target.value.split("-")[0];
      let tempRecipes = recipes.filter((recipe) => recipe.id !== id);
      setRecipes(tempRecipes);
      setSearchField("");
    }
  };

  const removeFromShoppingList = (event) => {
    event.preventDefault();
    let tempShoppingList = shoppingList.filter(
      (recipe, i) => recipe.id + "-" + i !== event.target.value
    );
    setShoppingList(tempShoppingList);
    setSearchField("");
  };

  return (
    <FadeIn transitionDuration="500">
      <div className="flex flex-column justify-between min-vh-100 bg">
        <ReactNotification />
        <Router>
          <div className="flex-grow">
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
                  recipes={filteredRecipes}
                  cardButton={addToShoppingList}
                  removeFromRecipes={removeFromRecipes}
                  onSearchChange={onSearchChange}
                  searchField={searchField}
                  setRecipes={setRecipes}
                />
              </Route>
              <Route path="/newrecipe">
                <NewRecipe setRecipes={setRecipes} recipes={recipes} />
              </Route>
              <Route path="/">
                <Home
                  sortShopping={sortShopping}
                  recipes={shoppingList}
                  cardButton={removeFromShoppingList}
                  ingredientButton={removeIngredientFromShoppingList}
                  oddBits={oddBits}
                  setOddBits={setOddBits}
                />
              </Route>
            </Switch>
          </div>
        </Router>
        <div className="bg-dark-gray h4 flex justify-center pa3 w-100 items-center tc white">
          Made by Joe
        </div>
      </div>
    </FadeIn>
  );
}
