import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaU0a_yhVWI_gVWrRCEhrQuXuzifUVMu8",
  authDomain: "cryptos-159ea.firebaseapp.com",
  projectId: "cryptos-159ea",
  storageBucket: "cryptos-159ea.appspot.com",
  messagingSenderId: "184998852657",
  appId: "1:184998852657:web:29b859d65cd9a7f981fd10",
  measurementId: "G-FJ9EZQLB1T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
