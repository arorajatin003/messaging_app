import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAgeGGzdIbnIrOPkrqDKt9NPlK-G1g7YOM",
  authDomain: "message-app-clone.firebaseapp.com",
  projectId: "message-app-clone",
  storageBucket: "message-app-clone.appspot.com",
  messagingSenderId: "230040162701",
  appId: "1:230040162701:web:8014a92d0221b978fcedc4",
  measurementId: "G-1F88FSVFVD"
});

const db=firebaseApp.firestore();

export default db;
