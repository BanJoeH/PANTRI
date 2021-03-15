import React from "react";

const CustomInput = (props) => {
  const { handleChange, ...otherProps } = props;
  return (
    <input
      onChange={handleChange}
      {...otherProps}
      className="ma1 ph1 pv2 input-reset ba bg-transparent br2 hover-bg-light-gray w-50-ns w-90 "
    />
  );
};

export default CustomInput;
