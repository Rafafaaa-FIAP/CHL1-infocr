import { useEffect, useState } from 'react';
import { database, ref, onValue, get, set, off, push, getDatabase, child } from '../services/firebase';

export function getExams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const parsedExams = [];

    onValue(ref(database, 'exams/'), (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const obj = childSnapshot.val();

        obj['key'] = childSnapshot.key;

        parsedExams.push(obj);
      });

      setExams(parsedExams);
      console.log('ok')
    });

    return () => {
      off(ref(database, 'exams/'));
      console.log('off')
    }
  }, []);

  return { exams }
}

// export function getExams2() {
//   const dbRef = ref(getDatabase());
//   return get(child(dbRef, 'exams/')).then((snapshot) => {
//     if (snapshot.exists()) {
//       return(snapshot.val());
//     } else {
//       return "No data available";
//     }
//   }).catch((error) => {
//     return error;
//   });
// }

export function getExams2() {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, 'exams/')).then((snapshot) => {
    if (snapshot.exists()) {
      //console.log(snapshot.val());
      return(snapshot.val());
    } else {
      return "No data available";
    }
  }).catch((error) => {
    return error;
  });
}
