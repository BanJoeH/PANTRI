import React from "react";

import "./custom-button.styles.scss";

const CustomButton = (props) => {
  const { onClick, value, children } = props;
  return (
    <button className="custom-button" onClick={onClick} value={value}>
      {children}
    </button>
  );
};
export default CustomButton;
