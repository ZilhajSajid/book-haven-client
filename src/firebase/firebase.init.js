// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO0WnSOegQodZZYHPQutAgUyLgEKMvnWs",
  authDomain: "book-haven-3ab70.firebaseapp.com",
  projectId: "book-haven-3ab70",
  storageBucket: "book-haven-3ab70.firebasestorage.app",
  messagingSenderId: "504515238179",
  appId: "1:504515238179:web:3615e268b8eddc914e5496",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
