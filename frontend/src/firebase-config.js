// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDZ_yT90A1M4pe66uGRoMGeUvxeIuKdGqo",
  authDomain: "quizchamp-c9a1c.firebaseapp.com",
  databaseURL: "https://quizchamp-c9a1c-default-rtdb.firebaseio.com",
  projectId: "quizchamp-c9a1c",
  storageBucket: "quizchamp-c9a1c.appspot.com",
  messagingSenderId: "201894449283",
  appId: "1:201894449283:web:09093af315b438b11acbb6",
  measurementId: "G-35M5JQ1HVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export les fucntions nescessaire
export const storage = getStorage(app);
export const auth = getAuth(app);