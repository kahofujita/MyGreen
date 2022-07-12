
import {db, auth} from './firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc, arrayUnion} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";


const userId = sessionStorage.getItem('userID')
console.log(userId)

const watering = document.querySelector('.watering')
const sunlightTemp = document.querySelector('.sunlight-temp')
const nutritions = document.querySelector('.nutritions')
const dateControlForWatering = document.querySelector('.watering-calendar')
const dateControlForNutritionizing = document.querySelector('.nutritionizing-calendar')



const getPlantinfo = async () => {

// Query "plant_userinfo"
const userQuery = query(collection(db, "plant_userinfo"), where("user_info_id", "==", userId))
const userQuerySnapshot = await getDocs(userQuery);
userQuerySnapshot.forEach((doc_plantuserinfo) => {

    const plantIds = doc_plantuserinfo.data().plant_id


    // forEach plantid
    plantIds.forEach( async(plantid, index) => {


        // Query "plant_ourinfo"
        const plantQuery = query(collection(db, "plant_ourinfo"), where("plant_id", "==", plantid))
        const plantQuerySnapshot = await getDocs(plantQuery);
        plantQuerySnapshot.forEach((doc_plantourinfo) => {


            // Display Plant Image
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


            // Fuction for Formatted Date
            function getFormattedDate(date) {
               var year = date.getFullYear();
              
               var month = (1 + date.getMonth()).toString();
               month = month.length > 1 ? month : '0' + month;
              
               var day = date.getDate().toString();
               day = day.length > 1 ? day : '0' + day;
                
               return month + '/' + day + '/' + year;
            }



            // Weekly Schedule
            // The First Plant
            if ( index == 0 ) {


                // WATERING SECTION 🌟🌟======================================
                    
                // Display Button
                const button = document.createElement('button')
                button.classList.add('watered-today')
                button.innerHTML = 'Watered today!'
                button.id = `btn_${plantid}`
                watering.appendChild(button)


                // Calculate dates
                // Get last watering date from firebase
                const wateringMap = `plant_${plantid}`
                console.log(wateringMap)
                const lastWateringDateString = doc_plantuserinfo.data().watering_date[wateringMap]
                console.log(lastWateringDateString)

                // Get the day of today
                const today = new Date()
                const todayFormat = getFormattedDate(today)
                // console.log(todayFormat)
                const todayString = (`${todayFormat.split("/")[2]}-${todayFormat.split("/")[0]}-${todayFormat.split("/")[1]}`).toString()
                console.log(todayString)

                // Calculate the difference between two days
                let day1 = new Date(lastWateringDateString);
                let day2 = new Date(todayString);

                let difference= Math.abs(day2-day1);
                let days = parseInt(difference/(1000 * 3600 * 24))
                console.log(days)

                const dateDifference = doc_plantourinfo.data().water_frequency - days
                console.log(dateDifference)
                

                // Set calendar value
                dateControlForWatering.setAttribute('value', lastWateringDateString)
                // const calendarValueString = dateControl.value
                // console.log(calendarValueString)

                // let calendarValue = new Date(`${lastWateringDateString.split("/")[2]}-${lastWateringDateString.split("/")[0]}-${lastWateringDateString.split("/")[1]} 00:00`).toString()
                // console.log(calendarValue)
                
                // const lastWateringDate = new Date(lastWateringDateString)
                // // const calendarValue = lastWateringDate.toISOString().split('T')[0]
                // console.log(calendarValue)
                // console.log(lastWateringDateString.split("/")[1])

                // Display the date in calendar
                


                // const calendarDate = new Date(calendarValue)
                // const changeCalendarValue = calendarDate.toISOString().split('T')[0]
                // console.log(changeCalendarValue)



                // // get the dat of today
                // const today = new Date()
                // const todayString = today.toString()
                // console.log(todayString)
                // const todayWateringDate = today.toISOString().split('T')[0]
                // console.log(todayWateringDate)

                // let day1 = new Date(calendarValue); 
                // console.log(lastWateringDateString)
                // let day2 = new Date(todayString);
                // console.log(todayString)

                // let difference= Math.abs(day2-day1);
                // let days = parseInt(difference/(1000 * 3600 * 24))

                // console.log(days)

                // const dateDifference = doc_plantourinfo.data().water_frequency - days
                // console.log(dateDifference)




                //  Click the button (Update last watering date)
                button.addEventListener('click', async() => {

                    if (button.classList.contains("update")) {
                        // If users change the date of calendar
                        console.log('you changed the date!')
                        // Get calendar value
                        const calendarValueString = dateControlForWatering.value
                        console.log(calendarValueString)
                        // Update a date manually
                        const doctoUpdate = doc(db, "plant_userinfo", doc_plantuserinfo.id)
                        const wateringDatetoUpdate = doc_plantuserinfo.data().watering_date
                        await updateDoc(doctoUpdate, {watering_date: {
                            ...wateringDatetoUpdate, [wateringMap]: calendarValueString
                        }
                        })
                        // Change the button from 'Updated' to 'Watered today'
                        button.innerHTML = 'Watered today'
                        // 'Do you want to register Watered today? みたいなポップアップ必要？

                    } else {
                        // Update a date to today
                        const doctoUpdate = doc(db, "plant_userinfo", doc_plantuserinfo.id)
                        const wateringDatetoUpdate = doc_plantuserinfo.data().watering_date
                        await updateDoc(doctoUpdate, {watering_date: {
                            ...wateringDatetoUpdate, [wateringMap]: todayString
                        }
                        })
                        // Set calendar value to Today
                        dateControlForWatering.setAttribute('value', todayString)
                        // 'Do you want to update last watering date? みたいなポップアップ必要？
                    }
                })


                // Button Condition
                if ( dateDifference > 0) {
                    console.log(dateDifference + ' days to go')
                    button.innerHTML = dateDifference + ' days to go'
                    button.disabled = true;
                } else if ( dateDifference == 0 ) {
                    console.log('Water today!')
                    button.innerHTML = 'Water today'
                } else if ( dateDifference < 0 ) {
                    console.log(-dateDifference + ' days late')
                    button.innerHTML = -dateDifference + ' days late'
                }


                // Updated button
                dateControlForWatering.addEventListener('change', () => {
                    button.innerHTML = 'Update'
                    button.setAttribute('class', 'update')
                    button.disabled = false;
                })




                // NUTRITIONS SECTION ✨✨======================================


                // Display Button
                const buttonNutritions = document.createElement('button')
                buttonNutritions.classList.add('nutritionize-today')
                buttonNutritions.innerHTML = 'Nutritionize today!'
                buttonNutritions.id = `btn_${plantid}`
                nutritions.appendChild(buttonNutritions)


                // Calculate dates
                // Get last nutritionizing date from firebase
                const nutritionizingMap = `plant_${plantid}`
                console.log(nutritionizingMap)
                const lastNutritionizingDateString = doc_plantuserinfo.data().nutritionizing_date[nutritionizingMap]
                console.log(lastNutritionizingDateString)

                // Get the day of today
                // const today = new Date()
                // const todayFormat = getFormattedDate(today)
                // // console.log(todayFormat)
                // const todayString = (`${todayFormat.split("/")[2]}-${todayFormat.split("/")[0]}-${todayFormat.split("/")[1]}`).toString()
                // console.log(todayString)

                // Calculate the difference between two days
                let day3 = new Date(lastNutritionizingDateString);
                let day4 = new Date(todayString);

                let differenceForNutritionizing = Math.abs(day4-day3);
                let daysForNutritionizing = parseInt(differenceForNutritionizing/(1000 * 3600 * 24))
                console.log(daysForNutritionizing)

                const dateDifferenceForNutritionizing = doc_plantourinfo.data().soil_frequency - days
                console.log(dateDifferenceForNutritionizing)
                

                // Set calendar value
                dateControlForNutritionizing.setAttribute('value', lastNutritionizingDateString)


                //  Click the button (Update last nutritionizing date)
                buttonNutritions.addEventListener('click', async() => {

                    if (buttonNutritions.classList.contains("update")) {
                        // If users change the date of calendar
                        console.log('you changed the date!')
                        // // Set calendar value
                        // dateControlForNutritionizing.setAttribute('value', lastNutritionizingDateString)
                        // Get calendar value
                        const calendarValueString = dateControlForNutritionizing.value
                        console.log(calendarValueString)
                        // Update a date manually
                        const doctoUpdate = doc(db, "plant_userinfo", doc_plantuserinfo.id)
                        const nutritionizingDatetoUpdate = doc_plantuserinfo.data().nutritionizing_date
                        await updateDoc(doctoUpdate, {nutritionizing_date: {
                            ...nutritionizingDatetoUpdate, [nutritionizingMap]: calendarValueString
                        }
                    

                        })
                        // Change the button from 'Updated' to 'Nutritionize today'
                        // buttonNutritions.innerHTML = 'Nutritionize today!'

                        // Button Condition
                        if ( dateDifferenceForNutritionizing > 0) {
                            console.log(dateDifferenceForNutritionizing + ' days to go')
                            buttonNutritions.innerHTML = dateDifferenceForNutritionizing + ' days to go'
                            buttonNutritions.disabled = true;
                        } else if ( dateDifferenceForNutritionizing == 0 ) {
                            console.log('Nutritionize today!')
                            buttonNutritions.innerHTML = 'Nutritionize today'
                        } else if ( dateDifferenceForNutritionizing < 0 ) {
                            console.log(-dateDifferenceForNutritionizing + ' days late')
                            buttonNutritions.innerHTML = -dateDifferenceForNutritionizing + ' days late'
                        }
                        // 'Do you want to register Watered today? みたいなポップアップ必要？

                    } else {
                        // Update a date to today
                        const doctoUpdate = doc(db, "plant_userinfo", doc_plantuserinfo.id)
                        const nutritionizingDatetoUpdate = doc_plantuserinfo.data().nutritionizing_date
                        await updateDoc(doctoUpdate, {nutritionizing_date: {
                            ...nutritionizingDatetoUpdate, [nutritionizingMap]: todayString
                        }
                        })
                        // Set calendar value to Today
                        dateControlForNutritionizing.setAttribute('value', todayString)
                        // 'Do you want to update last watering date? みたいなポップアップ必要？
                    }
                })


                // Button Condition
                if ( dateDifferenceForNutritionizing > 0) {
                    console.log(dateDifferenceForNutritionizing + ' days to go')
                    buttonNutritions.innerHTML = dateDifferenceForNutritionizing + ' days to go'
                    buttonNutritions.disabled = true;
                } else if ( dateDifferenceForNutritionizing == 0 ) {
                    console.log('Nutritionize today!')
                    buttonNutritions.innerHTML = 'Nutritionize today'
                } else if ( dateDifferenceForNutritionizing < 0 ) {
                    console.log(-dateDifferenceForNutritionizing + ' days late')
                    buttonNutritions.innerHTML = -dateDifferenceForNutritionizing + ' days late'
                }


                // Updated button
                dateControlForNutritionizing.addEventListener('change', () => {
                    buttonNutritions.innerHTML = 'Update'
                    buttonNutritions.setAttribute('class', 'update')
                    buttonNutritions.disabled = false;
                })




                // SUNLIGHT SECTION 🌸🌸======================================

                // Display Sunlight Frequency
                const sunlightFrequency = doc_plantourinfo.data().sunlight_frequency
                console.log(sunlightFrequency)
 
                if (document.querySelector(".sunlight-frequency")) {
                    document.querySelector(".sunlight-frequency").remove()
                }
 
                const divSunlight = document.createElement("div")
                divSunlight.classList.add('sunlight-frequency')
                sunlightTemp.appendChild(divSunlight)
                divSunlight.innerHTML = sunlightFrequency;


            }


            
            


            // Click Plant Image
            img.addEventListener('click', () => {
                console.log(index)


                // 上のindex == 0のコードとほとんど同じだけど、他にやり方ある？？

                // WATERING SECTION 🌟🌟======================================

                // Delete if a button already exists
                if (document.querySelector('.watered-today')) {
                    document.querySelector('.watered-today').remove()
                }
                    
                // Display Button
                const button = document.createElement('button')
                button.classList.add('watered-today')
                button.innerHTML = 'Watered today!'
                button.id = `btn_${plantid}`
                watering.appendChild(button)


                // Calculate dates
                // Get last watering date from firebase
                const wateringMap = `plant_${plantid}`
                console.log(wateringMap)
                const lastWateringDateString = doc_plantuserinfo.data().watering_date[wateringMap]
                console.log(lastWateringDateString)

                // Get the day of today
                const today = new Date()
                const todayFormat = getFormattedDate(today)
                // console.log(todayFormat)
                const todayString = (`${todayFormat.split("/")[2]}-${todayFormat.split("/")[0]}-${todayFormat.split("/")[1]}`).toString()
                console.log(todayString)

                // Calculate the difference between two days
                let day1 = new Date(lastWateringDateString);
                let day2 = new Date(todayString);

                let difference= Math.abs(day2-day1);
                let days = parseInt(difference/(1000 * 3600 * 24))
                console.log(days)

                const dateDifference = doc_plantourinfo.data().water_frequency - days
                console.log(dateDifference)
                

                // Set calendar value
                dateControlForWatering.setAttribute('value', lastWateringDateString)


                //  Click the button (Update last watering date)
                button.addEventListener('click', async() => {

                    if (button.classList.contains("update")) {
                        // If users change the date of calendar
                        console.log('you changed the date!')
                        // Get calendar value
                        const calendarValueString = dateControlForWatering.value
                        console.log(calendarValueString)
                        // Update a date manually
                        const doctoUpdate = doc(db, "plant_userinfo", doc_plantuserinfo.id)
                        const wateringDatetoUpdate = doc_plantuserinfo.data().watering_date
                        await updateDoc(doctoUpdate, {watering_date: {
                            ...wateringDatetoUpdate, [wateringMap]: calendarValueString
                        }
                        })
                        // Change the button from 'Updated' to 'Watered today'
                        button.innerHTML = 'Watered today'
                        // 'Do you want to register Watered today? みたいなポップアップ必要？

                    } else {
                        // Update a date to today
                        const doctoUpdate = doc(db, "plant_userinfo", doc_plantuserinfo.id)
                        const wateringDatetoUpdate = doc_plantuserinfo.data().watering_date
                        await updateDoc(doctoUpdate, {watering_date: {
                            ...wateringDatetoUpdate, [wateringMap]: todayString
                        }
                        })
                        // Set calendar value to Today
                        dateControlForWatering.setAttribute('value', todayString)
                        // 'Do you want to update last watering date? みたいなポップアップ必要？
                    }
                })


                // Button Condition
                if ( dateDifference > 0) {
                    console.log(dateDifference + ' days to go')
                    button.innerHTML = dateDifference + ' days to go'
                    button.disabled = true;
                } else if ( dateDifference == 0 ) {
                    console.log('Water today!')
                    button.innerHTML = 'Water today'
                } else if ( dateDifference < 0 ) {
                    console.log(-dateDifference + ' days late')
                    button.innerHTML = -dateDifference + ' days late'
                }


                // Updated button
                dateControlForWatering.addEventListener('change', () => {
                    button.innerHTML = 'Update'
                    button.setAttribute('class', 'update')
                    button.disabled = false;
                })




                // NUTRITIONS SECTION ✨✨======================================

                // Delete if a button already exists
                if (document.querySelector('.nutritionize-today')) {
                    document.querySelector('.nutritionize-today').remove()
                }

                // Display Button
                const buttonNutritions = document.createElement('button')
                buttonNutritions.classList.add('nutritionize-today')
                buttonNutritions.innerHTML = 'Nutritionize today!'
                buttonNutritions.id = `btn_${plantid}`
                nutritions.appendChild(buttonNutritions)


                // Calculate dates
                // Get last nutritionizing date from firebase
                const nutritionizingMap = `plant_${plantid}`
                console.log(nutritionizingMap)
                const lastNutritionizingDateString = doc_plantuserinfo.data().nutritionizing_date[nutritionizingMap]
                console.log(lastNutritionizingDateString)

                // Get the day of today
                // const today = new Date()
                // const todayFormat = getFormattedDate(today)
                // // console.log(todayFormat)
                // const todayString = (`${todayFormat.split("/")[2]}-${todayFormat.split("/")[0]}-${todayFormat.split("/")[1]}`).toString()
                // console.log(todayString)

                // Calculate the difference between two days
                let day3 = new Date(lastNutritionizingDateString);
                let day4 = new Date(todayString);

                let differenceForNutritionizing = Math.abs(day4-day3);
                let daysForNutritionizing = parseInt(differenceForNutritionizing/(1000 * 3600 * 24))
                console.log(daysForNutritionizing)

                const dateDifferenceForNutritionizing = doc_plantourinfo.data().soil_frequency - days
                console.log(dateDifferenceForNutritionizing)
                

                // Set calendar value
                dateControlForNutritionizing.setAttribute('value', lastNutritionizingDateString)


                //  Click the button (Update last nutritionizing date)
                buttonNutritions.addEventListener('click', async() => {

                    if (buttonNutritions.classList.contains("update")) {
                        // If users change the date of calendar
                        console.log('you changed the date!')
                        // // Set calendar value
                        // dateControlForNutritionizing.setAttribute('value', lastNutritionizingDateString)
                        // Get calendar value
                        const calendarValueString = dateControlForNutritionizing.value
                        console.log(calendarValueString)
                        // Update a date manually
                        const doctoUpdate = doc(db, "plant_userinfo", doc_plantuserinfo.id)
                        const nutritionizingDatetoUpdate = doc_plantuserinfo.data().nutritionizing_date
                        await updateDoc(doctoUpdate, {nutritionizing_date: {
                            ...nutritionizingDatetoUpdate, [nutritionizingMap]: calendarValueString
                        }
                    

                        })
                        // Change the button from 'Updated' to 'Nutritionize today'
                        // buttonNutritions.innerHTML = 'Nutritionize today!'

                        // Button Condition
                        if ( dateDifferenceForNutritionizing > 0) {
                            console.log(dateDifferenceForNutritionizing + ' days to go')
                            buttonNutritions.innerHTML = dateDifferenceForNutritionizing + ' days to go'
                            buttonNutritions.disabled = true;
                        } else if ( dateDifferenceForNutritionizing == 0 ) {
                            console.log('Nutritionize today!')
                            buttonNutritions.innerHTML = 'Nutritionize today'
                        } else if ( dateDifferenceForNutritionizing < 0 ) {
                            console.log(-dateDifferenceForNutritionizing + ' days late')
                            buttonNutritions.innerHTML = -dateDifferenceForNutritionizing + ' days late'
                        }
                        // 'Do you want to register Watered today? みたいなポップアップ必要？

                    } else {
                        // Update a date to today
                        const doctoUpdate = doc(db, "plant_userinfo", doc_plantuserinfo.id)
                        const nutritionizingDatetoUpdate = doc_plantuserinfo.data().nutritionizing_date
                        await updateDoc(doctoUpdate, {nutritionizing_date: {
                            ...nutritionizingDatetoUpdate, [nutritionizingMap]: todayString
                        }
                        })
                        // Set calendar value to Today
                        dateControlForNutritionizing.setAttribute('value', todayString)
                        // 'Do you want to update last watering date? みたいなポップアップ必要？
                    }
                })


                // Button Condition
                if ( dateDifferenceForNutritionizing > 0) {
                    console.log(dateDifferenceForNutritionizing + ' days to go')
                    buttonNutritions.innerHTML = dateDifferenceForNutritionizing + ' days to go'
                    buttonNutritions.disabled = true;
                } else if ( dateDifferenceForNutritionizing == 0 ) {
                    console.log('Nutritionize today!')
                    buttonNutritions.innerHTML = 'Nutritionize today'
                } else if ( dateDifferenceForNutritionizing < 0 ) {
                    console.log(-dateDifferenceForNutritionizing + ' days late')
                    buttonNutritions.innerHTML = -dateDifferenceForNutritionizing + ' days late'
                }


                // Updated button
                dateControlForNutritionizing.addEventListener('change', () => {
                    buttonNutritions.innerHTML = 'Update'
                    buttonNutritions.setAttribute('class', 'update')
                    buttonNutritions.disabled = false;
                })




                // SUNLIGHT SECTION 🌸🌸======================================

                // Display Sunlight Frequency
                const sunlightFrequency = doc_plantourinfo.data().sunlight_frequency
                console.log(sunlightFrequency)
 
                if (document.querySelector(".sunlight-frequency")) {
                    document.querySelector(".sunlight-frequency").remove()
                }
 
                const divSunlight = document.createElement("div")
                divSunlight.classList.add('sunlight-frequency')
                sunlightTemp.appendChild(divSunlight)
                divSunlight.innerHTML = sunlightFrequency;






                // // watering
                // const waterFrequent = doc_plantourinfo.data().water_frequency

                // console.log(waterFrequent)

                // if (document.querySelector(".water-frequency")) {
                //     document.querySelector(".water-frequency").remove()
                // }

                // const divWater = document.createElement("div")
                // divWater.classList.add('water-frequency')
                
                // watering.appendChild(divWater)

                // divWater.innerHTML = waterFrequent;

                // // sunlight and temperature
                // const sunTemp = doc_plantourinfo.data().sunlight_temperature_frequency

                // // console.log(sunTemp)

                // if (document.querySelector(".suntemp-frequency")) {
                //     document.querySelector(".suntemp-frequency").remove()
                // }

                // const divSunTemp = document.createElement("div")
                // divSunTemp.classList.add('suntemp-frequency')
                
                // sunlightTemp.appendChild(divSunTemp)
                
                // divSunTemp.innerHTML = sunTemp;

                // // nutritions
                // const soilFrequent = doc_plantourinfo.data().soil_frequency

                // // console.log(soilFrequent)

                // if (document.querySelector(".soil-frequency")) {
                //     document.querySelector(".soil-frequency").remove()
                // }

                // const divSoil = document.createElement("div")
                // divSoil.classList.add('soil-frequency')
                
                // nutritions.appendChild(divSoil)
                // divSoil.innerHTML = soilFrequent;


                // // Waterd today button inside addEventlistener to image
                // if (document.querySelector(".watered-today")) {
                //     document.querySelector(".watered-today").remove()
                // }
        
                // const button = document.createElement('button')
                // button.classList.add('watered-today')
                // button.innerHTML = 'Watered today'
                // watering.appendChild(button)

                // button.addEventListener('click', async() => {
                //     // console.log(plantid)

                //     const currentDate = new Date().getTime()
                //     // console.log(currentDate)

                //     const doctoUpdate = doc(db, "plant_userinfo", doc_plantuserinfo.id);

                //     await updateDoc(doctoUpdate, {
                //         [`water_${plantid}`]: Timestamp.fromDate(new Date())
                //         });
                // })
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