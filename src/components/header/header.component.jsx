import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth, getUserRecipesRef } from "../../firebase/firebase.utils";
import { userSelector } from "../../pages/sign-in-and-sign-up/userSlice";

const Header = () => {
  const currentUser = useSelector(userSelector);
  return (
    <header className="app-header">
      <nav className="nav">
        <Link className="nav-link" to="/">
          Shopping list
        </Link>
        <Link className="nav-link" to="/recipes">
          Recipes
        </Link>
        <Link className="nav-link" to="/newrecipe">
          Add a recipe
        </Link>
        {currentUser.id ? (
          <div className="nav-link" onClick={() => auth.signOut()}>
            Sign Out
          </div>
        ) : (
          <Link className="nav-link" to="/signin">
            Sign In
          </Link>
        )}
        {/*
        <div onClick={() => getUserRecipesRef(currentUser.id)}>get recipes</div> */}
      </nav>
    </header>
  );
};

export default Header;
