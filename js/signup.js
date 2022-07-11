import {
    db
} from "./firebase/firebase-config.js";
import {
    auth
} from "./firebase/firebase-config.js";

import {
    collection,
    getDocs,
    doc,
    setDoc,
    addDoc
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

// collection ref
const colUserInfo = collection(db, 'user_info')
const colPlantUserInfo = collection(db, 'plant_userinfo')
const colPlantOurInfo = collection(db, 'plant_ourinfo')

// Populating the Plant Names inside the form
let plantOurInfo = [];

getDocs(colPlantOurInfo)
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            plantOurInfo.push({
                ...doc.data(),
                id: doc.id
            })
        })

        for (let plant of plantOurInfo) {
            const plantNameDrop = document.getElementById('plantName');
            const option = document.createElement('option');

            option.setAttribute('value', plant['plant_id']);
            option.innerText = plant['plant_name'];

            plantNameDrop.appendChild(option);
        }
    })
    .catch(err => {
        console.log(err.message)
    })

const signupForm = document.querySelector('.signup')

signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // variables
    // Page 1
    const email = document.getElementById('emailSignup').value
    const password = document.getElementById('passwordSignup').value
    const confirmPassword = document.getElementById('confirmPasswordSignup').value

    // Page 2
    const username = document.getElementById('usernameSignup').value
    const fname = document.getElementById('fnameSignup').value
    const lname = document.getElementById('lnameSignup').value

    // Page 3
    let avatar = "";
    const radiosAvatar = document.querySelectorAll('.avatarRadio');
    for (let radio of radiosAvatar) {
        if (radio.checked) {
            avatar = radio.value;
        }
    }

    // Authentication

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
    }

    if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                setDoc(doc(db, "user_info", cred.user.uid), {
                    email: email,
                    username: username,
                    fname: fname,
                    lname: lname,
                    avatar_img_name: avatar,
                    user_id: cred.user.uid
                })
                sessionStorage.setItem('userID', cred.user.uid);
            }).then(() => {
                signupForm.reset()
                alert("User Created");
            })
            .catch((err) => {
                console.log(err.message)
            })
    } else {
        alert("Passwords Don't Match");
    }
})

// ADDING A NEW PLANT

const plantNameArr = [];
const nicknameArr = [];
const sizeArr = [];
const locationArr = [];

const addPlantBtn = document.getElementById('addPlantButton');
const addPlantForm = document.querySelector('.addpPLantForm');

addPlantBtn.addEventListener('click', () => {

    // Declaring variables
    const plantName = document.getElementById('plantName').value

    const nickname = document.getElementById('nickname').value

    let size = "";
    const radiosSize = document.querySelectorAll('.sizeRadio');
    for (let radio of radiosSize) {
        if (radio.checked) {
            size = radio.value;
        }
    }

    let location = "";
    const radiosLocation = document.querySelectorAll('.locatationRadio');
    for (let radio of radiosLocation) {
        if (radio.checked) {
            location = radio.value;
        }
    }

    plantNameArr.push(plantName);
    nicknameArr.push(nickname);
    sizeArr.push(size);
    locationArr.push(location);

    console.log(plantNameArr)
    console.log(nicknameArr)
    console.log(sizeArr)
    console.log(locationArr)

    addPlantForm.reset()
})

addPlantForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colPlantUserInfo, {
            plantName: plantNameArr,
            nickname: nicknameArr,
            size: sizeArr,
            location: locationArr,
            user_id: auth.currentUser.uid
        })
        .then(() => {
            alert("Signup Finished");
            window.location.assign("./myaccount.html");
        })
})