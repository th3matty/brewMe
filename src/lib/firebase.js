//import firbase from "firebase/app"
import "firebase/firestore"


const config = {
  apiKey: "AIzaSyAho0TlS3Dg3IARX5LOdSXsxaF7SPvGUsM",
  authDomain: "brewme-767ed.firebaseapp.com",
  projectId: "brewme-767ed",
  storageBucket: "brewme-767ed.appspot.com",
  messagingSenderId: "675386971490",
  appId: "1:675386971490:web:54aa877aa81f2cfdf8483b",
  measurementId: "G-D1H790XR52",
};

const firebase = window.firebase.initializeApp(config);
const { FieldValue } = window.firebase.firestore;
console.log("firebase", firebase)
//seedDatabase(firebase);

export { firebase, FieldValue };
