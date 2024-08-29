// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Import Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHydW436ORjWzXcCYB3EbSHe5ulK1UOkk",
  authDomain: "dept-proj-27db6.firebaseapp.com",
  databaseURL: "https://dept-proj-27db6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dept-proj-27db6",
  storageBucket: "dept-proj-27db6.appspot.com",
  messagingSenderId: "467143556970",
  appId: "1:467143556970:web:8cef82acf069c452d86f13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app); // Initialize Realtime Database

export default database;
