import React from "react";

const Button = ({ className, button, value, inner }) => {
  return (
    <button
      className={`pv1 mb1 ph3 w-100 pointer bg-white hover-bg-near-white center tc ba b--moon-gray br2 shadow-4 ${className}`}
      onClick={button}
      value={value}
    >
      {inner}
    </button>
  );
};
export default Button;
