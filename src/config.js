
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getDatabase } from "firebase/database"


const firebaseConfig = {
  apiKey: "AIzaSyAd4mssAOtdf2iTSkH3f4g_VU60bwG60i8",
  authDomain: "cybercensor.firebaseapp.com",
  projectId: "cybercensor",
  storageBucket: "cybercensor.appspot.com",
  messagingSenderId: "669064977804",
  appId: "1:669064977804:web:5b9e3cfd7750bb623e8aa9",
  measurementId: "G-XTXGV667WE"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const db = getDatabase()
export {auth,provider,db}
