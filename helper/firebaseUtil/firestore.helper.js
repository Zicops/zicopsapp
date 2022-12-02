import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from './firebaseConfig';

const db = getFirestore(app);
const notificationCollectionRef = collection(db, 'notification');
const tokenCollectionRef = collection(db, 'tokens');

export const addFcmToken = async (userId) => {
  addDoc(tokenCollectionRef, {
    noteTitle: noteTitle,
    noteDesc: noteDesc
  }).then(() => {
    setNoteTitle('');
    setNoteDesc('');
  });

  return dataArr;
};

export const addUserNotification = async (userId) => {
  addDoc(tokenCollectionRef, {
    noteTitle: noteTitle,
    noteDesc: noteDesc
  }).then(() => {
    setNoteTitle('');
    setNoteDesc('');
  });

  return dataArr;
};

export const updateUserNotification = async (userId) => {
  addDoc(tokenCollectionRef, {
    noteTitle: noteTitle,
    noteDesc: noteDesc
  }).then(() => {
    setNoteTitle('');
    setNoteDesc('');
  });

  return dataArr;
};

export const getAllNotifications = async (userId) => {
  const q = query(notificationCollectionRef, where('UserID', '==', userId));
  const dataArr = await getDocs(q).then((data) =>
    data.docs.map((item) => ({ ...item.data(), id: item.id }))
  );

  return dataArr;
};
