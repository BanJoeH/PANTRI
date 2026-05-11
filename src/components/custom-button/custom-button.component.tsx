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
  children?: ReactNode;
};

const CustomButton = ({
  onClick,
  isGoogleSignIn,
  value,
  children,
  recipe,
}: CustomButtonProps): JSX.Element => {
  return (
    <button
      className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button`}
      onClick={(e) => onClick?.(e, recipe)}
      value={value}
    >
      {children}
    </button>
  );
};
export default CustomButton;
