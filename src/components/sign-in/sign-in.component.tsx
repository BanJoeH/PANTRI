import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";

import { auth } from "../../firebase/firebase.utils";
import { Link, useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

import CustomInput from "../custom-input/custom-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { useAppSelector } from "../../App/hooks";

import "./sign-in.styles.scss";

type SignInState = {
  email: string;
  password: string;
  error: boolean;
  errorMessage: string;
};

const SignIn = (): JSX.Element => {
  const firebase = useFirebase();
  const history = useHistory();

  const uid = useAppSelector((state) => state.firebase.auth.uid);

  const [userCredentials, setUserCredentials] = useState<SignInState>({
    email: "",
    password: "",
    error: false,
    errorMessage: "",
  });

  const { email, password, error, errorMessage } = userCredentials;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setUserCredentials({
          email: "",
          password: "",
          error: false,
          errorMessage: "",
        });
      })
      .catch((err: Error) => {
        console.log(err);
        setUserCredentials({
          ...userCredentials,
          error: true,
          errorMessage: "Email or Password incorrect",
        });
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const signInWithGoogle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        history.push("/");
      });
  };

  useEffect(() => {
    if (uid) {
      history.push("/home/shopping-list");
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
      <Link type="button" to="/forgotPassword">
        Forgot Password?
      </Link>
    </div>
  );
};

export default SignIn;
