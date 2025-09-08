// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA5fiV68oSYspxtzeQ61aGmFNwYtefZfM",
  authDomain: "guess-svelte.firebaseapp.com",
  projectId: "guess-svelte",
  storageBucket: "guess-svelte.firebasestorage.app",
  messagingSenderId: "828613320775",
  appId: "1:828613320775:web:9bdbc83a0619cf12ee5162",
  measurementId: "G-B5NVTQNRX9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);