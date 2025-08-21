// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNtativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwWya1AWUQeQdd62329vyCljkMU5MJM5g",
  authDomain: "dine-time-deeb5.firebaseapp.com",
  projectId: "dine-time-deeb5",
  storageBucket: "dine-time-deeb5.firebasestorage.app",
  messagingSenderId: "377222120427",
  appId: "1:377222120427:web:d16f68d8615fc6ca0a4fae",
  measurementId: "G-3BG9ZE1LV3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNtativeAsyncStorage)
});