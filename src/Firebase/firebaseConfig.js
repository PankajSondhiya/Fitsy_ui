import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCn_Wr-NN6Bi9wudg7PbdC0Py9FSUbMI1E",
  authDomain: "fitsy-c0da2.firebaseapp.com",
  projectId: "fitsy-c0da2",
  storageBucket: "fitsy-c0da2.appspot.com",
  messagingSenderId: "887356088183",
  appId: "1:887356088183:web:006429f8316e0ca9e10b72",
  measurementId: "G-4LRLQSMNL5",
};

const FirebaseContext = createContext(null);
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const useFireBase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const firebaseSignup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const firebaseLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const createNewPassword = (oobcode, newPassword) => {
    return confirmPasswordReset(auth, oobcode, newPassword);
  };
  return (
    <FirebaseContext.Provider
      value={{
        firebaseSignup,
        firebaseLogin,
        resetPassword,
        createNewPassword,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
