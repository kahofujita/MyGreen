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

export async function init () {
    console.log(" initializing about.js module:" + new Date());

const userId = sessionStorage.getItem('userID');


// MY ACCOUNT

// FILLING THE FORM WITH CURRENT INFORMATION
const docRef = doc(db, "user_info", userId);
const docSnap = await getDoc(docRef);

const imgCurrentAvatar = document.getElementById('currentAvatar');
const currentUsername = document.getElementById('currentUsername');
const currentEmail = document.getElementById('currentEmail');

// Current Avatar
const currentAvatarFirebase = docSnap.data().avatar_img_name;

// Removing letters
const currentAvatar = currentAvatarFirebase.match(/(\d+)/)[0];

// Displaying img
imgCurrentAvatar.setAttribute('src', `./avatar/${currentAvatar}.png`)

// Current Username
let currentUsernameFirebase = docSnap.data().username;
currentUsername.value = currentUsernameFirebase;

// Current Email and New Email Preset for Validation
let currentEmailFirebase = docSnap.data().email;
currentEmail.value = currentEmailFirebase;
let newEmail = document.getElementById('newEmail');
newEmail.value = currentEmailFirebase;

// Changing the info of the user (avatar, username, email, password)
const changeInfoUser = document.querySelector('.changeInfoMyAccount')

changeInfoUser.addEventListener('submit', (e) => {
    e.preventDefault()

    const currentEmailValue = document.getElementById('currentEmail').value;
    newEmail = document.getElementById('newEmail').value;

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    let newAvatar = "";
    const radiosAvatar = document.querySelectorAll('.avatarRadio');
    for (let radio of radiosAvatar) {
        if (radio.checked) {
            newAvatar = radio.value;
        } else if (!radio.checked) {
            newAvatar = currentAvatarFirebase;
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

    signInWithEmailAndPassword(auth, currentEmailValue, currentPassword)
        .then((cred) => {
            updateEmail(auth.currentUser, newEmail)
                .then(() => {
                    console.log('Im email 1')
                    signInWithEmailAndPassword(auth, newEmail, currentPassword)
                        .then((cred) => {
                            console.log('Im password 2')
                            updatePassword(auth.currentUser, newPassword)
                            .then(() => {
                                window.location.reload()
                            })
                        })
                })
        })
})

const changeEmailButton = document.getElementById('changeEmailButton');
const changeEmailField = document.querySelector('.NewEmailDiv');

changeEmailButton.addEventListener('click', () => {
    changeEmailField.classList.toggle('appear');
    changeEmailButton.innerHTML = 'Remove field';
})

}
