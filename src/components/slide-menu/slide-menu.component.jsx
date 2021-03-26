import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebase.utils";

import "./slide-menu.styles.scss";

const SlideMenu = () => {
  const { isEmpty } = useSelector((state) => state.firebase.auth);

  return (
    <header className="slide-in-menu">
      <nav className="slide-in-nav">
        <Link className="nav-link" to="/PANTRI/shoppingList">
          Shopping list
        </Link>
        <Link className="nav-link" to="/PANTRI/recipes">
          Recipes
        </Link>
        <Link className="nav-link" to="/PANTRI/newrecipe">
          Add a recipe
        </Link>
        {isEmpty ? (
          <Link className="nav-link" to="/PANTRI/">
            Sign In
          </Link>
        ) : (
          <div className="nav-link" onClick={() => auth.signOut()}>
            Sign Out
          </div>
        )}
      </nav>
    </header>
  );
};

export default SlideMenu;
