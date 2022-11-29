import { firebaseCloudMessaging } from '@/helper/firebaseUtil/useFirebaseMessaging';
import { NotificationAtom } from '@/state/atoms/notification.atom';
import { getMessaging, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

function PushNotificationLayout({ children }) {
  //   const router = useRouter();
  const [notifications, setNotifications] = useRecoilState(NotificationAtom);
  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ('serviceWorker' in navigator) {
      console.log('service worker called');
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('event for the service worker', event);
        alert(event.data.firebaseMessaging.payload.notification.title);
        //   setNotifications([])
        getMessage();
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          console.log('token', token);
          // getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  // Handles the click function on the toast showing push notification
  //   const handleClickPushNotification = (url) => {
  //     router.push(url);
  //   };

  // Get the push notification message and triggers a toast to show it
  function getMessage() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // ...
    });
    // const messaging = getMessaging(app);
    // messaging.onMessage((message) => {
    //   console.log(message?.notification?.title);
    //   alert(message?.notification?.title);
    // toast(
    //   <div onClick={() => handleClickPushNotification(message?.data?.url)}>
    //     <h5>{message?.notification?.title}</h5>
    //     <h6>{message?.notification?.body}</h6>
    //   </div>,
    //   {
    //     closeOnClick: false
    //   }
    // );
    // });
  }

  return children;
}

export default PushNotificationLayout;
