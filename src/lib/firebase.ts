import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBIdnABVbDo82kHM2r4Lgp4yQhkh8HsVqg",
  authDomain: "qubo-f82fc.firebaseapp.com",
  projectId: "qubo-f82fc",
  storageBucket: "qubo-f82fc.appspot.com",
  messagingSenderId: "37855479325",
  appId: "1:37855479325:web:b49c9d231aedd5331528f4",
  measurementId: "G-EFJRDYP7Y4"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);