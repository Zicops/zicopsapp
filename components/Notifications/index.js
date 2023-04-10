import { NotificationAtom } from '@/state/atoms/notification.atom';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import AllNotifications from './AllNotifications';
import styles from './notification.module.scss';

const Notifications = ({ isNav = false }) => {
  const router = useRouter();
  const [notification, setNotifications] = useRecoilState(NotificationAtom);

  return (
    <div className={`${styles.notification_box}`}>
      <div className={`${styles.notification_header}`}>
        <p>Notifications</p>
      </div>

      {notification?.length ? (
        <AllNotifications isNav={isNav} data={notification?.slice(0, 4)} />
      ) : (
        <div className={`${styles.notificationFallbackMsg}`}>
          <strong >No new notifications</strong>
          <span>
            Please ensure that notifications are enabled in your browser settings to receive timely
            updates.
          </span>
        </div>
      )}

      <div className={`${styles.notification_footer}`}>
        <button onClick={() => router.push('/notification-center')}>
          Open Notification Center
        </button>
      </div>
    </div>
  );
};

export default Notifications;
