import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { createFirestoreInstance } from "redux-firestore";
import store from "../App/store";
import { actionTypes } from "redux-firestore";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
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

export const enablePersistence = () => {
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
};
enablePersistence();

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
