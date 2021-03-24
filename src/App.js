import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import ReactNotification from "react-notifications-component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import Header from "./components/header/header.component.jsx";
import ShoppingList from "./pages/shopping-list/shopping-list.component.js";
import Recipes from "./pages/recipes/recipes.component.js";
import NewRecipe from "./pages/new-recipe/new-recipe.component.js";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";
import Footer from "./components/footer/footer.jsx";

import "./App.scss";

export default function App() {
  const { uid } = useSelector((state) => state.firebase.auth);
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
  const history = useHistory();

  useEffect(() => {
    if (!uid) {
      history.push(/PANTRI/);
    }
  }, [history, uid]);

  return (
    <div className="app fade-in">
      <ReactNotification />
      <Router>
        <Header />
        <div className="body">
          <Switch>
            <Route path="/PANTRI/recipes">
              <Recipes />
            </Route>
            <Route path="/PANTRI/newrecipe">
              <NewRecipe />
            </Route>
            <Route path="/PANTRI/shoppingList">
              <ShoppingList />
            </Route>
            <Route exact path="/PANTRI/">
              <SignInAndSignUpPage />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}
