import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBLbcJb38fYSc2f-3EfL-SHbBgesJGz_m8",
    authDomain: "react-42be0.firebaseapp.com",
    projectId: "react-42be0",
    storageBucket: "react-42be0.appspot.com",
    messagingSenderId: "93058818044",
    appId: "1:93058818044:web:06820a52647c84adbc5c79",
    measurementId: "G-B6X48MGFH5"
};



const app = !firebase.apps.length 
    ? firebase.initializeApp(firebaseConfig) 
    : firebase.app();

    const db = app.firestore();

 

    export default db;