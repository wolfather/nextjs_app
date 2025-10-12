import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDxE-pduXktKGAjmy7NRPBhdNtSA3t3Lzc",
    authDomain: "clone-twitter-8867b.firebaseapp.com",
    projectId: "clone-twitter-8867b",
    storageBucket: "clone-twitter-8867b.firebasestorage.app",
    messagingSenderId: "740735291023",
    appId: "1:740735291023:web:bd6292de1ae310b226aafa"
};

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(firebaseApp)

export { db };
