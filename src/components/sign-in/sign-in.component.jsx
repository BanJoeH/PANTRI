import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInWithGoogle } from "../../firebase/firebase.utils";
import {
  loginUser,
  userSelector,
  clearState,
} from "../../pages/sign-in-and-sign-up/userSlice.js";
import { useHistory } from "react-router-dom";

import CustomInput from "../custom-input/custom-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-in.styles.scss";

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(loginUser(email, password));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  useEffect(() => {
    return () => {
      // dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(errorMessage);
      // dispatch(clearState());
    }
    if (isSuccess) {
      // dispatch(clearState());
      history.push("/");
    }
  }, [isError, isSuccess]);

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
        <div className="button-container">
          <CustomButton type="submit"> Sign in </CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            {" "}
            Sign in with Google{" "}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
