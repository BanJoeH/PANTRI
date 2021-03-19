import React from "react";

import "./custom-button.styles.scss";

const CustomButton = (props) => {
  const { onClick, isGoogleSignIn, value, children } = props;
  return (
    <button
      className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button`}
      onClick={onClick}
      value={value}
    >
      {children}
    </button>
  );
};
export default CustomButton;
