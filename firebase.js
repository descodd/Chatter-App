// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCiVLdRmYYn2bcIX8B0MVhsqEue8GvPX2A",
  authDomain: "chatter-app-404d8.firebaseapp.com",
  projectId: "chatter-app-404d8",
  storageBucket: "chatter-app-404d8.appspot.com",
  messagingSenderId: "703250075140",
  appId: "1:703250075140:web:a3c9dd747479b24c6eef51",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { db, auth, storage };
