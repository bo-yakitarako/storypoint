import { initializeApp, FirebaseOptions } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyBRuHupfRuXyDKj9NGRV9vZeNUHtaTynJE',
  authDomain: 'story-point-42ee0.firebaseapp.com',
  databaseURL:
    'https://story-point-42ee0-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'story-point-42ee0',
  storageBucket: 'story-point-42ee0.appspot.com',
  messagingSenderId: '735925501142',
  appId: '1:735925501142:web:63aef08c5cdf83f6969d77',
};

export const firebase = initializeApp(firebaseConfig);
