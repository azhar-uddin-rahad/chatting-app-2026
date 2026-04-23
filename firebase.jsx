// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk5gIC0V4vWazQSTNysJY4a3ZQTdsB7_I",
  authDomain: "start-talks.firebaseapp.com",
  projectId: "start-talks",
  storageBucket: "start-talks.firebasestorage.app",
  messagingSenderId: "1043016188176",
  appId: "1:1043016188176:web:6a67ce550ddce48208e595",
  measurementId: "G-S42XRCMZZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig;