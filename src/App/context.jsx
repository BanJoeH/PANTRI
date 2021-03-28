import React, { createContext } from "react";

const BurgerMenuContext = createContext({
  showMenu: false,
  toggleBurgerMenu: () => {},
});

export default BurgerMenuContext;
