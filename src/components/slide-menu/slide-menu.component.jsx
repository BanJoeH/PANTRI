import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebase.utils";

import "./slide-menu.styles.scss";

const SlideMenu = () => {
  const { isEmpty } = useSelector((state) => state.firebase.auth);
  const history = useHistory();
  return (
    <header className="slide-in-menu">
      <nav className="slide-in-nav">
        <div
          className="nav-link"
          onClick={() => {
            history.push("/PANTRI/shoppingList");
          }}
        >
          Shopping list
        </div>
        <div
          className="nav-link"
          onClick={() => {
            history.push("/PANTRI/recipes");
          }}
        >
          Recipes
        </div>
        <div
          className="nav-link"
          onClick={() => {
            history.push("/PANTRI/newrecipe");
          }}
        >
          Add a recipe
        </div>
        {isEmpty ? (
          <div
            className="nav-link"
            onClick={() => {
              history.push("/PANTRI/");
            }}
          >
            Sign In
          </div>
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
