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
let newEmail = document.getElementById('newEmail');
newEmail.value = currentEmailFirebase;

const changeInfoUser = document.querySelector('.changeInfoMyAccount')

changeInfoUser.addEventListener('submit', (e) => {
    e.preventDefault()

    const currentEmailValue = document.getElementById('currentEmail').value;
    newEmail = document.getElementById('newEmail').value;

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    signInWithEmailAndPassword(auth, currentEmailValue, currentPassword)
        .then((cred) => {
            updateEmail(auth.currentUser, newEmail)
                .then(() => {
                    console.log('Im email 1')
                    signInWithEmailAndPassword(auth, newEmail, currentPassword)
                        .then((cred) => {
                            updatePassword(auth.currentUser, newPassword)
                            console.log('Im password 2')

                        })
                })
        })

    let newAvatar = "";
    const radiosAvatar = document.querySelectorAll('.avatarRadio');
    for (let radio of radiosAvatar) {
        if (radio.checked) {
            newAvatar = radio.value;
        }
    };

    let username = "";
    const newUsername = document.getElementById('newUsername').value;
    if (currentUsername.value === newUsername || newUsername === null) {
        username = currentUsername.value
    } else {
        username = newUsername
    }


    updateDoc(docRef, {
        email: newEmail,
        username: username,
        avatar_img_name: newAvatar
    });
})

const changeEmailButton = document.getElementById('changeEmailButton');
const changeEmailField = document.querySelector('.NewEmailDiv');

changeEmailButton.addEventListener('click', () => {
    changeEmailField.classList.toggle('appear');
    changeEmailButton.innerHTML = 'Remove field';
})