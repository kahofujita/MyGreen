
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
// import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyDiw7ZDS3pMMG8mk3cPa7C_Tlq7ZqBgbz4",
//     authDomain: "mygreen-be569.firebaseapp.com",
//     projectId: "mygreen-be569",
//     storageBucket: "mygreen-be569.appspot.com",
//     messagingSenderId: "251959047157",
//     appId: "1:251959047157:web:b250edff8856a28a6ce6bc",
//     measurementId: "G-2X66VZR13E"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)


// // Export to other files
// export { app, db, collection, addDoc }



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDiw7ZDS3pMMG8mk3cPa7C_Tlq7ZqBgbz4",
    authDomain: "mygreen-be569.firebaseapp.com",
    projectId: "mygreen-be569",
    storageBucket: "mygreen-be569.appspot.com",
    messagingSenderId: "251959047157",
    appId: "1:251959047157:web:b250edff8856a28a6ce6bc",
    measurementId: "G-2X66VZR13E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)



// Export to other files
export { app, db, auth, collection, addDoc }