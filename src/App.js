import { Footer } from "./components/footer/footer.jsx";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home/home.component.js";
import Recipes from "./pages/recipes/recipes.component.js";
import NewRecipe from "./pages/new-recipe/new-recipe.component.js";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import "./App.scss";

export default function App() {
  return (
    <div className="app fade-in">
      <ReactNotification />
      <Router>
        <header className="app-header">
          <nav className="nav">
            <Link className="nav-link" to="/">
              Shopping list
            </Link>
            <Link className="nav-link" to="/recipes">
              Recipes
            </Link>
            <Link className="nav-link" to="/newrecipe">
              Add a recipe
            </Link>
          </nav>
        </header>
        <div className="body">
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
      <Footer />
    </div>
  );
}
