import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA3xxDU641PsjrEAudXfsF0QGo74nSay98",
    authDomain: "shopalot-76d27.firebaseapp.com",
    databaseURL: "https://shopalot-76d27.firebaseio.com",
    projectId: "shopalot-76d27",
    storageBucket: "shopalot-76d27.appspot.com",
    messagingSenderId: "1057460209949",
    // appId: "1:1057460209949:web:5466c93db109b10fd6f9f4",
    // measurementId: "G-6C8QV5C5JE"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  export default fire