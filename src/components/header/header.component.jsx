import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebase.utils";
import { MenuContext } from "react-flexible-sliding-menu";
import { useWindowSize } from "../../App/app.utils";
import { Link } from "react-router-dom";
import BurgerMenuContext from "../../App/context";
import "./header.styles.scss";
import logo from "../../assets/P Pantri white.png";

const Header = () => {
  const { isEmpty } = useSelector((state) => state.firebase.auth);
  const size = useWindowSize();
  const { toggleMenu } = useContext(MenuContext);
  const burgerMenu = useContext(BurgerMenuContext);

  return (
    <header className="app-header">
      {size.width > 575 ? (
        <nav className="nav">
          <img src={logo} alt="logo" className="logo" width="250" height="80" />

          <div className="nav-group">
            <Link className="nav-link" to="/PANTRI/shoppingList">
              Shopping list
            </Link>
            <Link className="nav-link" to="/PANTRI/recipes">
              Recipes
            </Link>
            <Link className="nav-link" to="/PANTRI/newrecipe">
              Add a recipe
            </Link>
            <Link className="nav-link" to="/PANTRI/contact">
              Contact
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
          </div>
        </nav>
      ) : (
        <div className="small-screen">
          <img src={logo} alt="logo" className="logo" width="250" height="80" />
          <div
            className="burger-container"
            onClick={() => {
              burgerMenu.toggleBurgerMenu();
              toggleMenu();
            }}
          >
            <div className={burgerMenu.showMenu ? "bar1 change" : "bar1"}></div>
            <div className={burgerMenu.showMenu ? "bar2 change" : "bar2"}></div>
            <div className={burgerMenu.showMenu ? "bar3 change" : "bar3"}></div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
