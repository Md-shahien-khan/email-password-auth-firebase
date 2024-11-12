// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



//  do not share config in public
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaLmJ1TscAdxFjvT5x6mRRZpN9HdvZBCA",
  authDomain: "email-password-auth-8c696.firebaseapp.com",
  projectId: "email-password-auth-8c696",
  storageBucket: "email-password-auth-8c696.firebasestorage.app",
  messagingSenderId: "331949520458",
  appId: "1:331949520458:web:21a2ee7d8c02a29071d8b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;