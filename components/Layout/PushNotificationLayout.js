import { GET_ALL_NOTIFICATIONS, GET_FCM_TOKEN, notificationClient } from '@/api/NotificationClient';
import { loadQueryDataAsync } from '@/helper/api.helper';
import getFCMToken from '@/helper/firebaseUtil/firebase.helper';
import { FcmTokenAtom, NotificationAtom } from '@/state/atoms/notification.atom';
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
  const [fcmToken, setFcmToken] = useRecoilState(FcmTokenAtom);

  useEffect(() => {
    if (!userAboutData?.id) return;
    setToken().then((token) => {
      if (!token) return;

      loadAllNotifications(token);
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('event for the service worker', event);

        if (event?.data?.notification?.title) {
          setToastMsg({ type: 'info', message: event?.data?.notification?.title });

          setNotifications((prev) => [...prev, event?.data?.notification]);
        }
      });
    }

    async function loadAllNotifications(token) {
      const allNotifications = await loadQueryDataAsync(
        GET_ALL_NOTIFICATIONS,
        { prevPageSnapShot: '', pageSize: 10 },
        { context: { headers: { 'fcm-token': token } } },
        notificationClient
      );

      const allMsg = allNotifications?.getAll?.messages || [];
      console.log(allNotifications, allMsg);
      setNotifications((prev) => [...prev, ...allMsg]);
    }

    async function setToken() {
      try {
        const token = await getFCMToken();
        if (!token) return null;

        console.log('token', token);
        setFcmToken(token);
        sendFcmToken({ context: { headers: { 'fcm-token': token } } }).catch((err) =>
          console.error(err)
        );

        return token;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }, [userAboutData?.id]);

  return <>{children}</>;
}
