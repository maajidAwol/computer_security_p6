import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyCiJ09NYqsOqVnTP_oEiKk2KHPCAUH5lUI",
  authDomain: "computer-security-a14eb.firebaseapp.com",
  projectId: "computer-security-a14eb",
  storageBucket: "computer-security-a14eb.firebasestorage.app",
  messagingSenderId: "512558937034",
  appId: "1:512558937034:web:0d7e18453bdc9db7231533",
  measurementId: "G-BV6R16JDEX"
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator };

