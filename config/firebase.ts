// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVYN_0tmqrjCOMons-SHfIDiTjsUZjX3s",
  authDomain: "tasker-cbe57.firebaseapp.com",
  projectId: "tasker-cbe57",
  storageBucket: "tasker-cbe57.firebasestorage.app",
  messagingSenderId: "396795309004",
  appId: "1:396795309004:web:5a7dc7e496822b2b0b4b69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
export{db}