import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import MenuProvider from "react-flexible-sliding-menu";
import SlideMenu from "./components/slide-menu/slide-menu.component";
import BurgerMenuContext from "./App/context";

import ReactNotification from "react-notifications-component";
import CookieConsent from "react-cookie-consent";
import Header from "./components/header/header.component.jsx";
import ShoppingList from "./pages/shopping-list/shopping-list.component.js";
import Recipes from "./pages/recipes/recipes.component.js";
import NewRecipe from "./pages/new-recipe/new-recipe.component.js";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";
import Footer from "./components/footer/footer.jsx";
import ForgotPassword from "./pages/forgot-password/forgot-password.component";

import "./App.scss";
import ContactPage from "./pages/contact/contact.component";

export default function App() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleBurgerMenu = () => {
    setShowMenu(!showMenu);
  };

  const { isEmpty } = useSelector((state) => state.firebase.auth);

  useEffect(() => {
    const unsubsribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot();
      }
    });
    return () => {
      unsubsribeFromAuth();
    };
  }, []);

  return (
    <BurgerMenuContext.Provider value={{ showMenu, toggleBurgerMenu }}>
      <MenuProvider MenuComponent={SlideMenu} width={"80vw"}>
        <div className="app fade-in">
          <ReactNotification />
          <Header />
          <div className="body">
            <Switch>
              <Route path="/PANTRI/recipes">
                {isEmpty ? <Redirect to="/PANTRI/" /> : <Recipes />}
              </Route>
              <Route path="/PANTRI/newrecipe">
                {isEmpty ? <Redirect to="/PANTRI/" /> : <NewRecipe />}
              </Route>
              <Route path="/PANTRI/shoppingList">
                {isEmpty ? <Redirect to="/PANTRI/" /> : <ShoppingList />}
              </Route>
              <Route exact path="/PANTRI/">
                <SignInAndSignUpPage />
              </Route>
              <Route path="/PANTRI/forgotpassword">
                <ForgotPassword />
              </Route>
              <Route path="/PANTRI/contact">
                <ContactPage />
              </Route>
            </Switch>
          </div>

          <CookieConsent
            location="bottom"
            buttonText="Gimmie dem cookies"
            style={{ padding: "5px" }}
          >
            We use cookies to store your recipes to save data usage!
          </CookieConsent>
          <Footer />
        </div>
      </MenuProvider>
    </BurgerMenuContext.Provider>
  );
}
