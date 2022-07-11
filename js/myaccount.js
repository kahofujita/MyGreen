import {
    db
} from "./firebase/firebase-config.js"
import {
    auth
} from "./firebase/firebase-config.js"

import {
    collection,
    getDocs,
    addDoc,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

import {
    onAuthStateChanged,
    updateEmail,
    updatePassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

const userId = sessionStorage.getItem('userID');


// MY ACCOUNT

// FILLING THE FORM WITH CURRENT INFORMATION
const docRef = doc(db, "user_info", userId);
const docSnap = await getDoc(docRef);
const user = auth.currentUser;

const currentUsername = document.getElementById('currentUsername');
const currentEmail = document.getElementById('currentEmail');

let currentUsernameFirebase = docSnap.data().username;
currentUsername.value = currentUsernameFirebase;

let currentEmailFirebase = docSnap.data().email;
currentEmail.value = currentEmailFirebase;

const changeInfoUser = document.querySelector('.changeInfoMyAccount')

changeInfoUser.addEventListener('submit', (e) => {
    e.preventDefault()

    const newEmail = document.getElementById('newEmail').value;
    // const newUsername = document.getElementById('newUsername').value;

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;



    signInWithEmailAndPassword(auth, currentEmail.value, currentPassword)
        .then((cred) => {
            // console.log('user logged in', cred.user)
            sessionStorage.setItem('userID', cred.user.uid);
        })
        .catch((err) => {
            console.log(err.message)
        })

    updateEmail(auth.currentUser, newEmail)
        .then(() => {
            console.log('email working')
        })

    signInWithEmailAndPassword(auth, currentEmail.value, currentPassword)
        .then((cred) => {
            // console.log('user logged in', cred.user)
            sessionStorage.setItem('userID', cred.user.uid);
        })
        .catch((err) => {
            console.log(err.message)
        })

    updatePassword(auth.currentUser, newPassword)
        .then(() => {
            console.log('password working')
        })


    // let newAvatar = "";
    // const radiosAvatar = document.querySelectorAll('.avatarRadio');
    // for (let radio of radiosAvatar) {
    //     if (radio.checked) {
    //         newAvatar = radio.value;
    //     }
    // };

    // updateDoc(docRef, {
    //     email: newEmail,
    //     username: newUsername,
    //     // avatar_img_name: newAvatar
    // });
})


// console.log(auth.currentUser.uid)

// onAuthStateChanged(auth, (user) => {
//     const uid = user;
//     console.log(user.email)
//     user.email = 'newemail@gmail.com';
//     console.log(user.email)
// })