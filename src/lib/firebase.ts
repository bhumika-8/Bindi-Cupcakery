// app/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBIoif_K0liSw2OjVUCbB_f9v9atQ13HTA",
    authDomain: "bindis-cupcakery.firebaseapp.com",
    projectId: "bindis-cupcakery",
    storageBucket: "bindis-cupcakery.firebasestorage.appspot.com",
    messagingSenderId: "282572507417",
    appId: "1:282572507417:web:d17a654c8eeaa975ec5d88",
    measurementId: "G-2QMM0G4FZ3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth, RecaptchaVerifier, signInWithPhoneNumber, signInWithEmailAndPassword };
