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
    query,
    where
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

// If the user already logged in move him to homepage

if (sessionStorage.getItem('userID') !== null) {
    window.location.assign("./homepage.html");
}

// collection ref
const colUserInfo = collection(db, 'user_info')
const colPlantUserInfo = collection(db, 'plant_userinfo')
const colPlantOurInfo = collection(db, 'plant_ourinfo')

// Populating the Plant Names inside the form
const plantOurInfo = [];
const plantNameArr = [];

await getDocs(colPlantOurInfo)
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            plantOurInfo.push({
                ...doc.data(),
                id: doc.id
            })
        })

        // Getting the name of the plants
        for (let plant of plantOurInfo) {
            plantNameArr.push(plant['plant_name']);
        }

        // Removing duplicated names
        let plantNameUnique = [...new Set(plantNameArr)];

        for (let plant of plantNameUnique) {
            const plantNameDrop = document.getElementById('plantName');
            const option = document.createElement('option');
            option.innerText = plant;
            option.value = plant;

            plantNameDrop.appendChild(option);
        }
    })
    .catch(err => {
        console.log(err.message)
    })

const outdoorPlantsArr = [];
const indoorPlantsArr = [];

// Populating Array of Outdoor Plants

const outdoorQuery = query(collection(db, "plant_ourinfo"), where("location", "==", "outdoor"));

const querySnapshotOutdoor = await getDocs(outdoorQuery);

querySnapshotOutdoor.forEach((doc) => {
    outdoorPlantsArr.push(doc.data());
});

// Populating Array of Indoor Plants

const indoorQuery = query(collection(db, "plant_ourinfo"), where("location", "==", "indoor"));

const querySnapshotIndoor = await getDocs(indoorQuery);

querySnapshotIndoor.forEach((doc) => {
    indoorPlantsArr.push(doc.data());
});

// Signup the user

const signupForm = document.querySelector('.signup')

signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Variables of the signup form

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

    // Creating user on authentication and user_info on Firebase

    if (email === '' || password === '' || confirmPassword === '' || username === '' || fname === '' || lname === '') {
        alert("Please fill the whole form");
    } else if (password.length < 6) {
        alert("Password must be at least 6 characters");
    } else if (password === confirmPassword) {
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

                const signupForm3 = document.querySelector('.signup-page3-wrapper');
                const addPlantForm = document.querySelector('.addpPLantForm');

                signupForm3.classList.remove('show')
                signupForm3.classList.toggle('left')
                addPlantForm.classList.remove('right')
                addPlantForm.classList.toggle('show')

                // alert("User Created");
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

    if (location === "outdoor") {
        for (let plant of outdoorPlantsArr) {
            if (plant['plant_name'] === plantNameDrop.value) {
                plant_id = plant['plant_id']
                plantName = plant['plant_name']
            }
        }
    } else if (location === "indoor") {
        for (let plant of indoorPlantsArr) {
            if (plant['plant_name'] === plantNameDrop.value) {
                plant_id = plant['plant_id']
                plantName = plant['plant_name']
            }
        }
    }

    // Object inside array
    const plant = {
        plant_name: plantName,
        nickname: nickname,
        location: location,
        watering_date: '',
        nutritionizing_date: '',
        plant_id: plant_id
    }

    plantsList.push(plant);

    // print every time you add to the array
    console.log(plantsList)
    const feedbackUser = document.querySelector('.feedbackUser');
    feedbackUser.innerHTML = 'New plant added, click on save after finish adding plants.'

    addPlantForm.reset()
})

addPlantForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const userId = sessionStorage.getItem('userID');

    setDoc(doc(db, "plant_userinfo", userId), {
        plantsList: plantsList
    })

    // alert("Signup Finished");
    window.location.assign("./index.html");
})