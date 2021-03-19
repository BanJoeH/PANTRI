import { useEffect, useState } from "react";
import { Footer } from "./components/footer/footer.jsx";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import Home from "./pages/home/home.component.js";
import Recipes from "./pages/recipes/recipes.component.js";
import NewRecipe from "./pages/new-recipe/new-recipe.component.js";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";

import "./App.scss";
import Header from "./components/header/header.component.jsx";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubsribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      unsubsribeFromAuth();
    };
  }, []);

  // useEffect(() => {
  //   console.log("currentUser: ", currentUser);
  // }, [currentUser]);

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
