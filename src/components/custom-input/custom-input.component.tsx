import React, { ChangeEventHandler, InputHTMLAttributes } from "react";

import "./custom-input.styles.scss";

// Callers may pass either `handleChange` (the named API, wired up explicitly
// below) or `onChange` (the native attr, picked up by the spread). Both work
// because the spread comes after, so an onChange passed in props wins over
// handleChange — preserving original JS behaviour.
type CustomInputProps = {
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const CustomInput = ({
  handleChange,
  label,
  ...otherProps
}: CustomInputProps): JSX.Element => {
  // value comes from native input attrs and can be string | number |
  // readonly string[]. We just need to know "is there anything in here" to
  // drive the shrink label, so coerce defensively.
  const value = otherProps.value;
  const hasValue =
    value != null &&
    (Array.isArray(value) ? value.length : String(value).length);
  return (
    <div className="group">
      <input onChange={handleChange} {...otherProps} className="form-input" />
      {label ? (
        <label className={`${hasValue ? "shrink" : ""} form-input-label`}>
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default CustomInput;
