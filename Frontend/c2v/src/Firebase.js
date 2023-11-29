// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqDHSCgyYvy3521rq6zTTlXyE7qMrIxvU",
  authDomain: "code2video-auth-development.firebaseapp.com",
  projectId: "code2video-auth-development",
  storageBucket: "code2video-auth-development.appspot.com",
  messagingSenderId: "793667448960",
  appId: "1:793667448960:web:fa726a93c31c37a677f665",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName || "";
      const email = result.user.email || "";
      const profilePic = result.user.photoURL || "";

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};
