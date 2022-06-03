import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CustomButton from "../../components/custom-button/custom-button.component";
import CustomInput from "../../components/custom-input/custom-input.component";
import PageContainer from "../../components/page-container/page-container";
import PageHeaderContainer from "../../components/page-header-container/page-header-container";
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

  const resetPassword = (email) => {
    auth
      .sendPasswordResetEmail(email)
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

  const handleClick = (e) => {
    e.preventDefault();
    resetPassword(userEmail);
  };

  useEffect(() => {
    if (errorMessage === "Check your inbox for password reset") {
      setTimeout(() => history.push("/"), 3000);
    }
  }, [errorMessage, history]);
  return (
    <PageContainer>
      <PageHeaderContainer title="Forgotten Password">
        <CustomInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={userEmail}
          label="email"
        />
        {error ? <div className="error">{errorMessage}</div> : null}
        <CustomButton type="button" onClick={handleClick}>
          {" "}
          Reset Password{" "}
        </CustomButton>
      </PageHeaderContainer>
    </PageContainer>
  );
};

export default ForgotPassword;
