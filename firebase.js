
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXxJXvrkKND6ha--bFQ4KGwvn0a1-V8ak",
  authDomain: "harmonix-827db.firebaseapp.com",
  projectId: "harmonix-827db",
  storageBucket: "harmonix-827db.firebasestorage.app",
  messagingSenderId: "771861727307",
  appId: "1:771861727307:web:9f9c1f29ad15564cf0e5ce"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth instance
export const auth = getAuth(app);