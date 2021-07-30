import firebase from 'firebase';

const config = {
    /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "unreadablestuff",
    authDomain: "your-domain-name.firebaseapp.com",
    databaseURL: "https://your-domain-name.firebaseio.com",
    storageBucket: "your-domain-name.appspot.com",
    messagingSenderId: "123123123123"
};

const fire = firebase.initializeApp(config);

export default fire;
