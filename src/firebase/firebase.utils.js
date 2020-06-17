import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB6jd3SQ9EhJfGizsxPBo3F6QSAUVMI_Jc",
  authDomain: "crown-clothing-54fca.firebaseapp.com",
  databaseURL: "https://crown-clothing-54fca.firebaseio.com",
  projectId: "crown-clothing-54fca",
  storageBucket: "crown-clothing-54fca.appspot.com",
  messagingSenderId: "707770082472",
  appId: "1:707770082472:web:0403642b466f18fa0d8e9d",
  measurementId: "G-G9FQFY8K24",
};

firebase.initializeApp(config);

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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
