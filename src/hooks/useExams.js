import { useEffect, useState } from 'react';
import { database, ref, onValue, get, set, off, push, getDatabase, child } from '../services/firebase';
import { query, orderByChild } from 'firebase/database';

export function getExams() {
  const dbRef = ref(getDatabase(), 'exams/');
  return get(query(dbRef, orderByChild('title'))).then((snapshot) => {
    if (snapshot.exists()) {
      return(snapshot.val());
    } else {
      return [];
    }
  }).catch((error) => {
    console.log(error);
    return [];
  });
}

export function postExams() {
  console.log('teste');
  const dbRef = ref(getDatabase(), 'exams/');
  push(dbRef, {
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
