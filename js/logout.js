
import {
    auth
} from "./firebase/firebase-config.js"


import {
    signOut
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