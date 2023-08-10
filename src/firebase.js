import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBPe-shFLWB6SYRf20Dg7o-rmlZeDhR8RQ",
  authDomain: "finsafesitev2.firebaseapp.com",
  projectId: "finsafesitev2",
  storageBucket: "finsafesitev2.appspot.com",
  messagingSenderId: "336621797304",
  appId: "1:336621797304:web:a5a06cc14363549597594d",
  measurementId: "G-210JYMFTR2"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = "en";
export { auth };
export const firestore = getFirestore(app);
export const storage = getStorage(app);
