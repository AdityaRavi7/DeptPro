// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Import Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK7TwHneNlio4P98rTKKGG-EoUs9-uNhA",
  authDomain: "dynamic-9f384.firebaseapp.com",
  databaseURL: "https://dynamic-9f384-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dynamic-9f384",
  storageBucket: "dynamic-9f384.appspot.com",
  messagingSenderId: "169701097124",
  appId: "1:169701097124:web:f12badf13870dff939f031",
  measurementId: "G-HS6LR9VE6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app); // Initialize Realtime Database

export default database;
