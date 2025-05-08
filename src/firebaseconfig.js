import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADecG9L_zsIw45KUxFKz3gW52HPTb6OjQ",
  authDomain: "expence-tracker-48ac9.firebaseapp.com",
  projectId: "expence-tracker-48ac9",
  storageBucket: "expence-tracker-48ac9.firebasestorage.app",
  messagingSenderId: "350389800721",
  appId: "1:350389800721:web:fcaed209fa933c354906b0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
