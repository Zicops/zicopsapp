import { UserStateAtom } from '@/state/atoms/users.atom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export default function PushNotificationLayout({ children }) {
  const userAboutData = useRecoilValue(UserStateAtom);

  useEffect(() => {
    if (!userAboutData?.id) return;
    setToken();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('event for the service worker', event);

        if (event?.data?.notification?.title) {
          setToastMsg({ type: 'info', message: event?.data?.notification?.title });

          setNotifications((prev) => [...prev, event?.data?.notification]);
        }
      });
    }

    async function setToken() {
      try {
        const token = await getFCMToken();
        if (token) {
          console.log('token', token);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [userAboutData?.id]);

  return <>{children}</>;
}
