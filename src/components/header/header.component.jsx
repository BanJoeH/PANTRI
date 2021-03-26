import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebase.utils";
import { MenuContext } from "react-flexible-sliding-menu";
import { useWindowSize } from "../../App/app.utils";
import { Link } from "react-router-dom";
import "./header.styles.scss";

const Header = () => {
  const { isEmpty } = useSelector((state) => state.firebase.auth);
  const { toggleMenu } = useContext(MenuContext);
  const size = useWindowSize();
  const [toggleBurger, setToggleBurger] = useState(false);

  const toggleBurgerMenu = () => {
    setToggleBurger(!toggleBurger);
  };

  return (
    <header className="app-header">
      {size.width > 575 ? (
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
      ) : (
        <div className="small-screen">
          <div
            class="burger-container"
            onClick={() => {
              toggleBurgerMenu();
              toggleMenu();
            }}
          >
            <div class={toggleBurger ? "bar1 change" : "bar1"}></div>
            <div class={toggleBurger ? "bar2 change" : "bar2"}></div>
            <div class={toggleBurger ? "bar3 change" : "bar3"}></div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
