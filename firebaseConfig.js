import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBuCt55OfsjGgKn2ZwfG6PMcIWmImLIVME",
  authDomain: "smartsaver-ace3e.firebaseapp.com",
  projectId: "smartsaver-ace3e",
  storageBucket: "smartsaver-ace3e.appspot.com",
  messagingSenderId: "986649847528",
  appId: "1:986649847528:web:2115f5848b4235c6d00b5d",
  measurementId: "G-8T2NDW2YJT"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);

export const db = getFirestore(app);
