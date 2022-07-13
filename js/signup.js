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

if (sessionStorage.getItem('userID') !== null) {
    window.location.assign("./homepage.html");
}

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

            // console.log(plant['id'])
            option.setAttribute('value', plant['id']);
            // option.setAttribute('name', plant['plant_name']);
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
                alert('Email already in use')
            })
    } else {
        alert("Passwords Don't Match");
    }
})

// ADDING A NEW PLANT

const addPlantBtn = document.getElementById('addPlantButton');
const addPlantForm = document.querySelector('.addpPLantForm');

const plantsList = [];

addPlantBtn.addEventListener('click', () => {

    // Declaring variables
    const plantNameDrop = document.getElementById('plantName');
    const nickname = document.getElementById('nickname').value;

    let location = "";
    const radiosLocation = document.querySelectorAll('.locatationRadio');
    for (let radio of radiosLocation) {
        if (radio.checked) {
            location = radio.value;
        }
    }

    let plant_id = "";
    let plantName = "";

    for (let plant of plantOurInfo) {
        if (plant.id === plantNameDrop.value) {
            plant_id = plant['plant_id']
            plantName = plant['plant_name']
        }
    }

    // Object inside array
    const plant = {
        plantName: plantName,
        nickname: nickname,
        location: location,
        watering_date: '',
        nutritionizing_date: '',
        plant_id: plant_id
    }

    plantsList.push(plant);

    // print every time you add to the array
    console.log(plantsList)

    addPlantForm.reset()
})

addPlantForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const userId = sessionStorage.getItem('userID');
    
    setDoc(doc(db, "plant_userinfo", userId), {
        plantsList: plantsList
    })

    alert("Signup Finished");
    window.location.assign("./homepage.html");
})

    // const plantTemplate = {
    //     location: "",
    //     watering_date : "",
    //     nutritionizing_date : "",
    //     plantName: "",
    //     nickName: "",
    //     plant_id: ""
    // }


// plantNameArr.push(plantName);
// nicknameArr.push(nickname);
// locationArr.push(location);

// console.log(plantNameArr)
// console.log(nicknameArr)
// // console.log(sizeArr)
// console.log(locationArr)

// plantName: plantNameArr,
// nickname: nicknameArr,
// location: locationArr,
// nutritionizing_date: "",
// watering_date: "",
// user_id: auth.currentUser.uid

// sizeArr.push(size);
// let size = "";
// const radiosSize = document.querySelectorAll('.sizeRadio');
// for (let radio of radiosSize) {
//     if (radio.checked) {
//         size = radio.value;
//     }
// }

// const plantNameArr = [];
// const nicknameArr = [];
// const sizeArr = [];
// const locationArr = [];