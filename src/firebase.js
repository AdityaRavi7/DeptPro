// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-OvLHOfifmhA0Rbu54kFUUWgQJWZ5S_Y",
  authDomain: "deptpro-34692.firebaseapp.com",
  projectId: "deptpro-34692",
  storageBucket: "deptpro-34692.appspot.com",
  messagingSenderId: "1037541009447",
  appId: "1:1037541009447:web:1279787d433f9c72b4c602",
  measurementId: "G-DK7NKJQSVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore(app);