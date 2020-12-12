import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDuRiNx28LHMKJ6NsxQHzc2x0RSl2RkrHU",
    authDomain: "loan-project-f2abe.firebaseapp.com",
    databaseURL: "https://loan-project-f2abe.firebaseio.com",
    projectId: "loan-project-f2abe",
    storageBucket: "loan-project-f2abe.appspot.com",
    messagingSenderId: "983381124786",
    appId: "1:983381124786:web:6dd55c9829e5e606148bab"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore()
  export const storageFb = fb.storage().ref()
  export const auth = fb.auth()
