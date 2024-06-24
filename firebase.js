// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvfAzY76xgiYyZTeX1DnQNqi2kiTeb9wA",
  authDomain: "smartrobotics-d92ed.firebaseapp.com",
  projectId: "smartrobotics-d92ed",
  storageBucket: "smartrobotics-d92ed.appspot.com",
  messagingSenderId: "305243833760",
  appId: "1:305243833760:web:985f75c545fb006db710c5",
  measurementId: "G-98JCEQD3F7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
