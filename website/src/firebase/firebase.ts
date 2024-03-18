import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDn-qjEBlsE-zPMwzH10DMy7_KeNH6J5wM",
  authDomain: "tutor-quest-24.firebaseapp.com",
  projectId: "tutor-quest-24",
  storageBucket: "tutor-quest-24.appspot.com",
  messagingSenderId: "580325916765",
  appId: "1:580325916765:web:c0ce3cb3ccfd35c7ca4db4",
  measurementId: "G-W4TKJ60E1J",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
