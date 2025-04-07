import { initializeApp ,getApp , getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBzwJzyx8cus4Co6t14atJ6dCg-4mTnNmw",
  authDomain: "prepwisejj.firebaseapp.com",
  projectId: "prepwisejj",
  storageBucket: "prepwisejj.firebasestorage.app",
  messagingSenderId: "401549460732",
  appId: "1:401549460732:web:85d4f831921cc2b8b3c379",
  measurementId: "G-6JZQENM6QZ"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
