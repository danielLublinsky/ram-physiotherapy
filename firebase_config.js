// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYI4ZSwKTfk4L0uB1Izb9hgJ1ohndsbP4",
  authDomain: "ramphysiotherapy-32d22.firebaseapp.com",
  projectId: "ramphysiotherapy-32d22",
  storageBucket: "ramphysiotherapy-32d22.appspot.com",
  messagingSenderId: "819892260289",
  appId: "1:819892260289:web:d2043d75c4c1421e6ab340",
  measurementId: "G-XW0L7ZJVSV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
