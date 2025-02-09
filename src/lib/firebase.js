import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSNxj6n-OJFpm9svvsVjDIPFpTOG2ngqc",
  authDomain: "booknook-sarah-blog.firebaseapp.com",
  databaseURL: "https://booknook-sarah-blog-default-rtdb.firebaseio.com",
  projectId: "booknook-sarah-blog",
  storageBucket: "booknook-sarah-blog.appspot.com",
  messagingSenderId: "509585728856",
  appId: "1:509585728856:web:95f19b5007791b9962b12d",
  measurementId: "G-K6N2JGXE2L"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
