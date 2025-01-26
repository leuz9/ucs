import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCdl84ksWolZpgHuwv9CcnPC4OuxSaClHo",
  authDomain: "sites-de-presentation.firebaseapp.com",
  projectId: "sites-de-presentation",
  storageBucket: "sites-de-presentation.firebasestorage.app",
  messagingSenderId: "824893188673",
  appId: "1:824893188673:web:f65b1db941a90a962134c0",
  measurementId: "G-Z9SL5R4ZBX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;