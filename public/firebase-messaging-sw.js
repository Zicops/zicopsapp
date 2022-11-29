importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyD05Uj8S-YumeJUiM4xuO8YFP7rjLJbrP8',
  authDomain: 'zicops-one.firebaseapp.com',
  projectId: 'zicops-one',
  storageBucket: 'zicops-one.appspot.com',
  messagingSenderId: '359144709511',
  appId: '1:359144709511:web:d8d41fb236983ea45f4722'
});

const messaging = firebase.messaging();
// console.log(messaging)

// import { initializeApp } from 'firebase/app';
// import { getMessaging } from 'firebase/messaging/sw';

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp({
//   apiKey: 'AIzaSyD05Uj8S-YumeJUiM4xuO8YFP7rjLJbrP8',
//   authDomain: 'zicops-one.firebaseapp.com',
//   projectId: 'zicops-one',
//   storageBucket: 'zicops-one.appspot.com',
//   messagingSenderId: '359144709511',
//   appId: '1:359144709511:web:d8d41fb236983ea45f4722'
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = getMessaging(firebaseApp);
