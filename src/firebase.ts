import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7vduYt63hoO-HKPFXceZsWZQgXxS9YYg",
  authDomain: "shopsphere-80a19.firebaseapp.com",
  projectId: "shopsphere-80a19",
  storageBucket: "shopsphere-80a19.firebasestorage.app",
  messagingSenderId: "1061223327539",
  appId: "1:1061223327539:web:7e8abe687f958b78f40046",
  measurementId: "G-NQZWVQ2DTQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);