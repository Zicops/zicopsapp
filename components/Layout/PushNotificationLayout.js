import {
  ADD_NOTIFICATION_TO_FIRESTORE,
  GET_ALL_NOTIFICATIONS,
  GET_FCM_TOKEN,
  notificationClient
} from '@/api/NotificationClient';
import { loadQueryDataAsync } from '@/helper/api.helper';
import getFCMToken from '@/helper/firebaseUtil/firebase.helper';
import {
  FcmTokenAtom,
  getNotificationObj,
  NotificationAtom
} from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function PushNotificationLayout({ children }) {
  const [sendFcmToken] = useMutation(GET_FCM_TOKEN, { client: notificationClient });
  const [saveNotificationToFirebase] = useMutation(ADD_NOTIFICATION_TO_FIRESTORE, {
    client: notificationClient
  });
  const userAboutData = useRecoilValue(UserStateAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [notification, setNotifications] = useRecoilState(NotificationAtom);
  const [fcmToken, setFcmToken] = useRecoilState(FcmTokenAtom);
  const [isListnerAdded, setIsListnerAdded] = useState(false);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

  useEffect(() => {
    if (!userAboutData?.id) return;
    let lspId = sessionStorage.getItem('lsp_id');
    if(!lspId) return;

    setToken().then((token) => {  
      if (!token) return;
      loadAllNotifications(token);
    });

    if ('serviceWorker' in navigator) {
      if (isListnerAdded) return;
      setIsListnerAdded(true);

      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('event for the service worker', event);
        // loadAllNotifications(fcmToken)

        if (event?.data?.notification?.body) {
          setToastMsg({ type: 'info', message: event?.data?.notification?.body });

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
                img: `/images/${event?.data?.notification?.title || 'details'}.png`,
                link: event?.data?.notification?.link || '',
                route: '',
                duration: moment().fromNow()
              }),
              ...prev
            ];
          });

          // save to firestore
          let firstoreData = {
            title: event?.data?.notification?.title || '',
            body: event?.data?.notification?.body,
            // user_id: userAboutData?.id,
            is_read: false,
            message_id: event?.data?.fcmMessageId
          };

          // saveNotification(firstoreData, fcmToken);
        }
      });
    }

    async function loadAllNotifications(token) {
      //context obj added
      let queryVariables = { prevPageSnapShot: '', pageSize: 10, isRead: false };
      let messages = [];
      const contextObj = { context: { headers: { 'fcm-token': token } } };
      const allNotifications = await loadQueryDataAsync(
        GET_ALL_NOTIFICATIONS,
        queryVariables,
        contextObj,
        notificationClient
      );

      const _message = allNotifications?.getAll?.messages || [];

      messages = [..._message];
      if (_message?.length < 5) {
        queryVariables.isRead = true;
        const allNotifications = await loadQueryDataAsync(
          GET_ALL_NOTIFICATIONS,
          queryVariables,
          contextObj,
          notificationClient
        );

        messages = [...messages, ...allNotifications?.getAll?.messages];
      }
      
      const allMsg =
        messages?.map((msg) =>
          getNotificationObj({
            title: msg?.title,
            body: msg?.body,
            isRead: !!msg?.is_read,
            img: `/images/${msg?.title || 'details'}.png`,
            link: msg?.link || '',
            route: '',
            fcmMessageId: msg?.message_id,
            duration: moment.unix(msg?.created_at).fromNow()
          })
        ) || [];

      console.log('All Notifications', allNotifications, allMsg);

      // Problem:  Keeps duplicating notifications on each render
      // setNotifications((prev) => [...allMsg, ...prev]);

      setNotifications((prev) => {
        const prevs = structuredClone(prev) || [];
        // Getting all previous notifications and removing the duplicates ny filtering with new notifications
        const filteredPrevs = allMsg.filter((msg) =>
          prevs.some((n) => msg.fcmMessageId === n.message_id)
        );
        // then adding new notifications with previous notifications thats filtered to not have new notifications
        return [...allMsg, ...filteredPrevs];
      });
    }

    async function saveNotification(notificationData, token) {
      const res = await saveNotificationToFirebase({
        variables: notificationData,
        context: { headers: { 'fcm-token': token } }
      });
    }

    async function setToken() {
      try {
        const token = await getFCMToken();
        if (!token) return null;
        sessionStorage.setItem('fcm-token', token);
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
  }, [userAboutData?.id,userOrgData?.lsp_id]);

  return <>{children}</>;
}
