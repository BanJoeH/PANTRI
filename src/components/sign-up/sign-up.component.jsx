import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  signupUser,
  userSelector,
  // clearState,
} from "../../pages/sign-in-and-sign-up/userSlice.js";
import { useHistory } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CustomInput from "../custom-input/custom-input.component";

import "./sign-up.styles.scss";
import {
  auth,
  createUserProfileDocument,
} from "../../firebase/firebase.utils.js";

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { displayName, email, password, confirmPassword } = userCredentials;
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      setUserCredentials({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }

    // dispatch(signupUser({ displayName, email, password }));
  };

  useEffect(() => {
    return () => {
      // dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      // dispatch(clearState());
      history.push("/");
    }
    if (isError) {
      console.log(errorMessage);
      // dispatch(clearState());
    }
  }, [isSuccess, isError]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
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
        <CustomButton type="submit">Sign up</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
