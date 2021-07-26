import firebase from 'firebase';

const firebaseApp=  firebase.initializeApp({
    apiKey: "AIzaSyBy4jX8cr8L2q-GPRMpbi8jP0D0U2wbOpM",
    authDomain: "to-do-list-4680c.firebaseapp.com",
    projectId: "to-do-list-4680c",
    storageBucket: "to-do-list-4680c.appspot.com",
    messagingSenderId: "809056677808",
    appId: "1:809056677808:web:850e5ad412ddfed5f73075",
    measurementId: "G-24B5PE520C"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;