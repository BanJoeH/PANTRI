import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebase.utils.js";
import { useHistory } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CustomInput from "../custom-input/custom-input.component";

import "./sign-up.styles.scss";

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: false,
    errorMessage: "",
  });
  const {
    displayName,
    email,
    password,
    confirmPassword,
    error,
    errorMessage,
  } = userCredentials;

  const history = useHistory();
  const { uid } = useSelector((state) => state.firebase.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setUserCredentials({
        ...userCredentials,
        error: true,
        errorMessage: "Passwords don't match",
      });
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setUserCredentials({
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
          error: false,
          errorMessage: "",
        });
      })
      .catch((error) => {
        setUserCredentials({
          ...userCredentials,
          error: true,
          errorMessage: error.message,
        });
      });
  };

  useEffect(() => {
    if (uid) {
      history.push("/PANTRI/shoppingList");
    }
  }, [history, uid]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <CustomInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <CustomInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <CustomInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        {error ? <div className="error">{errorMessage}</div> : null}
        <CustomButton type="submit">Sign up</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
