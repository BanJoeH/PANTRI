import React, { useEffect, useState, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import MenuProvider from "react-flexible-sliding-menu";
import SlideMenu from "./components/slide-menu/slide-menu.component";
import BurgerMenuContext from "./App/context";

import ReactNotification from "react-notifications-component";
import CookieConsent from "react-cookie-consent";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer";

import "./App.scss";
import Home from "./pages/home/home";
import { useAppSelector } from "./App/hooks";

const SignInAndSignUpPage = lazy(
  () => import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component"),
);
const ForgotPassword = lazy(
  () => import("./pages/forgot-password/forgot-password.component"),
);
const ContactPage = lazy(() => import("./pages/contact/contact.component"));
const SortedShopping = lazy(
  () => import("./pages/sorted-shopping/sorted-shopping.component"),
);

export default function App(): JSX.Element | null {
  const [showMenu, setShowMenu] = useState(false);
  const isLoaded = useAppSelector((state) => state.firebase.auth.isLoaded);

  const toggleBurgerMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        await createUserProfileDocument(userAuth);
      }
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  const { isEmpty } = useAppSelector((state) => state.firebase.auth);

  if (!isLoaded) {
    return null;
  }

  return (
    <BurgerMenuContext.Provider value={{ showMenu, toggleBurgerMenu }}>
      <MenuProvider MenuComponent={SlideMenu} width={"80vw"}>
        <div className="app">
          <ReactNotification />
          <Header />
          <div className="body">
            <Suspense fallback={<div>...loading</div>}>
              <Switch>
                <Route exact path="/home/sorted">
                  {isEmpty ? <Redirect to="/" /> : <SortedShopping />}
                </Route>
                <Route path="/home/:tab">
                  {isEmpty ? <Redirect to="/" /> : <Home />}
                </Route>
                <Route exact path="/" component={SignInAndSignUpPage} />
                <Route path="/forgotpassword" component={ForgotPassword} />
                <Route path="/contact" component={ContactPage} />
              </Switch>
            </Suspense>
          </div>

          <CookieConsent
            location="bottom"
            buttonText="Gimmie dem cookies"
            style={{ padding: "5px" }}
          >
            We use cookies to store your recipes to save data usage
          </CookieConsent>
          <Footer />
        </div>
      </MenuProvider>
    </BurgerMenuContext.Provider>
  );
}
