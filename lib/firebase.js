import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWh4jUlae061-DDPfPS7ZtL39gVfJtYys",
  authDomain: "dashboard-rohe.firebaseapp.com",
  projectId: "dashboard-rohe",
  storageBucket: "dashboard-rohe.firebasestorage.app",
  messagingSenderId: "358217598221",
  appId: "1:358217598221:web:908c1ca7aeaa594f899c44"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
