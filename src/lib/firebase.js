import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqzPxoiAjjIfIJS5dCutwydkfkoD3N1fg",
  authDomain: "olde-blog.firebaseapp.com",
  projectId: "olde-blog",
  storageBucket: "olde-blog.appspot.com",
  messagingSenderId: "653935074158",
  appId: "1:653935074158:web:6be16cfc03b46e8ea4bf7f",
  measurementId: "G-64034QRKVJ",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
