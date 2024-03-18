import { auth } from "./firebase.js";
import {
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export { auth };
