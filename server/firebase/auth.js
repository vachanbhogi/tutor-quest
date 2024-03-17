import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  linkWithPopup,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (
  email,
  password
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error creating user with email and password:", error);
    throw error;
  }
};

export const doSignInWithEmailAndPassword = async (
  email,
  password
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in with email and password:", error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const doSignOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

export const doPasswordChange = async (password, newPassword) => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error("No user is currently signed in.");
    }

    // Re-authenticate user to verify the provided password
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    // If reauthentication succeeds, update the password
    await updatePassword(user, newPassword);
    console.log("Password updated successfully.");
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};


export const doSendEmailVerification = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user is currently signed in.");
    }
    await sendEmailVerification(user, {
      url: `${window.location.origin}/`,
    });
  } catch (error) {
    console.error("Error sending email verification:", error);
    throw error;
  }
};

export const doLinkWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.log("Error: User is not logged in");
      throw new Error("User not authenticated");
    }

    await linkWithPopup(currentUser, provider);
  } catch (error) {
    console.error("Error linking with Google:", error);
    throw error;
  }
};


export { auth };
