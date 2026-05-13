import React, { MouseEvent, useContext } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import { MenuContext } from "react-flexible-sliding-menu";
import BurgerMenuContext from "../../App/context";
import { useAppSelector } from "../../App/hooks";
import logo from "../../assets/P Pantri white.png";

import "./slide-menu.styles.scss";

const SlideMenu = (): JSX.Element => {
  const isEmpty = useAppSelector((state) => state.firebase.auth.isEmpty);
  const history = useHistory();
  const { toggleMenu } = useContext(MenuContext);
  const burgerMenu = useContext(BurgerMenuContext);

  const handleMenuClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    toggleMenu();
    burgerMenu.toggleBurgerMenu();
  };

  const handleNavClick = (e: MouseEvent<HTMLElement>, route: string) => {
    e.preventDefault();
    history.push(route);
  };

  return (
    <header className="slide-in-menu" onClick={handleMenuClick}>
      <nav className="slide-in-nav">
        <div className="slide-in-nav-group">
          <img src={logo} alt="logo" className="logo" width="250" height="80" />
        </div>
        <div className="slide-in-nav-group">
          <div
            className="nav-link"
            onClick={(e) => handleNavClick(e, "/home/shopping-list")}
          >
            Shopping list
          </div>
          <div
            className="nav-link"
            onClick={(e) => handleNavClick(e, "/home/recipes")}
          >
            Recipes
          </div>
        </div>
        <div className="slide-in-nav-group">
          {isEmpty ? (
            <div className="nav-link" onClick={(e) => handleNavClick(e, "/")}>
              Sign In
            </div>
          ) : (
            <div className="nav-link" onClick={() => auth.signOut()}>
              Sign Out
            </div>
          )}
          <div
            className="nav-link"
            onClick={(e) => handleNavClick(e, "/contact")}
          >
            Contact Us
          </div>
        </div>
      </nav>
    </header>
  );
};

export default SlideMenu;
