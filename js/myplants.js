import {db, auth} from './firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc, arrayUnion} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";


// const userId = sessionStorage.getItem('userID')
const userId = 'UbLI3ydleogKaaqnrWFHRUWtOWn2';
console.log(userId)

const watering = document.querySelector('.watering')
const sunlightTemp = document.querySelector('.sunlight-temp')
const nutritions = document.querySelector('.nutritions')
const dateControlForWatering = document.querySelector('.watering-calendar')
const dateControlForNutritionizing = document.querySelector('.nutritionizing-calendar')
const wateringWrapper = document.querySelector('.watering-wrapper')



const getPlantinfo = async () => {

// Query "plant_userinfo"
// const userQuery = query(collection(db, "plant_userinfo"), where("user_info_id", "==", userId))
const userQuery = doc(db, "plant_userinfo", userId)
const userQuerySnapshot = await getDoc(userQuery);
// console.log(userQuerySnapshot.data())
const {plantsList} = userQuerySnapshot.data()
console.log(plantsList)
plantsList.forEach( async(e, index)=>{
    const plantId = e.plant_id
    console.log(plantId)


        // Query "plant_ourinfo"
        const plantQuery = query(collection(db, "plant_ourinfo"), where("plant_id", "==", plantId))
        const plantQuerySnapshot = await getDocs(plantQuery);
        // console.log(plantQuerySnapshot)
        plantQuerySnapshot.forEach((doc_plantourinfo) => {

            console.log(doc_plantourinfo.data())

            // Display Plant Image
            const plantName = doc_plantourinfo.data().plant_name
            const div = document.createElement('div')
            // div.classList.add('swiper-slide')
            div.classList.add('plant-image')

            const img = document.createElement('img')
            img.setAttribute('id', 'myplant');
            img.src = `./images/plant_img/${plantName}.png`
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
                watering.appendChild(button)


                // Calculate dates
                // Get last watering date from firebase
                // const wateringMap = `plant_${plantId}`
                // console.log(wateringMap)
                const lastWateringDateString = e.watering_date
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

                // console.log(doc_plantourinfo.data().water_frequency)

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
                        const plantsListCopy = [...plantsList]
                        // const wateringDatetoUpdate = e.watering_date
                        // console.log(plantsListCopy, wateringDatetoUpdate)
                        plantsListCopy[index].watering_date = calendarValueString
                        const doctoUpdate = doc(db, "plant_userinfo", userId)
                        try {
                            await updateDoc(doctoUpdate, {plantsList : plantsListCopy})

                        } catch (error) {
                            console.log(error)
                        }
                        // Change the button from 'Updated' to 'Watered today'
                        // button.innerHTML = 'Watered today';
                        // button.disabled = true
                        // 'Do you want to register Watered today? みたいなポップアップ必要？

                        // Calculate the difference between two days
                        let day1 = new Date(calendarValueString);
                        let day2 = new Date(todayString);

                        let difference= Math.abs(day2-day1);
                        let days = parseInt(difference/(1000 * 3600 * 24))

                        const dateDifference = doc_plantourinfo.data().water_frequency - days

                        // Change the button value
                        // Button Condition
                        if ( dateDifference > 0) {
                            button.innerHTML = dateDifference + ' days to go'
                            button.disabled = true;
                        } else if ( dateDifference == 0 ) {
                            console.log('Water today!')
                            button.innerHTML = 'Water today!'

                            // このあと、watered today!が出たあとwatered todayのボタンが押せなくなるよ
                        } else if ( dateDifference < 0 ) {
                            console.log(-dateDifference + ' days late')
                            button.innerHTML = -dateDifference + ' days late'
                        }

                        button.classList.remove('update')
                        

                    } else {
                        // Update a date to today
                        const plantsListCopy = [...plantsList]
                        plantsListCopy[index].watering_date = todayString
                        const doctoUpdate = doc(db, "plant_userinfo", userId)
                        try {
                            await updateDoc(doctoUpdate, {plantsList : plantsListCopy})

                        } catch (error) {
                            console.log(error)
                        }

                        // Set calendar value to Today
                        dateControlForWatering.setAttribute('value', todayString)
                        // 'Do you want to update last watering date? みたいなポップアップ必要？

                        // Display Next Watering Date in Button Value
                        const nextWateringDate = doc_plantourinfo.data().water_frequency
   

                        // Change the button value
                        // Button Condition
                        button.innerHTML = nextWateringDate + ' days to go'
                        button.disabled = true;
                    }
                })


                // Button Condition
                if ( dateDifference > 0) {
                    console.log(dateDifference + ' days to go')
                    button.innerHTML = dateDifference + ' days to go'
                    button.disabled = true;
                } else if ( dateDifference == 0 ) {
                    console.log('Water today!')
                    button.innerHTML = 'Water today!'
                } else if ( dateDifference < 0 ) {
                    console.log(-dateDifference + ' days late')
                    button.innerHTML = -dateDifference + ' days late'
                }


                // Updated button
                dateControlForWatering.addEventListener('change', () => {
                    button.innerHTML = 'Update'
                    button.classList.add('update')
                    button.disabled = false;
                })









                // NUTRITIONS SECTION ✨✨======================================


                // Display Button
                const buttonNutritions = document.createElement('button')
                buttonNutritions.classList.add('nutritionize-today')
                buttonNutritions.innerHTML = 'Nutritionize today!'
                // buttonNutritions.id = `btn_${plantid}`
                nutritions.appendChild(buttonNutritions)


                // Calculate dates
                // Get last nutritionizing date from firebase
                // const nutritionizingMap = `plant_${plantid}`
                // console.log(nutritionizingMap)
                const lastNutritionizingDateString = e.nutritionizing_date
                console.log(lastNutritionizingDateString)



                // Calculate the difference between two days
                let day3 = new Date(lastNutritionizingDateString);
                let day4 = new Date(todayString);

                let differenceForNutritionizing = Math.abs(day4-day3);
                let daysForNutritionizing = parseInt(differenceForNutritionizing/(1000 * 3600 * 24))
                console.log(daysForNutritionizing)

                const dateDifferenceForNutritionizing = doc_plantourinfo.data().soil_frequency - daysForNutritionizing
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
                        const doctoUpdate = doc(db, "plant_userinfo", userId)
                        // const nutritionizingDatetoUpdate = doc_plantuserinfo.data().nutritionizing_date
                        // await updateDoc(doctoUpdate, {nutritionizing_date: {
                        //     ...nutritionizingDatetoUpdate, [nutritionizingMap]: calendarValueString
                        // }
                    
                        // })

                        const plantsListCopy = [...plantsList]
                        // const wateringDatetoUpdate = e.watering_date
                        // console.log(plantsListCopy, wateringDatetoUpdate)
                        plantsListCopy[index].nutritionizing_date = calendarValueString
                        try {
                            await updateDoc(doctoUpdate, {plantsList : plantsListCopy})

                        } catch (error) {
                            console.log(error)
                        }


                        // Change the button from 'Updated' to 'Nutritionize today'
                        // buttonNutritions.innerHTML = 'Nutritionize today!'

                        // Calculate the difference between two days
                        let day3 = new Date(calendarValueString);
                        let day4 = new Date(todayString);

                        let differenceForNutritionizing = Math.abs(day4-day3);
                        let daysForNutritionizing = parseInt(differenceForNutritionizing/(1000 * 3600 * 24))
                        console.log(daysForNutritionizing)

                        const dateDifferenceForNutritionizing = doc_plantourinfo.data().soil_frequency - daysForNutritionizing
                        console.log(dateDifferenceForNutritionizing)

                        // Button Condition
                        if ( dateDifferenceForNutritionizing > 0) {
                            buttonNutritions.innerHTML = dateDifferenceForNutritionizing + ' days to go'
                            buttonNutritions.disabled = true;
                        } else if ( dateDifferenceForNutritionizing == 0 ) {
                            buttonNutritions.innerHTML = 'Nutritionize today!'
                        } else if ( dateDifferenceForNutritionizing < 0 ) {
                            console.log(-dateDifferenceForNutritionizing + ' days late')
                            buttonNutritions.innerHTML = -dateDifferenceForNutritionizing + ' days late'
                        }
                        // 'Do you want to register Watered today? みたいなポップアップ必要？

                        // Delete class update
                        buttonNutritions.classList.remove('update')
                        

                    } else {
                        // Update a date to today

                        const plantsListCopy = [...plantsList]
                        plantsListCopy[index].nutritionizing_date = todayString
                        const doctoUpdate = doc(db, "plant_userinfo", userId)
                        try {
                            await updateDoc(doctoUpdate, {plantsList : plantsListCopy})

                        } catch (error) {
                            console.log(error)
                        }

                        // Set calendar value to Today
                        dateControlForNutritionizing.setAttribute('value', todayString)
                        // 'Do you want to update last watering date? みたいなポップアップ必要？

                        // Display Next Watering Date in Button Value
                        const nextNutritionizingDate = doc_plantourinfo.data().water_frequency

                        // Change the button value
                        // Button Condition
                        buttonNutritions.innerHTML = nextNutritionizingDate + ' days to go'
                        buttonNutritions.disabled = true;
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
                    buttonNutritions.classList.add('update')
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
                if (document.querySelector('.update')) {
                    document.querySelector('.update').remove()
                }
                    
                // Display Button
                const button = document.createElement('button')
                button.classList.add('watered-today')
                button.innerHTML = 'Watered today!'
                watering.appendChild(button)


                // Calculate dates
                // Get last watering date from firebase
 
                const lastWateringDateString = e.watering_date
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
                        const plantsListCopy = [...plantsList]

                        plantsListCopy[index].watering_date = calendarValueString
                        const doctoUpdate = doc(db, "plant_userinfo", userId)
                        try {
                            await updateDoc(doctoUpdate, {plantsList : plantsListCopy})

                        } catch (error) {
                            console.log(error)
                        }
                        // Change the button from 'Updated' to 'Watered today'
                        // button.innerHTML = 'Watered today';
                        // button.disabled = true
                        // 'Do you want to register Watered today? みたいなポップアップ必要？

                        // Calculate the difference between two days
                        let day1 = new Date(calendarValueString);
                        let day2 = new Date(todayString);

                        let difference= Math.abs(day2-day1);
                        let days = parseInt(difference/(1000 * 3600 * 24))

                        const dateDifference = doc_plantourinfo.data().water_frequency - days

                        // Change the button value
                        // Button Condition
                        if ( dateDifference > 0) {
                            button.innerHTML = dateDifference + ' days to go'
                            button.disabled = true;
                        } else if ( dateDifference == 0 ) {
                            console.log('Water today!')
                            button.innerHTML = 'Water today!'

                            // このあと、watered today!が出たあとwatered todayのボタンが押せなくなるよ
                        } else if ( dateDifference < 0 ) {
                            console.log(-dateDifference + ' days late')
                            button.innerHTML = -dateDifference + ' days late'
                        }

                        button.classList.remove('update')
                        

                    } else {
                        // Update a date to today
                        const plantsListCopy = [...plantsList]
                        plantsListCopy[index].watering_date = todayString
                        const doctoUpdate = doc(db, "plant_userinfo", userId)
                        try {
                            await updateDoc(doctoUpdate, {plantsList : plantsListCopy})

                        } catch (error) {
                            console.log(error)
                        }

                        // Set calendar value to Today
                        dateControlForWatering.setAttribute('value', todayString)
                        // 'Do you want to update last watering date? みたいなポップアップ必要？

                        // Display Next Watering Date in Button Value
                        const nextWateringDate = doc_plantourinfo.data().water_frequency
  

                        // Change the button value
                        // Button Condition
                        button.innerHTML = nextWateringDate + ' days to go'
                        button.disabled = true;
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
                    button.classList.add('update')
                    button.disabled = false;
                })




                // NUTRITIONS SECTION ✨✨======================================

                // Delete if a button already exists
                if (document.querySelector('.nutritionize-today')) {
                    document.querySelector('.nutritionize-today').remove()
                }
                if (document.querySelector('.update')) {
                    document.querySelector('.update').remove()
                }

                // Display Button
                const buttonNutritions = document.createElement('button')
                buttonNutritions.classList.add('nutritionize-today')
                buttonNutritions.innerHTML = 'Nutritionize today!'
                nutritions.appendChild(buttonNutritions)


                // Calculate dates
                // Get last nutritionizing date from firebase
                const lastNutritionizingDateString = e.nutritionizing_date
                console.log(lastNutritionizingDateString)



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
                        const doctoUpdate = doc(db, "plant_userinfo", userId)
                        const plantsListCopy = [...plantsList]
                        // const wateringDatetoUpdate = e.watering_date
                        // console.log(plantsListCopy, wateringDatetoUpdate)
                        plantsListCopy[index].nutritionizing_date = calendarValueString
                        try {
                            await updateDoc(doctoUpdate, {plantsList : plantsListCopy})

                        } catch (error) {
                            console.log(error)
                        }
                        // Change the button from 'Updated' to 'Nutritionize today'
                        // buttonNutritions.innerHTML = 'Nutritionize today!'

                        // Calculate the difference between two days
                        let day3 = new Date(calendarValueString);
                        let day4 = new Date(todayString);

                        let differenceForNutritionizing = Math.abs(day4-day3);
                        let daysForNutritionizing = parseInt(differenceForNutritionizing/(1000 * 3600 * 24))
                        console.log(daysForNutritionizing)

                        const dateDifferenceForNutritionizing = doc_plantourinfo.data().soil_frequency - daysForNutritionizing
                        console.log(dateDifferenceForNutritionizing)

                        // Button Condition
                        if ( dateDifferenceForNutritionizing > 0) {
                            buttonNutritions.innerHTML = dateDifferenceForNutritionizing + ' days to go'
                            buttonNutritions.disabled = true;
                        } else if ( dateDifferenceForNutritionizing == 0 ) {
                            buttonNutritions.innerHTML = 'Nutritionize today!'
                        } else if ( dateDifferenceForNutritionizing < 0 ) {
                            console.log(-dateDifferenceForNutritionizing + ' days late')
                            buttonNutritions.innerHTML = -dateDifferenceForNutritionizing + ' days late'
                        }
                        // 'Do you want to register Watered today? みたいなポップアップ必要？

                        buttonNutritions.classList.remove('update')
                        

                    } else {
                        // Update a date to today
                        const doctoUpdate = doc(db, "plant_userinfo", userId)
                        const plantsListCopy = [...plantsList]
                        // const wateringDatetoUpdate = e.watering_date
                        // console.log(plantsListCopy, wateringDatetoUpdate)
                        plantsListCopy[index].nutritionizing_date = todayString
                        try {
                            await updateDoc(doctoUpdate, {plantsList : plantsListCopy})

                        } catch (error) {
                            console.log(error)
                        }
                        // Set calendar value to Today
                        dateControlForNutritionizing.setAttribute('value', todayString)
                        // 'Do you want to update last watering date? みたいなポップアップ必要？

                        // Display Next Watering Date in Button Value
                        const nextNutritionizingDate = doc_plantourinfo.data().soil_frequency

                        // Change the button value
                        // Button Condition
                        buttonNutritions.innerHTML = nextNutritionizingDate + ' days to go'
                        buttonNutritions.disabled = true;
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
                    buttonNutritions.classList.add('update')
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


                wateringWrapper.style.opacity = 0;
                setTimeout(() => {
                    wateringWrapper.style.opacity = 1;
                }, 500);

            })
 
        })
        
    })


}

getPlantinfo()