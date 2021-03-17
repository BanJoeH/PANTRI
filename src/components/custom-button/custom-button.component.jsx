import React from "react";

const CustomButton = (props) => {
  const { className, onClick, value, children } = props;
  return (
    <button
      className={`pv1 mb1 w-100 pointer bg-white hover-bg-near-white center tc ba b--moon-gray br2 shadow-4 ${className}`}
      onClick={onClick}
      value={value}
    >
      {children}
    </button>
  );
};
export default CustomButton;
