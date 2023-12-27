// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMeJ80FL6JUSiGZJuRR-sR7MLBDiYHPMk",
  authDomain: "student-connect-6c57b.firebaseapp.com",
  projectId: "student-connect-6c57b",
  storageBucket: "student-connect-6c57b.appspot.com",
  messagingSenderId: "860430134598",
  appId: "1:860430134598:web:3b3bc96f31ecf32f280947"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

