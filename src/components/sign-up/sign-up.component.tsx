import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.utils";
import { useHistory } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CustomInput from "../custom-input/custom-input.component";
import { useAppSelector } from "../../App/hooks";

type SignUpState = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: boolean;
  errorMessage: string;
};

const SignUp = (): JSX.Element => {
  const [userCredentials, setUserCredentials] = useState<SignUpState>({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: false,
    errorMessage: "",
  });
  const { displayName, email, password, confirmPassword, error, errorMessage } =
    userCredentials;

  const history = useHistory();
  const uid = useAppSelector((state) => state.firebase.auth.uid);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      .then(() => {
        setUserCredentials({
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
          error: false,
          errorMessage: "",
        });
      })
      .catch((err: Error) => {
        setUserCredentials({
          ...userCredentials,
          error: true,
          errorMessage: err.message,
        });
      });
  };

  useEffect(() => {
    if (uid) {
      history.push("/home/shopping-list");
    }
  }, [history, uid]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
