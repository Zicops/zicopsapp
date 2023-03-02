import { ADD_NOTIFICATION_TO_FIRESTORE, notificationClient } from '@/api/NotificationClient';
import { truncateToN } from '@/helper/common.helper';
import {
  FcmTokenAtom,
  NotificationAtom,
  ReadNotificationsAtom
} from '@/state/atoms/notification.atom';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from './singleNotification.module.scss';

const SingleNotification = ({
  description,
  img,
  link,
  duration,
  status,
  style,
  route,
  title,
  isNav,
  messageId,
  routeObj = {}
}) => {
  const [readNotifications, setReadNotifications] = useRecoilState(ReadNotificationsAtom);
  const [notification, setNotifications] = useRecoilState(NotificationAtom);
  const [saveNotificationToFirebase] = useMutation(ADD_NOTIFICATION_TO_FIRESTORE, {
    client: notificationClient
  });
  const fcmToken = useRecoilValue(FcmTokenAtom);
  const { notification_info_status_unread } = styles;
  const router = useRouter();
  let firstoreData = {
    title: title || '',
    body: description,
    user_id: JSON.parse(sessionStorage.getItem('loggedUser'))?.id,
    message_id: messageId,
    is_read: true,
    link: link
  };

  let currentNotification = {
    body: description,
    duration: duration,
    fcmMessageId: messageId,
    img: img,
    isRead: true,
    link: link,
    route: route,
    title: title
  };

  return (
    <div
      className={`${styles.notification_block} ${!status ? notification_info_status_unread : ''}`}
      style={style}
      onClick={async () => {
        const res = await saveNotificationToFirebase({
          variables: firstoreData,
          context: { headers: { 'fcm-token': fcmToken } }
        });
        // alert(messageId);
        const updatedNotifications = notification?.filter((msg) => msg?.fcmMessageId !== messageId);

        setNotifications([...updatedNotifications, currentNotification]);
        // setReadNotifications((prev) => [...prev, messageId]);
        router.push(routeObj?.routeUrl, routeObj?.routeAsUrl);
        // router.push(route);
      }}>
      <div className={`${styles.notification_img}`}>
        <img src={img} alt="error" />
      </div>
      <div className={`${styles.notification_description_block}`}>
        <div className={`${styles.notification_description}`}>
          <p>{isNav ? truncateToN(description, 60) : description}</p>
        </div>
        <div className={`${styles.notification_info}`}>
          <p className={`${styles.notification_info_duration}`}>{duration}</p>
          <a
            onClick={() => {
              // setReadNotifications((prev) => [...prev, messageId]);
              const updatedNotifications = notification?.filter(
                (msg) => msg?.fcmMessageId !== messageId
              );
              setNotifications([...updatedNotifications, currentNotification]);
              router.push(routeObj?.routeUrl, routeObj?.routeAsUrl);
            }}
            className={`${styles.notification_info_link}`}>
            {routeObj?.text || ''}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleNotification;
