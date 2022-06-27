import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCiaxV70znBE3Q7hpPbQMitK1QVrNLFGiQ',
  authDomain: 'zicops-app.firebaseapp.com',
  projectId: 'zicops-app',
  storageBucket: 'zicops-app.appspot.com',
  messagingSenderId: '414174583675',
  appId: '1:414174583675:web:f326a3f335f9fbf672fbde',
  measurementId: 'G-3TBV52MMGC'
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
