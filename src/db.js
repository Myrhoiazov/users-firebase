import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

  apiKey: "AIzaSyBfXAxRJslxqj-AerizfJMYiWw8-rVucBc",
  authDomain: "users-2b39a.firebaseapp.com",
  databaseURL: "https://users-2b39a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "users-2b39a",
  storageBucket: "users-2b39a.appspot.com",
  messagingSenderId: "164438428254",
  appId: "1:164438428254:web:8f2e84b8a7579b11df82cf"

};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);
