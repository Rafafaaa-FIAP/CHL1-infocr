import { initializeApp } from "firebase/app";
import { getDatabase, ref, query, child, get, push, set, remove } from 'firebase/database';
import { signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnGn-htAvx9hG3O_1Ah4EEewJ8S6hL4OI",
  authDomain: "infocr-fiap-1espr.firebaseapp.com",
  databaseURL: "https://infocr-fiap-1espr-default-rtdb.firebaseio.com",
  projectId: "infocr-fiap-1espr",
  storageBucket: "infocr-fiap-1espr.appspot.com",
  messagingSenderId: "303312140900",
  appId: "1:303312140900:web:f553c143b9f3072c59fd71"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const refExams = ref(database, 'exams/');

export { refExams, query, child, get, push, set, remove, getAuth, signInWithEmailAndPassword, signOut }