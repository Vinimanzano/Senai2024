// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB2i2P41r6bWEteXP8hUekygNg2NHOH4fs",
  authDomain: "diario-de-viagem-fc720.firebaseapp.com",
  projectId: "diario-de-viagem-fc720",
  storageBucket: "diario-de-viagem-fc720.appspot.com",
  messagingSenderId: "84455375762",
  appId: "1:84455375762:web:fa832b50d2db95b65e374b",
  measurementId: "G-TB1J9TJ0FM"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Auth
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
