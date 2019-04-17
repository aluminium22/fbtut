import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDikicMV30ss-91l8nUNi3bnHXaRv-njVA",
  authDomain: "fbtut-e40a8.firebaseapp.com",
  databaseURL: "https://fbtut-e40a8.firebaseio.com",
  projectId: "fbtut-e40a8",
  storageBucket: "fbtut-e40a8.appspot.com",
  messagingSenderId: "630336635703"
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;