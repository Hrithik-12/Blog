// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogss-1c983.firebaseapp.com",
  projectId: "blogss-1c983",
  storageBucket: "blogss-1c983.appspot.com",
  messagingSenderId: "795126380768",
  appId: "1:795126380768:web:a6fd7340c8a5037fd3f885"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
