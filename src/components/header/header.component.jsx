import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";

const Header = ({ currentUser }) => {
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
        {currentUser ? (
          <div className="nav-link" onClick={() => auth.signOut()}>
            Sign Out
          </div>
        ) : (
          <Link className="nav-link" to="/signin">
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
