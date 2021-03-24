import React from "react";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="app-header">
      <nav className="nav">
        <Link className="nav-link" to="/PANTRI/shoppingList">
          Shopping list
        </Link>
        <Link className="nav-link" to="/PANTRI/recipes">
          Recipes
        </Link>
        <Link className="nav-link" to="/PANTRI/newrecipe">
          Add a recipe
        </Link>
      </nav>
    </header>
  );
};

export default Header;
