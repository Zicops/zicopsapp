import { GET_FCM_TOKEN, notificationClient } from '@/api/NotificationClient';
import getFCMToken from '@/helper/firebaseUtil/firebase.helper';
import { getAllNotifications } from '@/helper/firebaseUtil/firestore.helper';
import { NotificationAtom } from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function PushNotificationLayout({ children }) {
  const [sendFcmToken] = useMutation(GET_FCM_TOKEN, { client: notificationClient });
  const userAboutData = useRecoilValue(UserStateAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [notification, setNotifications] = useRecoilState(NotificationAtom);

  useEffect(() => {
    if (!userAboutData?.id) return;
    setToken();
    loadNotification();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('event for the service worker', event);

        if (event?.data?.notification?.title) {
          setToastMsg({ type: 'info', message: event?.data?.notification?.title });

          setNotifications((prev) => [...prev, event?.data?.notification]);
        }
      });
    }

    async function loadNotification() {
      console.log(await getAllNotifications(userAboutData?.id));
    }
    async function setToken() {
      try {
        const token = await getFCMToken();
        if (token) {
          console.log('token', token);
          // sendFcmToken({ context: { headers: { 'fcm-token': token } } });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [userAboutData?.id]);

  return <>{children}</>;
}
