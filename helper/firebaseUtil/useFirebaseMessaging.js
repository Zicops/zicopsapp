import 'firebase/messaging';
import firebase from 'firebase/app';
import { app, firebaseConfig } from './firebaseConfig';
import { getMessaging, getToken } from 'firebase/messaging';
// import localforage from 'localforage';

const firebaseCloudMessaging = {
  init: async () => {
    try {
      const messaging = getMessaging(app);
      const tokenInLocalStorage = sessionStorage.getItem('fcm_token');

      // Return the token if it is alredy in our local storage
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
    // if (!firebase?.apps?.length) {
    //   // Initialize the Firebase app with the credentials
    //   firebase?.initializeApp(firebaseConfig);

    //   try {
    //     const messaging = firebase?.messaging();
    //     // const tokenInLocalForage = await localforage.getItem('fcm_token');
    //     const tokenInLocalStorage = sessionStorage.getItem('fcm_token');

    //     // Return the token if it is alredy in our local storage
    //     if (tokenInLocalStorage != null) {
    //       return tokenInLocalStorage;
    //     }

    //     // Request the push notification permission from browser
    //     const status = await Notification.requestPermission();
    //     if (status && status === 'granted') {
    //       // Get new token from Firebase
    //       const fcm_token = await messaging?.getToken({
    //         vapidKey:
    //           'BF_vi0uhleYWSaU0We80iGK4641JYugs-W2e4fZvub_K0r-3_YC2Fdjo1xhy3PUBb6oZ4XiZOJWcsP6bWkU0QpM'
    //       });

    //       // Set token in our local storage
    //       if (fcm_token) {
    //         sessionStorage.setItem('fcm_token', fcm_token);
    //         return fcm_token;
    //       }
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     return null;
    //   }
    // }
  }
};
export { firebaseCloudMessaging };
