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
    signOut,
    onAuthStateChanged,
    updateEmail,
    updatePassword
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

const userId = sessionStorage.getItem('userID');
console.log(userId)

if (userId === null) {
    window.location.assign("./login.html");
}

// LOGOUT PART

const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            alert('the user signed out')
            sessionStorage.removeItem('userID')
            window.location.assign("./login.html");
        })
        .catch((err) => {
            console.log(err.message)
        })
});

const docRef = doc(db, "user_info", userId);
const docSnap = await getDoc(docRef);
const user = auth.currentUser;

const usernameMyAccount = document.getElementById('usernameMyAccount');
const emailMyAccount = document.getElementById('emailMyAccount');

let usernameCurrent = docSnap.data().username;
usernameMyAccount.value = usernameCurrent;

let emailCurrent = docSnap.data().email;
emailMyAccount.value = emailCurrent;

const changeInfoUser = document.querySelector('.changeInfoMyAccount')

changeInfoUser.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const newPassword = document.getElementById('passowordMyAccount').value;
    
    updateEmail(auth.currentUser, emailMyAccount.value)
    updatePassword(user, newPassword);

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