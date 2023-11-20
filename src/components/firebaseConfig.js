import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDu8ynU1gYnx9p6wG5XT8kPkfjxqPt2eDw",
    authDomain: "project-databases-3e075.firebaseapp.com",
    projectId: "project-databases-3e075",
    storageBucket: "project-databases-3e075.appspot.com",
    messagingSenderId: "866559414523",
    appId: "1:866559414523:web:2416cee2adb5a52740a05e",
};

const app = initializeApp(firebaseConfig);

export default app;
export const firebaseApp = getAuth();
export const storage = getStorage();
