import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { app } from './firebaseConfig';

export const db = getFirestore(app);
const notificationCollectionRef = collection(db, 'notification');
const tokenCollectionRef = collection(db, 'tokens');

export const addUserNotification = async (notificationData) => {
  return addDoc(tokenCollectionRef, {
    Body: notificationData?.Body,
    CreatedAt: notificationData?.CreatedAt,
    IsRead: notificationData?.IsRead,
    Title: notificationData?.Title,
    UserID: notificationData?.userId,
  }).then((data) => data);
};

export const getAllNotifications = async (userId) => {
  const q = query(notificationCollectionRef, where('UserID', '==', userId));
  const dataArr = await getDocs(q).then((data) =>
    data.docs.map((item) => ({ ...item.data(), id: item.id })),
  );

  return dataArr;
};

export const readCollectionByDocId = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return {};
  }
};
// HOW TO USE
// async function fetchData() {
//   const data = await readCollectionByDocId('collectionName', docId);
//   setState(data);
// }
// fetchData();

export const readCollection = async (collectionName, whereClauses = []) => {
  // This will not create multiple queries for multiple whereClauses
  const q =
    whereClauses.length > 0
      ? query(
          collection(db, collectionName),
          ...whereClauses.map((w) => where(w.field, w.op, w.value)),
        )
      : collection(db, collectionName);

  const querySnapshot = await getDocs(q);
  const documents = [];

  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });

  return documents;
};

export const listenToCollectionWithId = (collectionName, docId, callback) => {
  const docRef = doc(db, collectionName, docId);

  const unsubscribe = onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() });
    } else {
      callback(null);
    }
  });

  return unsubscribe;
};

export const listenToCollection = (collectionName, callback, whereClauses) => {
  let collectionRef = collection(db, collectionName);

  if (whereClauses) {
    whereClauses.forEach((clause) => {
      collectionRef = query(collectionRef, where(clause.field, clause.operator, clause.value));
    });
  }

  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    const documents = [];
    snapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    callback(documents);
  });

  return unsubscribe;
};
// HOW TO USE listenToCollection

// const [data, setData] = useState([]);

// useEffect(() => {
//   // Start listening to the collection with where clause
//   const unsubscribe = listenToCollection(
//     'myCollection',
//     (documents) => setData(documents),
//     [{ field: 'name', operator: '==', value: 'John' }],
//   );

//   // Stop listening to updates when the component unmounts
//   return () => unsubscribe();
// }, []);
