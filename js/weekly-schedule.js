
import {app, db} from './firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";


const userId = 10;
let plantId;


const getScheduleInfo = async () => {


    // Get plant ID info
    const userQuery = query(collection(db, "plant_userinfo"), where("user_info_id", "==", userId))
    
    const userQuerySnapshot = await getDocs(userQuery);
    userQuerySnapshot.forEach((doc) => {
    
        const plantIds = doc.data().plant_id
    
        plantIds.forEach( async(plantid) => {
        
            const plantQuery = query(collection(db, "plant_ourinfo"), where("plant_id", "==", plantid))
        
            const plantQuerySnapshot = await getDocs(plantQuery);
            plantQuerySnapshot.forEach((doc, index) => {

                // watering
                const waterFrequent = doc.data().water_frequency

                console.log(waterFrequent)

                const divWater = document.createElement("div")
                divWater.classList.add('water-frequency')
                
                const watering = document.querySelector('.watering')
                watering.appendChild(divWater)
                
                divWater.innerHTML = waterFrequent;

                // sunlight and temperature
                const sunTempFunc = () => {

                const sunTemp = doc.data().sunlight_temperature_frequency

                console.log(sunTemp)

                const divSunTemp = document.createElement("div")
                divSunTemp.classList.add('suntemp-frequency')
                
                const sunlightTemp = document.querySelector('.sunlight-temp')
                sunlightTemp.appendChild(divSunTemp)
                
                divSunTemp.innerHTML = sunTemp;

                }

                // nutritions
                const nutriFunc = () => {
                const soilFrequent = doc.data().soil_frequency

                console.log(soilFrequent)

                const divSoil = document.createElement("div")
                divSoil.classList.add('soil-frequency')
                
                const nutritions = document.querySelector('.nutritions')
                nutritions.appendChild(divSoil)
                
                divSoil.innerHTML = soilFrequent;
                }

            })
            
        })
    })
    
    }
    
    getScheduleInfo()










// const getPlantinfo = async () => {


// // Get plant ID info
// const userQuery = query(collection(db, "plant_userinfo"), where("user_info_id", "==", userId))

// const userQuerySnapshot = await getDocs(userQuery);
// userQuerySnapshot.forEach((doc) => {
//     console.log(doc.data().plant_id)

//     plantId = doc.data().plant_id
// })

// // Get water frequency
// const plantQuery = query(collection(db, "plant_ourinfo"), where("plant_id", "==", plantId))

// const plantQuerySnapshot = await getDocs(plantQuery);
// plantQuerySnapshot.forEach((doc) => {
//     console.log(doc.data().water_frequency)

//     waterFrequent = doc.data().water_frequency
// })

// // Display water frequency
// // const watering = document.createAttribute('.water-frequency')






// // const plantPic = document.createElement('img')

// // plantPic.src = `./plant_img/${plantName}.jpg`
// // plantPic.alt = plantName

// // const el = document.querySelector(".swiper-slide")

// // el.appendChild(plantPic)

// }

// getPlantinfo()