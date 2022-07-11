import { db, auth } from './firebase/firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

// Declaring a variable to store the user Id
let userID = "";


// Login event listener and function
const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

// variables to login
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

// Loggin the user
    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log('user logged in', cred.user)
        sessionStorage.setItem('userID', cred.user.uid);
    })
    .catch((err) => {
        console.log(err.message)
    })
// Storing the data inside a variable
    // userID = auth.currentUser.uid
    // console.log(userID)
    
    // // ここでsession storageに保存してるよ
    // sessionStorage.setItem('userID', userID);


// TO COMPARE AND PUSH WHAT USER IS LOGGED IN JUST USE THE VARIABLE userID
// THAT WAY YOU CAN FIND COMPARE WITH THE PRIMARE KEY OF THE user_info TABLE
});
