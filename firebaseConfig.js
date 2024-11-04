import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAP7ZATyBFL934s87r-tvZNAVpq7t2cJas',
  authDomain: 'puttperfect-e6438.firebaseapp.com',
  databaseURL: 'https://puttperfect-e6438.firebaseio.com',
  projectId: 'puttperfect-e6438',
  storageBucket: 'puttperfect-e6438.firebasestorage.app',
  messagingSenderId: '737663000705',
  appId: '1:737663000705:android:c9f64932c750feaf02ed80',
  measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
