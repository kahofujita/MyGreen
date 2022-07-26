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
let newUsername = document.getElementById('newUsername');
newUsername.value = currentUsernameFirebase;

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
        } else if (newAvatar === "") {
            newAvatar = currentAvatarFirebase;
        }
    };

    let username = "";
    if (currentUsername.value === newUsername.value || newUsername.value === null) {
        username = currentUsername.value
    } else {
        username = newUsername.value
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

const avatarShow = document.getElementById('avatar-show');
const avatarShow2 = document.getElementById('back-avatar');

const avatarForm = document.querySelector('.change-avatar-wrapper');
const infoForm = document.querySelector('.form-wrapper');

avatarShow.addEventListener('click', () => {

    if (avatarForm.classList.contains('show')) {
        avatarForm.classList.toggle('right');
        avatarForm.classList.remove('show');

        infoForm.classList.remove('right');
        infoForm.classList.toggle('show');
    } else if (avatarForm.classList.contains('right')) {

    avatarForm.classList.toggle('show');
    avatarForm.classList.remove('right');

    infoForm.classList.toggle('right');
    infoForm.classList.remove('show');
}
})

avatarShow2.addEventListener('click', () => {

    if (avatarForm.classList.contains('show')) {
        avatarForm.classList.toggle('right');
        avatarForm.classList.remove('show');

        infoForm.classList.remove('right');
        infoForm.classList.toggle('show');
    } else if (avatarForm.classList.contains('right')) {

    avatarForm.classList.toggle('show');
    avatarForm.classList.remove('right');

    infoForm.classList.toggle('right');
    infoForm.classList.remove('show');
}
})

const changeUsernameButton = document.getElementById('changeUsernameButton')
const changeEmailButton = document.getElementById('changeEmailButton')
const changePasswordButton = document.getElementById('changePasswordButton')

const newUsernameWrapper = document.getElementById('new-username-wrapper');
const newEmailWrapper = document.getElementById('new-email-wrapper');
const confPasswordLabel = document.getElementById('confirm-password-label');

changeUsernameButton.addEventListener('click', () => {

    if (newUsernameWrapper.classList.contains('new-hide')) {
        newUsernameWrapper.classList.remove('new-hide');
    } else {
        newUsernameWrapper.classList.toggle('new-hide');
}
});

changeEmailButton.addEventListener('click', () => {

    if (newEmailWrapper.classList.contains('new-hide')) {
        newEmailWrapper.classList.remove('new-hide');
    } else {
        newEmailWrapper.classList.toggle('new-hide');
}
});

changePasswordButton.addEventListener('click', () => {
    if(confPasswordLabel.innerText === "Confirm password") {
        confPasswordLabel.innerText = "New password"
    } else {
        confPasswordLabel.innerText = "Confirm password"
    }
})

}