import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { actionTypes, createFirestoreInstance } from "redux-firestore";
import type { ReactReduxFirebaseProviderProps } from "react-redux-firebase";
import store from "../App/store";

const config: Parameters<typeof firebase.initializeApp>[0] = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const rrfConfig: ReactReduxFirebaseProviderProps["config"] = {
  userProfile: "users",
  useFirestoreForProfile: true,
  onAuthStateChanged: (authData, _firebase, dispatch) => {
    if (!authData) {
      dispatch({ type: actionTypes.CLEAR_DATA });
    }
  },
};

export const rrfProps: Omit<ReactReduxFirebaseProviderProps, "children"> = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // redux-firestore and react-redux-firebase expose slightly different
  // Firebase instance aliases, but this is the exact bridge API the provider
  // expects at runtime.
  createFirestoreInstance:
    createFirestoreInstance as ReactReduxFirebaseProviderProps["createFirestoreInstance"],
};

type UserProfileData = Record<string, unknown>;

export const createUserProfileDocument = async (
  userAuth: firebase.User | null,
  additionalData: UserProfileData = {},
): Promise<firebase.firestore.DocumentReference | undefined> => {
  if (!userAuth) return undefined;

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
      console.log(
        "error creating user",
        error instanceof Error ? error.message : error,
      );
    }
  }

  return userRef;
};

firebase.initializeApp(config);

type PersistenceError = {
  code?: string;
};

export const enablePersistence = (): void => {
  firebase
    .firestore()
    .enablePersistence()
    .catch((err: PersistenceError) => {
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
export const signInWithGoogle = (): Promise<firebase.auth.UserCredential> =>
  auth.signInWithPopup(googleProvider);

export default firebase;
