// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASvxyQktZYEWzU7eq6c20-Sx96lwmtiJw",
  authDomain: "smartai-trip-planner.firebaseapp.com",
  projectId: "smartai-trip-planner",
  storageBucket: "smartai-trip-planner.firebasestorage.app",
  messagingSenderId: "77555244350",
  appId: "1:77555244350:web:a3a3f054828a27601ee06f",
  measurementId: "G-49DCB486KJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // ✅ Correct

// const analytics = getAnalytics(app);