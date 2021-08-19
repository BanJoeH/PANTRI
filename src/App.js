import React, { useEffect, useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import MenuProvider from "react-flexible-sliding-menu";
import SlideMenu from "./components/slide-menu/slide-menu.component";
import BurgerMenuContext from "./App/context";

import ReactNotification from "react-notifications-component";
import CookieConsent from "react-cookie-consent";
import Header from "./components/header/header.component.jsx";
import Footer from "./components/footer/footer.jsx";


import "./App.scss";

const ShoppingList = lazy(() =>
  import("./pages/shopping-list/shopping-list.component.js")
);
const Recipes = lazy(() => import("./pages/recipes/recipes.component.js"));

const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx")
);
const ForgotPassword = lazy(() =>
  import("./pages/forgot-password/forgot-password.component")
);
const ContactPage = lazy(() => import("./pages/contact/contact.component"));

export default function App() {
  const [showMenu, setShowMenu] = useState(false);
  const isLoaded = useSelector((state) => state.firebase.auth.isLoaded);

  const toggleBurgerMenu = () => {
    setShowMenu(!showMenu);
  };

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

  const { isEmpty } = useSelector((state) => state.firebase.auth);

  return (
    isLoaded && (
      <BurgerMenuContext.Provider value={{ showMenu, toggleBurgerMenu }}>
        <MenuProvider MenuComponent={SlideMenu} width={"80vw"}>
          <div className="app">
            <ReactNotification />
            <Header />

            <div className="body">
              <Switch>
                <Route path="/PANTRI/recipes">
                  {isEmpty ? (
                    <Redirect to="/PANTRI/" />
                  ) : (
                    <Suspense fallback={<div>...loading</div>}>
                      <Recipes />
                    </Suspense>
                  )}
                </Route>

                <Route path="/PANTRI/shoppingList">
                  {isEmpty ? (
                    <Redirect to="/PANTRI/" />
                  ) : (
                    <Suspense fallback={<div>...loading</div>}>
                      <ShoppingList />
                    </Suspense>
                  )}
                </Route>
                <Suspense fallback={<div>...loading</div>}>
                  <Route
                    exact
                    path="/PANTRI/"
                    component={SignInAndSignUpPage}
                  />

                  <Route
                    path="/PANTRI/forgotpassword"
                    component={ForgotPassword}
                  />
                  <Route path="/PANTRI/contact" component={ContactPage} />
                </Suspense>
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
    )
  );
}
