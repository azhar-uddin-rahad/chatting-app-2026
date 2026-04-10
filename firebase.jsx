// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjMOeSVTHuQVdyVBYtxxAtUeu-Dr-vTJE",
  authDomain: "chattingapp-2026.firebaseapp.com",
  projectId: "chattingapp-2026",
  storageBucket: "chattingapp-2026.firebasestorage.app",
  messagingSenderId: "1040874382625",
  appId: "1:1040874382625:web:626cb9f218403e704f4a60",
  measurementId: "G-2QE50RWERT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig;