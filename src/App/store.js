import { configureStore } from "@reduxjs/toolkit";

import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    firestore: firestoreReducer,
  },
});

export default store;
