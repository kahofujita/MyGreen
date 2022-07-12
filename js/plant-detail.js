
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



const getPlantinfo = async () => {

    // // Query "plant_ourinfo" for DETAIS section =================
    // const detailQuery = query(collection(db, "plant_ourinfo"), where("plant_name", "==", plantName))
    // const detailQuerySnapshot = await getDocs(detailQuery);
    // detailQuerySnapshot.forEach((doc) => {
    //     const detailInfo = doc.data().details
    //     const indoorSunFreqent = doc.data().sunlight_frequency
    //     const indoorWaterFrequent = doc.data().water_frequency_string
    //     const indoorSoilFrequent = doc.data().soil_frequency_string
    // })


    // Query "plant_ourinfo" for INDOOR location =================
    const indoorQuery = query(collection(db, "plant_ourinfo"), where("plant_name", "==", plantName), where("location", "==", 'indoor'))
    const indoorQuerySnapshot = await getDocs(indoorQuery);
    indoorQuerySnapshot.forEach( async(doc_indoor) => {

        // // Display Plant Image
        // const img = document.createElement('img')
        // img.src = `./images/plant_img/${plantName}.jpg`
        // img.alt = plantName
        // imgNameWapper.appendChild(img)

        // // Diplay Plant Name
        // const plantNamediv = document.createElement('div')
        // plantNamediv.classList.add('plant-name')
        // imgNameWapper.appendChild(plantNamediv)
        // plantNamediv.innerHTML = plantName

        // Get Plant Details
        const detailInfo = doc_indoor.data().details
        console.log(detailInfo)

        // Get Indoor Infor from firebase
        const indoorSunFrequent = doc_indoor.data().sunlight_frequency
        const indoorWaterFrequent = doc_indoor.data().water_frequency_string
        const indoorSoilFrequent = doc_indoor.data().soil_frequency_string
        const indoorSunTempRequirement = doc_indoor.data().sunlight_temperature_requirement
        const indoorWaterRequirement = doc_indoor.data().water_requirement
        const indoorSoilRequirement = doc_indoor.data().soil_requirement
        
        console.log(indoorSunFrequent)
        console.log(indoorWaterFrequent)
        console.log(indoorSoilFrequent)


        // INDOOR section ✨✨==================================

        indoorSec.addEventListener('click', () => {

            // Display only Indoor Frequency
            if (document.querySelector(".indoor")) {
                document.querySelector(".indoor").remove()
            }
            const indoorDiv = document.createElement('div')
            indoorDiv.classList.add('indoor')
            frequentList.appendChild(indoorDiv)
            indoorDiv.innerHTML = `<div>${indoorSunFrequent}</div><div>${indoorWaterFrequent}</div><div>${indoorSoilFrequent}</div>`

            // Remove Outdoor Frequency
            if (document.querySelector(".outdoor")) {
                document.querySelector(".outdoor").remove()
            }

            // Display Indoor Requirement Table
            description.innerHTML = ""
            description.innerHTML = `<table><tr><th>Sunlight</th><th>Water</th><th>Fertilizer</th></tr><tr><td>${indoorSunTempRequirement}</td><td>${indoorWaterRequirement}</td><td>${indoorSoilRequirement}</td></tr></table>`
        })





        // Query "plant_ourinfo" for OUTDOOR location ==============
        const outdoorQuery = query(collection(db, "plant_ourinfo"), where("plant_name", "==", plantName), where("location", "==", 'outdoor'))
        const outdoorQuerySnapshot = await getDocs(outdoorQuery);
        outdoorQuerySnapshot.forEach((doc_outdoor) => {

            // Get Outdoor Info from firebase
            const outdoorSunFrequent = doc_outdoor.data().sunlight_frequency
            const outdoorWaterFrequent = doc_outdoor.data().water_frequency_string
            const outdoorSoilFrequent = doc_outdoor.data().soil_frequency_string
            const outdoorSunTempRequirement = doc_outdoor.data().sunlight_temperature_requirement
            const outdoorWaterRequirement = doc_outdoor.data().water_requirement
            const outdoorSoilRequirement = doc_outdoor.data().soil_requirement

            console.log(outdoorSunFrequent)
            console.log(outdoorWaterFrequent)
            console.log(outdoorSoilFrequent)


            // DETAIL section 🌟🌟 ============================

            // When Going back to Detail Section
            detailSec.addEventListener('click', () => {

                // Remove Indoor Frequency
                if (document.querySelector(".indoor")) {
                    document.querySelector(".indoor").remove()
                }
                const indoorDiv = document.createElement('div')
                indoorDiv.classList.add('indoor')
                frequentList.appendChild(indoorDiv)
                indoorDiv.innerHTML = `<div>${indoorSunFrequent}</div><div>${indoorWaterFrequent}</div><div>${indoorSoilFrequent}</div>`
    
                // Remove Outdoor Frequency
                if (document.querySelector(".outdoor")) {
                    document.querySelector(".outdoor").remove()
                }
                const outdoorDiv = document.createElement('div')
                outdoorDiv.classList.add('outdoor')
                frequentList.appendChild(outdoorDiv)
                outdoorDiv.innerHTML = `<div>${outdoorSunFrequent}</div><div>${outdoorWaterFrequent}</div><div>${outdoorSoilFrequent}</div>`
    
                // Details
                description.innerHTML = ""
                description.innerHTML = detailInfo
            })

            // Indoor Frequency 
            const indoorDiv = document.createElement('div')
            indoorDiv.classList.add('indoor')
            frequentList.appendChild(indoorDiv)
            indoorDiv.innerHTML = `<div>${indoorSunFrequent}</div><div>${indoorWaterFrequent}</div><div>${indoorSoilFrequent}</div>`

            // Outdoor Frequency
            const outdoorDiv = document.createElement('div')
            outdoorDiv.classList.add('outdoor')
            frequentList.appendChild(outdoorDiv)
            outdoorDiv.innerHTML = `<div>${outdoorSunFrequent}</div><div>${outdoorWaterFrequent}</div><div>${outdoorSoilFrequent}</div>`

            // Detail description
            description.innerHTML = detailInfo




            // OUTDOOR section 🌸🌸 ===========================

            outdoorSec.addEventListener('click', () => {

                // Remove Indoor Frequency
                if (document.querySelector(".indoor")) {
                    document.querySelector(".indoor").remove()
                }
    
                // Display only Outdoor Frequency
                if (document.querySelector(".outdoor")) {
                    document.querySelector(".outdoor").remove()
                }
                const outdoorDiv = document.createElement('div')
                outdoorDiv.classList.add('outdoor')
                frequentList.appendChild(outdoorDiv)
                outdoorDiv.innerHTML = `<div>${outdoorSunFrequent}</div><div>${outdoorWaterFrequent}</div><div>${outdoorSoilFrequent}</div>`
                
                // Display Outdoor Requirement Table
                description.innerHTML = ""
                description.innerHTML = `<table><tr><th>Sunlight</th><th>Water</th><th>Fertilizer</th></tr><tr><td>${outdoorSunTempRequirement}</td><td>${outdoorWaterRequirement}</td><td>${outdoorSoilRequirement}</td></tr></table>`
    
            })



        })



        

        // const outdoorInfo = doc.data().ourdoor_location

        // const {indoor_location: indoor, plant_name: plantName} = doc.data()

        console.log(plantName)
        // console.log(indoorInfo)
        // console.log(outdoorInfo)


        // // Display Plant Image
        // const img = document.createElement('img')
        // img.src = `./images/plant_img/${plantName}.jpg`
        // img.alt = plantName
        // imgNameWapper.appendChild(img)

        // // Diplay Plant Name
        // const plantNamediv = document.createElement('div')
        // plantNamediv.classList.add('plant-name')
        // imgNameWapper.appendChild(plantNamediv)
        // plantNamediv.innerHTML = plantName

        

        // Detail Section 🌟🌟===============================

        // Frequency List
        // For Indoor 
        // const indoorDiv = document.createElement('div')
        // indoorDiv.classList.add('indoor')
        // frequentList.appendChild(indoorDiv)
        // // indoorDiv.innerHTML = `<div>${indoorInfo.sunlight_temperature_frequency}</div><div>${indoorInfo.water_frequency}</div><div>${indoorInfo.soil_frequency}</div>`

        // // For Outdoor
        // const outdoorDiv = document.createElement('div')
        // outdoorDiv.classList.add('outdoor')
        // frequentList.appendChild(outdoorDiv)
        // outdoorDiv.innerHTML = `<div>${outdoorInfo.sunlight_temperature_frequency}</div><div>${outdoorInfo.water_frequency}</div><div>${outdoorInfo.soil_frequency}</div>`
        
        // description.innerHTML = detailInfo

        // Click each section 
        // detailSec.addEventListener('click', () => {

        //     // Indoor list
        //     if (document.querySelector(".indoor")) {
        //         document.querySelector(".indoor").remove()
        //     }
        //     const indoorDiv = document.createElement('div')
        //     indoorDiv.classList.add('indoor')
        //     frequentList.appendChild(indoorDiv)
        //     indoorDiv.innerHTML = `<div>${indoorInfo.sunlight_temperature_frequency}</div><div>${indoorInfo.water_frequency}</div><div>${indoorInfo.soil_frequency}</div>`

        //     // Outdoor list
        //     if (document.querySelector(".outdoor")) {
        //         document.querySelector(".outdoor").remove()
        //     }
        //     const outdoorDiv = document.createElement('div')
        //     outdoorDiv.classList.add('outdoor')
        //     frequentList.appendChild(outdoorDiv)
        //     outdoorDiv.innerHTML = `<div>${outdoorInfo.sunlight_temperature_frequency}</div><div>${outdoorInfo.water_frequency}</div><div>${outdoorInfo.soil_frequency}</div>`

        //     // Details
        //     description.innerHTML = ""
        //     description.innerHTML = detailInfo
        // })

        // indoorSec.addEventListener('click', () => {

        //     // Indoor list
        //     if (document.querySelector(".indoor")) {
        //         document.querySelector(".indoor").remove()
        //     }
        //     const indoorDiv = document.createElement('div')
        //     indoorDiv.classList.add('indoor')
        //     frequentList.appendChild(indoorDiv)
        //     indoorDiv.innerHTML = `<div>${indoorInfo.sunlight_temperature_frequency}</div><div>${indoorInfo.water_frequency}</div><div>${indoorInfo.soil_frequency}</div>`

        //     // Outdoor list
        //     if (document.querySelector(".outdoor")) {
        //         document.querySelector(".outdoor").remove()
        //     }

        //     // Indoor table
        //     description.innerHTML = ""
        //     description.innerHTML = `<table><tr><th>Sunlight</th><th>Water</th><th>Fertilizer</th></tr><tr><td>${indoorInfo.sunlight_temperature_requirement}</td><td>${indoorInfo.water_requirement}</td><td>${indoorInfo.soil_requirement}</td></tr></table>`
        // })

        // outdoorSec.addEventListener('click', () => {

        //     // Indoor list
        //     if (document.querySelector(".indoor")) {
        //         document.querySelector(".indoor").remove()
        //     }

        //     // Outdoor list
        //     if (document.querySelector(".outdoor")) {
        //         document.querySelector(".outdoor").remove()
        //     }
        //     const outdoorDiv = document.createElement('div')
        //     outdoorDiv.classList.add('outdoor')
        //     frequentList.appendChild(outdoorDiv)
        //     outdoorDiv.innerHTML = `<div>${outdoorInfo.sunlight_temperature_frequency}</div><div>${outdoorInfo.water_frequency}</div><div>${outdoorInfo.soil_frequency}</div>`
            
        //     // Outdoor table
        //     description.innerHTML = ""
        //     description.innerHTML = `<table><tr><th>Sunlight</th><th>Water</th><th>Fertilizer</th></tr><tr><td>${outdoorInfo.sunlight_temperature_requirement}</td><td>${outdoorInfo.water_requirement}</td><td>${outdoorInfo.soil_requirement}</td></tr></table>`

        // })

    })

    }
    
    getPlantinfo()
