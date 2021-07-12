import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/analytics'


const firebaseConfig = {
    apiKey: "AIzaSyBS6PTo30rM1Y2DElAIqgBSWVEPWNWbp_M",
    authDomain: "react-spa-def2b.firebaseapp.com",
    databaseURL: "https://react-spa-def2b-default-rtdb.firebaseio.com",
    projectId: "react-spa-def2b",
    storageBucket: "react-spa-def2b.appspot.com",
    messagingSenderId: "319729337894",
    appId: "1:319729337894:web:50f47ac4f6929ab85a48e7",
    measurementId: "G-VKJKM24RH6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
