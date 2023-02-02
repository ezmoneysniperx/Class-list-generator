import firebase from "firebase/compat/app";
import "firebase/compat/database";

let firebaseConfig = {
  apiKey: "AIzaSyAuuZc6jHlGeYQyITxoOySRhU0iEz9Vay4",
  authDomain: "ileri-web-final-projesi.firebaseapp.com",
  projectId: "ileri-web-final-projesi",
  storageBucket: "ileri-web-final-projesi.appspot.com",
  messagingSenderId: "211820855057",
  appId: "1:211820855057:web:0cc0196f17adfaf89296b0",
  databaseURL:
    "https://ileri-web-final-projesi-default-rtdb.europe-west1.firebasedatabase.app/",
};

firebase.initializeApp(firebaseConfig);

export default firebase.database();
