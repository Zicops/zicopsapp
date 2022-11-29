import 'firebase/messaging';
import { getMessaging, getToken } from 'firebase/messaging';
import { app } from './firebaseConfig';

const firebaseCloudMessaging = {
  init: async () => {
    try {
      const messaging = getMessaging(app);
      const tokenInLocalStorage = sessionStorage.getItem('fcm_token');

      // Return the token if it is already in our local storage
      if (tokenInLocalStorage != null) {
        return tokenInLocalStorage;
      }

      const status = await Notification.requestPermission();
      if (status && status === 'granted') {
        const fcmToken = await getToken(messaging, {
          vapidKey:
            'BF_vi0uhleYWSaU0We80iGK4641JYugs-W2e4fZvub_K0r-3_YC2Fdjo1xhy3PUBb6oZ4XiZOJWcsP6bWkU0QpM'
        });

        if (fcmToken) {
          sessionStorage.setItem('fcm_token', fcmToken);
          return fcmToken;
        }
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};
export { firebaseCloudMessaging };

