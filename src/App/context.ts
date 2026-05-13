import { createContext } from "react";

type BurgerMenuContextValue = {
  showMenu: boolean;
  toggleBurgerMenu: () => void;
};

const BurgerMenuContext = createContext<BurgerMenuContextValue>({
  showMenu: false,
  toggleBurgerMenu: () => {},
});

export default BurgerMenuContext;
