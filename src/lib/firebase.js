// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDFsTSf7IPa1jqCuI3RMnoYLrY4Rj7QRhQ',
  authDomain: 'gadget-gallery-c55c5.firebaseapp.com',
  projectId: 'gadget-gallery-c55c5',
  storageBucket: 'gadget-gallery-c55c5.appspot.com',
  messagingSenderId: '950723790765',
  appId: '1:950723790765:web:4461be85f35affac854324',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
