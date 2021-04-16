import React from "react";

import "./custom-input.styles.scss";

const CustomInput = (props) => {
  const { handleChange, label, ...otherProps } = props;
  return (
    <div className="group">
      <input onChange={handleChange} {...otherProps} className="form-input" />
      {label ? (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default CustomInput;
