import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyATZ8URW4q4dg7_bDSyPSe_CwPTOjAotpM",
  authDomain: "react-insta-clone-e1ee1.firebaseapp.com",
  databaseURL: "https://react-insta-clone-e1ee1.firebaseio.com",
  projectId: "react-insta-clone-e1ee1",
  storageBucket: "react-insta-clone-e1ee1.appspot.com",
  messagingSenderId: "583236932092",
  appId: "1:583236932092:web:5427bc5e7cd0168d326279",
  measurementId: "G-KVGSD6DETX",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
