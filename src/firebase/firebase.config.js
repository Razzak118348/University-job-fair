// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-xsd7iSddFKAT0UkSgpP8dqEWj-Z5_jg",
  authDomain: "solojobportal.firebaseapp.com",
  projectId: "solojobportal",
  storageBucket: "solojobportal.firebasestorage.app",
  messagingSenderId: "78841867226",
  appId: "1:78841867226:web:3d61166afa22043e8eeee3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;