import firebase from 'firebase';

const firebaseApp= firebase.initializeApp({
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyDh6zE0KiejNRksdsdsdnQC8oqklgZNpL8FdOSZ0",
    authDomain: "facebook-messenger-clone-c4c4dsdfsd.firebaseapp.com",
    projectId: "facebook-messenger-clone-c4c4dsfds",
    storageBucket: "facebook-messenger-clone-c4c4dsdf.appspot.com",
    messagingSenderId: "10630316672sdd69",
    appId: "1:1063031667269:web:bdb85246d877932211c12csffsdf",
    measurementId: "G-JZWYLP8W2K"
})

const db = firebaseApp.firestore();

export {db};
