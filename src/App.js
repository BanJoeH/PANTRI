import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home/home.component.js";
import Recipes from "./pages/recipes/recipes.component.js";
import NewRecipe from "./pages/new-recipe/new-recipe.component.js";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import FadeIn from "react-fade-in";
import "./App.css";

export default function App() {
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
                <Recipes />
              </Route>
              <Route path="/newrecipe">
                <NewRecipe />
              </Route>
              <Route path="/">
                <Home />
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
