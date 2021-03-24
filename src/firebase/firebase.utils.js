import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { createFirestoreInstance } from "redux-firestore";
import store from "../App/store";
import { actionTypes } from "redux-firestore";

const config = {
  apiKey: "AIzaSyBBougi-iecxqTOOD2iahFN-yUfG5tKEMo",
  authDomain: "pantri-128f4.firebaseapp.com",
  projectId: "pantri-128f4",
  storageBucket: "pantri-128f4.appspot.com",
  messagingSenderId: "480125689887",
  appId: "1:480125689887:web:8603482672c1217834752a",
  measurementId: "G-5RVBRNC8RQ",
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  onAuthStateChanged: (authData, firebase, dispatch) => {
    if (!authData) {
      dispatch({ type: actionTypes.CLEAR_DATA });
    }
  },
};

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;

    try {
      await userRef.set({
        displayName,
        email,

        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

firebase
  .firestore()
  .enablePersistence()
  .catch((err) => {
    if (err.code === "failed-precondition") {
      console.log(err);
    } else if (err.code === "unimplemented") {
      console.log(err);
    }
  });

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
