
import {db, auth} from './firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc, arrayUnion} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";


const userId = sessionStorage.getItem('userID')
console.log(userId)

const watering = document.querySelector('.watering')
const sunlightTemp = document.querySelector('.sunlight-temp')
const nutritions = document.querySelector('.nutritions')

const dateControl = document.querySelector('.calendar')

const getPlantinfo = async () => {


// Get plant ID info
const userQuery = query(collection(db, "plant_userinfo"), where("user_info_id", "==", userId))

const userQuerySnapshot = await getDocs(userQuery);
userQuerySnapshot.forEach((doc_plantuserinfo) => {

    const plantIds = doc_plantuserinfo.data().plant_id

    // // Grab the last watering date from firebase
    // const date = new Date(doc_plantuserinfo.data().water_1*1000)
    // console.log(date);


    // async inside of async ...??

    plantIds.forEach( async(plantid, index) => {
    
        const plantQuery = query(collection(db, "plant_ourinfo"), where("plant_id", "==", plantid))

        // console.log(plantid)

   
        const plantQuerySnapshot = await getDocs(plantQuery);
        plantQuerySnapshot.forEach((doc_plantourinfo) => {

            // Display plant image
            const plantName = doc_plantourinfo.data().plant_name
        
            const div = document.createElement('div')
            // div.classList.add('swiper-slide')
            div.classList.add('plant-image')

            const img = document.createElement('img')
            img.setAttribute('id', 'myplant');
            img.src = `./images/plant_img/${plantName}.jpg`
            img.alt = plantName
            div.appendChild(img)

            const myplantWrapper = document.querySelector('.myplant-wrapper')
            myplantWrapper.appendChild(div)



            // Weekly schedule in loaded page
            if ( index == 0) {
                    
                const button = document.createElement('button')
                button.classList.add('watered-today')
                button.innerHTML = 'Watered today'
                watering.appendChild(button)


                // Calculate dates

                // Get last watering date from firebase
                const wateringMap = `plant_${plantid}`
                console.log(wateringMap)
                const lastWateringDateString = doc_plantuserinfo.data().watering_date[wateringMap]
                console.log(lastWateringDateString)

                // Get calendar value
                const lastWateringDate = new Date(lastWateringDateString)
                const calendarValue = lastWateringDate.toISOString().split('T')[0]
                console.log(calendarValue)

                // Display the date in calendar
                


                // const calendarDate = new Date(calendarValue)
                // const changeCalendarValue = calendarDate.toISOString().split('T')[0]
                // console.log(changeCalendarValue)



                // get the dat of today
                const today = new Date()
                const todayString = getFormattedDate(today)
                console.log(todayString)

                let day1 = new Date(lastWateringDateString); 
                let day2 = new Date(todayString);

                let difference= Math.abs(day2-day1);
                let days = difference/(1000 * 3600 * 24)

                console.log(days)

                const dateDifference = doc_plantourinfo.data().water_frequency - days
                console.log(dateDifference)

                // if condition
                if ( dateDifference > 0) {
                    console.log(dateDifference + ' days to go')
                } else if ( dateDifference == 0 ) {
                    console.log('Water today!')
                } else if ( dateDifference < 0 ) {
                    console.log(-dateDifference + ' days late')
                }

                // Update last watering date
                button.addEventListener('click', async() => {


                    if (button.classList.contains("update")) {
                        console.log('update')

                        




                    } 




                    // console.log(plantid)

                    // // Update watering date to today
                    // const updateDate = new Date();
                    // const updateDateString = getFormattedDate(updateDate)
                    // console.log(updateDateString)

                    // const doctoUpdate = doc(db, "plant_userinfo", doc_plantuserinfo.id);

                    // await updateDoc(doctoUpdate, {
                    //     "watering_date": updateDateString
                    // });
                })

                function getFormattedDate(date) {
                    var year = date.getFullYear();
                  
                    var month = (1 + date.getMonth()).toString();
                    month = month.length > 1 ? month : '0' + month;
                  
                    var day = date.getDate().toString();
                    day = day.length > 1 ? day : '0' + day;
                    
                    return month + '/' + day + '/' + year;
                  }

                
                

                // Click calendar
                dateControl.addEventListener('change', () => {
                    button.innerHTML = 'Update'
                    button.setAttribute('class', 'update')
                })
            }


            
            


            // Click plant image
            img.addEventListener('click', () => {
                console.log(index)

                // watering
                const waterFrequent = doc_plantourinfo.data().water_frequency

                console.log(waterFrequent)

                if (document.querySelector(".water-frequency")) {
                    document.querySelector(".water-frequency").remove()
                }

                const divWater = document.createElement("div")
                divWater.classList.add('water-frequency')
                
                watering.appendChild(divWater)

                divWater.innerHTML = waterFrequent;

                // sunlight and temperature
                const sunTemp = doc_plantourinfo.data().sunlight_temperature_frequency

                // console.log(sunTemp)

                if (document.querySelector(".suntemp-frequency")) {
                    document.querySelector(".suntemp-frequency").remove()
                }

                const divSunTemp = document.createElement("div")
                divSunTemp.classList.add('suntemp-frequency')
                
                sunlightTemp.appendChild(divSunTemp)
                
                divSunTemp.innerHTML = sunTemp;

                // nutritions
                const soilFrequent = doc_plantourinfo.data().soil_frequency

                // console.log(soilFrequent)

                if (document.querySelector(".soil-frequency")) {
                    document.querySelector(".soil-frequency").remove()
                }

                const divSoil = document.createElement("div")
                divSoil.classList.add('soil-frequency')
                
                nutritions.appendChild(divSoil)
                divSoil.innerHTML = soilFrequent;


                // Waterd today button inside addEventlistener to image
                if (document.querySelector(".watered-today")) {
                    document.querySelector(".watered-today").remove()
                }
        
                const button = document.createElement('button')
                button.classList.add('watered-today')
                button.innerHTML = 'Watered today'
                watering.appendChild(button)

                button.addEventListener('click', async() => {
                    // console.log(plantid)

                    const currentDate = new Date().getTime()
                    // console.log(currentDate)

                    const doctoUpdate = doc(db, "plant_userinfo", doc_plantuserinfo.id);

                    await updateDoc(doctoUpdate, {
                        [`water_${plantid}`]: Timestamp.fromDate(new Date())
                        });
                })
            })


            // watering calculation
            // clicking watered today button

            // document.getElementById('watered-today').addEventListener('click', () => {
            //     console.log('you click me!')

            //     const date = new Date();


            //     // const nextDate
            //     const nextDate = date.getDate() + 7
            //     console.log(nextDate)

            //     // console.log(today.getDate())

            //     const countdown = nextDate - date.getDate()
            //     // console.log(countdown)

                

                



            // })

            // calendar

            // const dateControl = document.querySelector('input[type="date"]')
            // console.log(dateControl.value)




 
        })
        
    })
})


}

getPlantinfo()


// Add a plant
// addplant.addEventListener('click', () => {
    
// })

















// const getPlantinfo = async () => { 
//     const docRef = doc(db, "plant_userinfo", "0bGQUunaahMZrACl7KGT");
//     const docSnap = await getDoc(docRef); 

//     const docSnapId = docSnap.data().user_info_id
//     console.log(docSnapId)

    

//     const q = query(collection(db, "plant_ourinfo"), where("plant_id", "==", 200));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//     });
// }


// getPlantinfo()

// An async function is a function declared with the async keyword, and the await keyword is permitted within it.
// wait until we find getDoc