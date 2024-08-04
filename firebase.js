import firebase from "firebase/app"
import { initializeApp } from 'firebase/app';
import { getFirestore,} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: "arch-86ad1",
  storageBucket: "arch-86ad1.appspot.com",
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
  };
  const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app)
   export const storage = getStorage(app);
   export const database = getDatabase(app);

  