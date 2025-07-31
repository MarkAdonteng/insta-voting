import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIRr_HPQZU9rPn59B9KkqSapVMhg2rpUs",
  authDomain: "digifar-3e9e3.firebaseapp.com",
  projectId: "digifar-3e9e3",
  storageBucket: "digifar-3e9e3.firebasestorage.app",
  messagingSenderId: "291373781867",
  appId: "1:291373781867:web:bf153e60e6f2b0c9fd322e",
  measurementId: "G-8VQDBKDD9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };