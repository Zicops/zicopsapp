import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD05Uj8S-YumeJUiM4xuO8YFP7rjLJbrP8',
  authDomain: 'http://zicops-one.firebaseapp.com/',
  projectId: 'zicops-one',
  storageBucket: 'http://zicops-one.appspot.com/',
  messagingSenderId: '359144709511',
  appId: '1:359144709511:web:d8d41fb236983ea45f4722'
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
