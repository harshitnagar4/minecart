// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCwO_afbyVNeOdEaUjzaaM2imNuN6q3QJ0",
  authDomain: "task-4a77d.firebaseapp.com",
  projectId: "task-4a77d",
  storageBucket: "task-4a77d.appspot.com",
  messagingSenderId: "732931975535",
  appId: "1:732931975535:web:d4a286268f51a85e5be09a",
  measurementId: "G-JSQ3WMHQNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const provider = new GoogleAuthProvider();
 export {auth,provider};
