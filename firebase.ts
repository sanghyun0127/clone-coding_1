// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6LuP4j-GeQtSiJdNusyBrdJcLj4otC9o",
  authDomain: "twitter-clone-7433e.firebaseapp.com",
  projectId: "twitter-clone-7433e",
  storageBucket: "twitter-clone-7433e.appspot.com",
  messagingSenderId: "631119645425",
  appId: "1:631119645425:web:fc09c26178e2589e443750",
  measurementId: "G-X1R4F1K524",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

const analytics = getAnalytics(app);

export default app;
export { db, storage };
