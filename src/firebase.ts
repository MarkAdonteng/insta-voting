import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJhJhJhJhJhJhJhJhJhJhJhJhJhJhJhJh",
  authDomain: "digifar-3e9e3.firebaseapp.com",
  projectId: "digifar-3e9e3",
  storageBucket: "digifar-3e9e3.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnopqrstuvwxyz",
  measurementId: "G-ABCDEFGHIJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };