// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBikWPSRgS7DT5xKnWokcWRN0IDwaT66fI",
  authDomain: "rfidsms-6f745.firebaseapp.com",
  projectId: "rfidsms-6f745",
  storageBucket: "rfidsms-6f745.appspot.com",
  messagingSenderId: "720200004081",
  appId: "1:720200004081:web:48e1fbbd76d2e36a3e1450"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)