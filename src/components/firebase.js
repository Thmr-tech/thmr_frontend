import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyABtWgMuY6FImJWIZYugIToXGUGT-SU7pw",
    authDomain: "thmr-d16b4.firebaseapp.com",
    projectId: "thmr-d16b4",
    storageBucket: "thmr-d16b4.firebasestorage.app",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
