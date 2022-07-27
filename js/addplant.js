import {
    db
} from "./firebase/firebase-config.js";

import {
    collection,
    getDocs,
    doc,
    onSnapshot,
    setDoc,
    query,
    where
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

const userId = sessionStorage.getItem('userID');

const colPlantUserInfo = collection(db, 'plant_userinfo')
const colPlantOurInfo = collection(db, 'plant_ourinfo')

const plantOurInfo = [];
const plantNameArr = [];
let plantUserInfo = [];

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

onSnapshot(doc(db, "plant_userinfo", userId), (doc) => {
    let plantsUpdate = (doc.data().plantsList)

    for (let plant of plantsUpdate) {
        plantUserInfo.push(plant)
    }

    console.log(plantUserInfo)
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

const addPlantBtn = document.getElementById('addPlantButton');
const addPlantForm = document.querySelector('.addpPlantForm');
const feedbackUser = document.querySelector('.feedbackUser');

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

    plantUserInfo.push(plant);

    // print every time you add to the array
    console.log(plantUserInfo)

    feedbackUser.innerHTML = 'New plant added, click on save after finish adding plants.'

    addPlantForm.reset()
})

addPlantForm.addEventListener('submit', (e) => {
    e.preventDefault()

    setDoc(doc(db, "plant_userinfo", userId), {
        plantsList: plantUserInfo
    })

    alert("Plants added");
    addPlantForm.reset();
    plantUserInfo = [];
})