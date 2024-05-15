import { refExams, get, query, push, getAuth, signInWithEmailAndPassword, signOut } from '../services/firebase';

export function getExams() {
  return get(query(refExams)).then((snapshot) => {
    if (snapshot.exists()) {
      return(snapshot.val());
    } else {
      return [];
    }
  }).catch((error) => {
    console.error(error);
    return [];
  });
}

export function createExam() {
  push(refExams, {
    "about": "aaaaaaaaaaaaaaaaaaaaaaaaaa",
    "cantDo": [
      "c",
      "a",
      "n"
    ],
    "ludicInfos": [
      "l",
      "u",
      "d"
    ],
    "preparations": [
      "p",
      "r",
      "e"
    ],
    "title": "teste",
    "videoLink": "teste"
  });
}

export function checkIsSigned() {
  return getAuth().currentUser !== null;
}

export function logIn(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export function logOut() {
  const auth = getAuth();
  return signOut(auth).then(() => {
    return true;
  }).catch((error) => {
    console.error(error);
    return false;
  });
}

