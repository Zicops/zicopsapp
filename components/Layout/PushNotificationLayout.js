import { GET_ALL_NOTIFICATIONS, GET_FCM_TOKEN, notificationClient } from '@/api/NotificationClient';
import { loadQueryDataAsync } from '@/helper/api.helper';
import getFCMToken from '@/helper/firebaseUtil/firebase.helper';
import {
  FcmTokenAtom,
  getNotificationObj,
  NotificationAtom
} from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import notificationData from '../Notifications/data';

export default function PushNotificationLayout({ children }) {
  const [sendFcmToken] = useMutation(GET_FCM_TOKEN, { client: notificationClient });
  const userAboutData = useRecoilValue(UserStateAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [notification, setNotifications] = useRecoilState(NotificationAtom);
  const [fcmToken, setFcmToken] = useRecoilState(FcmTokenAtom);
  const [isListnerAdded, setIsListnerAdded] = useState(false);

  useEffect(() => {
    if (!userAboutData?.id) return;
    setToken().then((token) => {
      if (!token) return;

      loadAllNotifications(token);
    });

    if ('serviceWorker' in navigator) {
      if (isListnerAdded) return;
      setIsListnerAdded(true);

      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('event for the service worker', event);

        if (event?.data?.notification?.title) {
          setToastMsg({ type: 'info', message: event?.data?.notification?.title });

          setNotifications((prev) => {
            const allMsg = structuredClone(prev) || [];
            const isDuplicate = allMsg?.find(
              (msg) => msg?.fcmMessageId === event?.data?.fcmMessageId
            );

            if (isDuplicate) return prev;

            return [
              getNotificationObj({
                fcmMessageId: event?.data?.fcmMessageId,
                title: event?.data?.notification?.title,
                body: event?.data?.notification?.body,
                isRead: false,
                img: '/images/dnd1.jpg',
                link: '',
                route: '',
                duration: moment().fromNow()
              }),
              ...prev
            ];
          });
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
      // const allNotifications = {
      //   getAll: {
      //     messages: [
      //       {
      //         title: 'Checking',
      //         body: 'Unique message ID',
      //         created_at: 1670005303
      //       },
      //       {
      //         title: 'Hey',
      //         body: 'Its me',
      //         created_at: 1669915613
      //       },
      //       {
      //         title: 'Checking  Ncoiweoiv',
      //         body: 'Unique message ID vare',
      //         created_at: 1670005303
      //       },
      //       {
      //         title: 'Hey vaer',
      //         body: 'Its mev vaevre',
      //         created_at: 1669915613
      //       },
      //       {
      //         title: 'Checking',
      //         body: 'Unique vomearvn ',
      //         created_at: 1670005303
      //       },
      //       {
      //         title: 'Hey',
      //         body: 'Its me',
      //         created_at: 1669915613
      //       }
      //     ]
      //   }
      // };

      const messages = allNotifications?.getAll?.messages || notificationData;
      const allMsg =
        messages?.map((msg) =>
          getNotificationObj({
            title: msg?.title,
            body: msg?.body,
            // TODO: remove this random boolean val
            isRead: msg?.isRead || Boolean(Math.round(Math.random())),
            img: '/images/dnd1.jpg',
            link: '',
            route: '',
            duration: moment.unix(msg?.created_at).fromNow()
          })
        ) || [];

      console.log(allNotifications, allMsg);
      setNotifications((prev) => [...allMsg, ...prev]);
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
