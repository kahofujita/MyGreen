
import {app, db} from './firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";


let plantId = 3;
const imgWapper = document.querySelector('.plant-image-wrapper')
const frequentList = document.querySelector('.frequency-list')
const detailSec = document.querySelector('.detail-section')
const indoorSec = document.querySelector('.indoor-section')
const outdoorSec = document.querySelector('.outdoor-section')
const description = document.querySelector('.description')


const getPlantinfo = async () => {

    // Get plant ID info
    const plantQuery = query(collection(db, "plant_ourinfo"), where("plant_id", "==", plantId))
    
    const plantQuerySnapshot = await getDocs(plantQuery);
    plantQuerySnapshot.forEach((doc) => {
        // console.log(doc.data().plant_id)

        const plantName = doc.data().plant_name
        const indoorInfo = doc.data().indoor_location
        const outdoorInfo = doc.data().ourdoor_location
        const detailInfo = doc.data().details

        // const {indoor_location: indoor, plant_name: plantName} = doc.data()

        console.log(plantName)
        console.log(indoorInfo)
        console.log(outdoorInfo)


        // Display plant image
        const img = document.createElement('img')
        img.src = `./plant_img/${plantName}.jpg`
        img.alt = plantName

        imgWapper.appendChild(img)

        // Diplay plant name
        const plantNamediv = document.createElement('div')
        plantNamediv.classList.add('plant-name')
        imgWapper.appendChild(plantNamediv)
        plantNamediv.innerHTML = plantName

        // Indoor
        const indoorDiv = document.createElement('div')
        indoorDiv.classList.add('indoor')
        frequentList.appendChild(indoorDiv)
        indoorDiv.innerHTML = `<div>${indoorInfo.sunlight_temperature_frequency}</div><div>${indoorInfo.water_frequency}</div><div>${indoorInfo.soil_frequency}</div>`

        // Outdoor
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