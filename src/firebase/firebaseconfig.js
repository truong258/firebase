// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW1orhZmCDCSbFoEr9yWHhSrKv5ABlqEw",
  authDomain: "learn-firebase-c414e.firebaseapp.com",
  projectId: "learn-firebase-c414e",
  storageBucket: "learn-firebase-c414e.appspot.com",
  messagingSenderId: "877372808517",
  appId: "1:877372808517:web:3fff10a2185d61ec61f22c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
