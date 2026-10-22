import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsW0-V2NUluMQ9mIQzfnbs5ePMhZ7HGmY",
  authDomain: "taskflow-48823.firebaseapp.com",
  databaseURL: "https://taskflow-48823-default-rtdb.firebaseio.com",
  projectId: "taskflow-48823",
  storageBucket: "taskflow-48823.firebasestorage.app",
  messagingSenderId: "991208959696",
  appId: "1:991208959696:web:e979ffd4f67882f2f0b8d5",
  measurementId: "G-NVS5N63V7Q"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
