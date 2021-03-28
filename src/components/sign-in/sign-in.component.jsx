import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebase.utils";
import { Link, useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

import CustomInput from "../custom-input/custom-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-in.styles.scss";

const SignIn = () => {
  const firebase = useFirebase();
  const history = useHistory();

  const { uid } = useSelector((state) => state.firebase.auth);

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    error: false,
    errorMessage: "",
  });

  const { email, password, error, errorMessage } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setUserCredentials({ email: "", password: "", error: false });
      })
      .catch((error) => {
        console.log(error);
        setUserCredentials({
          ...userCredentials,
          error: true,
          errorMessage: "Email or Password incorrect",
        });
      });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const signInWithGoogle = (event) => {
    event.preventDefault();
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        history.push("/PANTRI/");
      });
  };

  useEffect(() => {
    if (uid) {
      history.push("/PANTRI/shoppingList");
    } else {
      setUserCredentials((prevState) => ({ ...prevState, error: true }));
    }
  }, [uid, history]);

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form className="sign-in-form" onSubmit={handleSubmit}>
        <CustomInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="email"
        />
        <CustomInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
        />
        {error ? <div className="error">{errorMessage}</div> : null}
        <div className="button-container">
          <CustomButton type="submit"> Sign in </CustomButton>
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
            {" "}
            Sign in with Google{" "}
          </CustomButton>
        </div>
      </form>
      <Link type="button" to="/PANTRI/forgotPassword">
        Forgot Password?
      </Link>
    </div>
  );
};

export default SignIn;
