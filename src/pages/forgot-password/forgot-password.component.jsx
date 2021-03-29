import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import CustomButton from "../../components/custom-button/custom-button.component";
import CustomInput from "../../components/custom-input/custom-input.component";
import { auth } from "../../firebase/firebase.utils";

const ForgotPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    const { value } = event.target;

    setUserEmail(value);
  };

  const resetPassword = (event) => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(userEmail)
      .then(() => {
        setErrorMessage("Check your inbox for password reset");
        setError(true);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setErrorMessage("Email not found! Check your spelling");
        } else if (error.code === "auth/invalid-email") {
          setErrorMessage("Invalid email");
        } else {
          setErrorMessage(error.message);
        }
        setError(true);
      });
  };

  useEffect(() => {
    if (errorMessage === "Check your inbox for password reset") {
      setTimeout(() => history.push("/PANTRI/"), 3000);
    }
  }, [errorMessage, history]);
  return (
    <div className="page fade-in">
      <div className="sign-in">
        <h2>Forgotten Password</h2>
        <CustomInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={userEmail}
          label="email"
        />
        {error ? <div className="error">{errorMessage}</div> : null}
        <CustomButton type="button" onClick={resetPassword}>
          {" "}
          Reset Password{" "}
        </CustomButton>
      </div>
    </div>
  );
};

export default ForgotPassword;
