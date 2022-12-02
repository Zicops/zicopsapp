import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { firebaseConfig } from './firebaseConfig';

export const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export default async function getFCMToken() {
  try {
    // const tokenInLocalForage = await localforage.getItem('fcm_token');

    // Return the token if it is alredy in our local storage
    // if (tokenInLocalForage !== null) {
    //   return tokenInLocalForage;
    // }

    // Request the push notification permission from browser
    const status = await Notification.requestPermission();
    if (status && status === 'granted') {
      // Get new token from Firebase
      const fcm_token = await getToken(messaging, {
        vapidKey:
          'BF_vi0uhleYWSaU0We80iGK4641JYugs-W2e4fZvub_K0r-3_YC2Fdjo1xhy3PUBb6oZ4XiZOJWcsP6bWkU0QpM'
      });

      // Set token in our local storage
      //   if (fcm_token) {
      //     localforage.setItem('fcm_token', fcm_token);
      //   }
      return fcm_token;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
