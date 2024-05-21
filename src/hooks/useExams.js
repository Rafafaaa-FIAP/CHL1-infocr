import { refExams, query, child, get, push, set, remove, getAuth, signInWithEmailAndPassword, signOut } from '../services/firebase';

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

export function addExam(examData) {
  push(refExams, examData);
}

export function updateExam(examID, examData) {
  set(child(refExams, examID), examData);
}

export function removeExam(examID) {
  remove(child(refExams, examID));
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

