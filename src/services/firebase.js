import { initializeApp } from "firebase/app";
import { getDatabase, ref, query, child, get, push, set, remove } from 'firebase/database';
import { signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXfQ3GPnFzL7DhlHA5n6YxnxdjIHOTVmw",
  authDomain: "infocr-fiap.firebaseapp.com",
  databaseURL: "https://infocr-fiap-default-rtdb.firebaseio.com",
  projectId: "infocr-fiap",
  storageBucket: "infocr-fiap.appspot.com",
  messagingSenderId: "958769533969",
  appId: "1:958769533969:web:4e6abde736957cd1028db0"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const refExams = ref(database, 'exams/');

export { refExams, query, child, get, push, set, remove, getAuth, signInWithEmailAndPassword, signOut }