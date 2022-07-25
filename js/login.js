import {db} from "./firebase/firebase-config.js"
import {auth} from "./firebase/firebase-config.js"

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        // console.log('user logged in', cred.user)
        sessionStorage.setItem('userID', cred.user.uid);
        window.location.assign("./index.html");
    })
    .catch((err) => {
        console.log(err.message)
    })
});

console.log('login')

