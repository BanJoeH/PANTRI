import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Typed wrappers around the react-redux hooks. Prefer these over
// `useSelector`/`useDispatch` everywhere in the app — selectors get full
// autocompletion on the firebase/firestore state shape.
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
