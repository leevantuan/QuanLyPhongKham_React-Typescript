import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const adminConfig = {
  apiKey: 'AIzaSyCMBbz-ss8s1R_8m2uhwuqN6TYHXzn_8oc',
  authDomain: 'queuing-system-bdb5e.firebaseapp.com',
  projectId: 'queuing-system-bdb5e',
  storageBucket: 'queuing-system-bdb5e.appspot.com',
  messagingSenderId: '390641042252',
  appId: '1:390641042252:web:6e3e70f55a8136396805e9',
};

export const app = initializeApp(adminConfig);
export const auth = getAuth();
export const initializeSecondApp = (config: FirebaseOptions, name: string): FirebaseApp => {
  let secondApp = initializeApp(config, name);
  return secondApp;
};

export const db = getFirestore(app);
