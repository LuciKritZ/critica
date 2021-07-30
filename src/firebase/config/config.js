import firebase from 'firebase';

const config = {
    /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SEND_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MESUREMENT_ID
};

const fire = firebase.initializeApp(config);

export default fire;
