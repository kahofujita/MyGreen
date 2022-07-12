
import {db, auth} from './firebase/firebase-config.js'
import {collection, addDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

const userId = sessionStorage.getItem('userID')
console.log(userId)

let plantName = 'Monstera'; //ここだけvariableにする必要がある！どうやって取ってくる？
const imgNameWapper = document.querySelector('.plant-image-name-wrapper')
const frequentList = document.querySelector('.frequency-list')
const detailSec = document.querySelector('.detail-section')
const indoorSec = document.querySelector('.indoor-section')
const outdoorSec = document.querySelector('.outdoor-section')
const description = document.querySelector('.description')


const getPlantinfo = async () => {

    // Query "plant_ourinfo"
    const plantQuery = query(collection(db, "plant_ourinfo"), where("plant_name", "==", plantName))
    const plantQuerySnapshot = await getDocs(plantQuery);
    plantQuerySnapshot.forEach((doc) => {

        const plantIds = doc.data().plant_id
        console.log(plantIds)
        // const plantName = doc.data().plant_name
        // const indoorInfo = doc.data().indoor_location
        // const outdoorInfo = doc.data().ourdoor_location
        const detailInfo = doc.data().details

        // const {indoor_location: indoor, plant_name: plantName} = doc.data()

        console.log(plantName)
        // console.log(indoorInfo)
        // console.log(outdoorInfo)


        // Display Plant Image
        const img = document.createElement('img')
        img.src = `./images/plant_img/${plantName}.jpg`
        img.alt = plantName
        imgNameWapper.appendChild(img)

        // Diplay Plant Name
        const plantNamediv = document.createElement('div')
        plantNamediv.classList.add('plant-name')
        imgNameWapper.appendChild(plantNamediv)
        plantNamediv.innerHTML = plantName

        
        // Frequency List
        // For Indoor 
        const indoorDiv = document.createElement('div')
        indoorDiv.classList.add('indoor')
        frequentList.appendChild(indoorDiv)
        indoorDiv.innerHTML = `<div>${indoorInfo.sunlight_temperature_frequency}</div><div>${indoorInfo.water_frequency}</div><div>${indoorInfo.soil_frequency}</div>`

        // For Outdoor
        const outdoorDiv = document.createElement('div')
        outdoorDiv.classList.add('outdoor')
        frequentList.appendChild(outdoorDiv)
        outdoorDiv.innerHTML = `<div>${outdoorInfo.sunlight_temperature_frequency}</div><div>${outdoorInfo.water_frequency}</div><div>${outdoorInfo.soil_frequency}</div>`
        
        description.innerHTML = detailInfo

        // Click each section 
        detailSec.addEventListener('click', () => {

            // Indoor list
            if (document.querySelector(".indoor")) {
                document.querySelector(".indoor").remove()
            }
            const indoorDiv = document.createElement('div')
            indoorDiv.classList.add('indoor')
            frequentList.appendChild(indoorDiv)
            indoorDiv.innerHTML = `<div>${indoorInfo.sunlight_temperature_frequency}</div><div>${indoorInfo.water_frequency}</div><div>${indoorInfo.soil_frequency}</div>`

            // Outdoor list
            if (document.querySelector(".outdoor")) {
                document.querySelector(".outdoor").remove()
            }
            const outdoorDiv = document.createElement('div')
            outdoorDiv.classList.add('outdoor')
            frequentList.appendChild(outdoorDiv)
            outdoorDiv.innerHTML = `<div>${outdoorInfo.sunlight_temperature_frequency}</div><div>${outdoorInfo.water_frequency}</div><div>${outdoorInfo.soil_frequency}</div>`

            // Details
            description.innerHTML = ""
            description.innerHTML = detailInfo
        })

        indoorSec.addEventListener('click', () => {

            // Indoor list
            if (document.querySelector(".indoor")) {
                document.querySelector(".indoor").remove()
            }
            const indoorDiv = document.createElement('div')
            indoorDiv.classList.add('indoor')
            frequentList.appendChild(indoorDiv)
            indoorDiv.innerHTML = `<div>${indoorInfo.sunlight_temperature_frequency}</div><div>${indoorInfo.water_frequency}</div><div>${indoorInfo.soil_frequency}</div>`

            // Outdoor list
            if (document.querySelector(".outdoor")) {
                document.querySelector(".outdoor").remove()
            }

            // Indoor table
            description.innerHTML = ""
            description.innerHTML = `<table><tr><th>Sunlight</th><th>Water</th><th>Fertilizer</th></tr><tr><td>${indoorInfo.sunlight_temperature_requirement}</td><td>${indoorInfo.water_requirement}</td><td>${indoorInfo.soil_requirement}</td></tr></table>`
        })

        outdoorSec.addEventListener('click', () => {

            // Indoor list
            if (document.querySelector(".indoor")) {
                document.querySelector(".indoor").remove()
            }

            // Outdoor list
            if (document.querySelector(".outdoor")) {
                document.querySelector(".outdoor").remove()
            }
            const outdoorDiv = document.createElement('div')
            outdoorDiv.classList.add('outdoor')
            frequentList.appendChild(outdoorDiv)
            outdoorDiv.innerHTML = `<div>${outdoorInfo.sunlight_temperature_frequency}</div><div>${outdoorInfo.water_frequency}</div><div>${outdoorInfo.soil_frequency}</div>`
            
            // Outdoor table
            description.innerHTML = ""
            description.innerHTML = `<table><tr><th>Sunlight</th><th>Water</th><th>Fertilizer</th></tr><tr><td>${outdoorInfo.sunlight_temperature_requirement}</td><td>${outdoorInfo.water_requirement}</td><td>${outdoorInfo.soil_requirement}</td></tr></table>`

        })

    })
    
    }
    
    getPlantinfo()
