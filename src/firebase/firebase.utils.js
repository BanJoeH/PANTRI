import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBBougi-iecxqTOOD2iahFN-yUfG5tKEMo",
  authDomain: "pantri-128f4.firebaseapp.com",
  projectId: "pantri-128f4",
  storageBucket: "pantri-128f4.appspot.com",
  messagingSenderId: "480125689887",
  appId: "1:480125689887:web:8603482672c1217834752a",
  measurementId: "G-5RVBRNC8RQ",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

// firestore.collection('users').doc("/users/rr8yqcJ9KGyQuDpuW8Ai").collection("recipes")

// firestore.collection("/users/rr8yqcJ9KGyQuDpuW8Ai/recipes")

// firestore.collection('users').doc("/users/rr8yqcJ9KGyQuDpuW8Ai").collection("shoppingList")
