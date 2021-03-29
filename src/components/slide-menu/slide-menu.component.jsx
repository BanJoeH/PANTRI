import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebase.utils";
import { MenuContext } from "react-flexible-sliding-menu";
import BurgerMenuContext from "../../App/context";
import logo from "../../assets/P Pantri white.png";

import "./slide-menu.styles.scss";

const SlideMenu = () => {
  const { isEmpty } = useSelector((state) => state.firebase.auth);
  const history = useHistory();
  const { toggleMenu } = useContext(MenuContext);
  const burgerMenu = useContext(BurgerMenuContext);

  return (
    <header
      className="slide-in-menu"
      onClick={() => {
        toggleMenu();
        burgerMenu.toggleBurgerMenu();
      }}
    >
      <nav className="slide-in-nav">
        <div className="slide-in-nav-group">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="slide-in-nav-group">
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
        </div>
        <div className="slide-in-nav-group">
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
          <div
            className="nav-link"
            onClick={() => {
              history.push("/PANTRI/contact");
            }}
          >
            Contact Us
          </div>
        </div>
      </nav>
    </header>
  );
};

export default SlideMenu;
