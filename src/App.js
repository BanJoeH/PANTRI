import { useEffect, useState } from "react";
import { Footer } from "./components/footer/footer.jsx";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import {
  auth,
  createUserProfileDocument,
  getUserRecipesRef,
} from "./firebase/firebase.utils";

import Home from "./pages/home/home.component.js";
import Recipes from "./pages/recipes/recipes.component.js";
import NewRecipe from "./pages/new-recipe/new-recipe.component.js";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";

import "./App.scss";
import Header from "./components/header/header.component.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUser,
  setCurrentUser,
  userSelector,
} from "./pages/sign-in-and-sign-up/userSlice.js";

export default function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(userSelector);

  useEffect(() => {
    const unsubsribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          const { displayName, email, createdAt } = snapShot.data();
          dispatch(
            setCurrentUser({
              id: snapShot.id,
              displayName,
              email,
              createdAt: createdAt.toDate().toString(),
            })
          );
        });
      } else {
        dispatch(clearUser());
      }
    });
    return () => {
      unsubsribeFromAuth();
    };
  }, []);

  return (
    <div className="app fade-in">
      <ReactNotification />
      <Router>
        <Header currentUser={currentUser} />
        <div className="body">
          <Switch>
            <Route path="/recipes">
              <Recipes />
            </Route>
            <Route path="/newrecipe">
              <NewRecipe />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signIn">
              <SignInAndSignUpPage />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}
