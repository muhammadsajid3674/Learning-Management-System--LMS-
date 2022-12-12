// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwXIxTI8zBvGYFIu3hpD3HIvfjRPIz5Ss",
  authDomain: "student-registration-a0578.firebaseapp.com",
  databaseURL: "https://student-registration-a0578-default-rtdb.firebaseio.com",
  projectId: "student-registration-a0578",
  storageBucket: "student-registration-a0578.appspot.com",
  messagingSenderId: "186383186265",
  appId: "1:186383186265:web:d0c824c292a5a2c9baf448",
  measurementId: "G-3Z788T48HQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const dataBase = getFirestore(app)

export default app;
