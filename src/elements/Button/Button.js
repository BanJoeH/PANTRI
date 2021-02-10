import React from "react";

const Button = ({ className, button, value, inner }) => {
  return (
    <button
      className={`pv2 mv1 ph3 bg-white hover-bg-near-white center tc ba b--moon-gray br2 shadow-1 ${className}`}
      onClick={button}
      value={value}
      type="button"
    >
      {inner}
    </button>
  );
};
export default Button;
