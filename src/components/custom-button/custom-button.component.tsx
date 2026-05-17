import React, { MouseEvent, ReactNode } from "react";

import "./custom-button.styles.scss";

type CustomButtonProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>, recipe?: unknown) => void;
  isGoogleSignIn?: boolean;
  value?: string | number;
  // Passed back as the second arg of onClick so the caller knows which row
  // the click came from. Kept as unknown — the recipe shape varies by view
  // (template vs shopping list) and we don't need it here.
  recipe?: unknown;
  className?: string;
  // Honoured properly so callers can opt out of the default form-submit
  // behaviour of <button>. Previously dropped silently, which meant e.g. the
  // "Sign in with Google" button was also submitting its parent form on
  // click (since <button> defaults to type="submit" inside a form).
  type?: "submit" | "reset" | "button";
  children?: ReactNode;
};

const CustomButton = ({
  onClick,
  isGoogleSignIn,
  value,
  children,
  recipe,
  className,
  type,
}: CustomButtonProps): JSX.Element => {
  return (
    <button
      type={type}
      className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button${
        className ? ` ${className}` : ""
      }`}
      onClick={(e) => onClick?.(e, recipe)}
      value={value}
    >
      {children}
    </button>
  );
};
export default CustomButton;
