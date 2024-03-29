import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCgMqhf6qy7MXREV_gVGiMCQbwISbVaSCo",
  authDomain: "softmepi2024.firebaseapp.com",
  projectId: "softmepi2024",
  storageBucket: "softmepi2024.appspot.com",
  messagingSenderId: "1046484996117",
  appId: "1:1046484996117:web:f2693dabef998b6dd1fe1c",
  measurementId: "G-4H4H46GNP0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db, app as firebase};