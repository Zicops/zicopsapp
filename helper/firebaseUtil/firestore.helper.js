import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
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
    UserID: notificationData?.userId
  }).then((data) => data);
};

export const getAllNotifications = async (userId) => {
  const q = query(notificationCollectionRef, where('UserID', '==', userId));
  const dataArr = await getDocs(q).then((data) =>
    data.docs.map((item) => ({ ...item.data(), id: item.id }))
  );

  return dataArr;
};
