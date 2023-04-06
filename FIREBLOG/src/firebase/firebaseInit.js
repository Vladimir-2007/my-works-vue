import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
   apiKey: '',
   authDomain: '',
   projectId: '',
   storageBucket: '',
   messagingSenderId: '',
   appId: ''
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
