// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTC_jGDT1ZKvr36Y5l2rNQqH1A6GcfsrY",
  authDomain: "portfolio-e7d96.firebaseapp.com",
  projectId: "portfolio-e7d96",
  storageBucket: "portfolio-e7d96.appspot.com",
  messagingSenderId: "256216649191",
  appId: "1:256216649191:web:3919f8ee092489416fc142",
  measurementId: "G-SGDBTY54ET",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta Firestore y Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
