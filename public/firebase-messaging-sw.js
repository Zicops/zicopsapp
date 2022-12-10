// It's a static script file, so it won't be covered by a module bundling system
// hence, it uses "importScripts" function to load the other libs
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
importScripts('./firebase-app-8.2.0.js');
importScripts('./firebase-messaging-8.2.0.js');

// Set this config in git secrets
const firebaseConfig = {
  apiKey: 'AIzaSyD05Uj8S-YumeJUiM4xuO8YFP7rjLJbrP8',
  authDomain: 'zicops-one.firebaseapp.com',
  projectId: 'zicops-one',
  storageBucket: 'zicops-one.appspot.com',
  messagingSenderId: '359144709511',
  appId: '1:359144709511:web:d8d41fb236983ea45f4722'
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
