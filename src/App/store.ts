import { configureStore } from "@reduxjs/toolkit";
import type { Reducer } from "redux";

import { firebaseReducer, type FirebaseReducer } from "react-redux-firebase";
import { firestoreReducer, type FirestoreReducer } from "redux-firestore";
import type { AppFirestoreSchema, AppProfile } from "../types";

// Both library reducers are generic over our profile/schema shapes, but
// configureStore would otherwise infer them as `{}`. Casting at registration
// gives `RootState` the correct shape — `state.firebase.profile.oddBits` and
// `state.firestore.data.shoppingList` become typed without any per-selector
// gymnastics.
const typedFirebaseReducer = firebaseReducer as unknown as Reducer<
  FirebaseReducer.Reducer<AppProfile>
>;

const typedFirestoreReducer = firestoreReducer as unknown as Reducer<
  FirestoreReducer.Reducer<AppFirestoreSchema>
>;

const store = configureStore({
  reducer: {
    firebase: typedFirebaseReducer,
    firestore: typedFirestoreReducer,
  },
  // The Firebase Auth user object is non-serializable (functions, Dates).
  // Disabling this check matches Redux Toolkit's recommendation for apps
  // built on react-redux-firebase.
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
