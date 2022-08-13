import {db, auth} from './firebase/firebase-config.js';

import {collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc, arrayUnion} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

class MyCarousel {
    constructor(parent, slide) {
        this.parent = document.querySelector(parent)
        this.slide = document.querySelector(slide)
    }
    toNext(){
        this.parent.scrollLeft += this.slide.clientWidth ;
    }

    toPrev(){
        this.parent.scrollLeft -= this.slide.clientWidth ;
    }
}

export function init () {
    console.log(" initializing about.js module:" + new Date());
   
    
    const userId = sessionStorage.getItem('userID')
    console.log(userId)
    
    
    const watering = document.querySelector('.watering')
    const sunlightTemp = document.querySelector('.sunlight-temp')
    const nutritions = document.querySelector('.nutritions')
    const dateControlForWatering = document.querySelector('.watering-calendar')
    const dateControlForNutritionizing = document.querySelector('.nutritionizing-calendar')
    const wateringWrapper = document.querySelector('.watering-wrapper')
    const buttonHover = 'button:hover{background-color: unset;}'

    const slideContainer = document.querySelector('.slide-container')
    const nextBtn = document.querySelector('.button-right')
    const prevBtn = document.querySelector('.button-left')
    const buttonImage = document.querySelector('.button-link')

    



    
    const getPlantinfo = async () => {
        

// Query "plant_userinfo"

const userQuery = doc(db, "plant_userinfo", userId)
const userQuerySnapshot = await getDoc(userQuery);

const {plantsList} = userQuerySnapshot.data()
if(plantsList.length <= 4){
    nextBtn.classList.add('btnDisabled')
    prevBtn.classList.add('btnDisabled')
}

console.log(plantsList)
plantsList.forEach( async(e, index)=>{
    const plantId = e.plant_id
    console.log(plantId)

    // Display nickname
    if ( index == 0) {
    const nickname = e.nickname
    console.log(nickname)

    const span = document.createElement('span')
    span.classList.add('nickname')
    span.innerHTML = ` for ${nickname}`

    const plantSchedule = document.querySelector('.plant-schedule')
    plantSchedule.appendChild(span)

    }

        // Query "plant_ourinfo"
        const plantQuery = query(collection(db, "plant_ourinfo"), where("plant_id", "==", plantId))
        const plantQuerySnapshot = await getDocs(plantQuery);
        // console.log(plantQuerySnapshot)
        plantQuerySnapshot.forEach((doc_plantourinfo) => {

            console.log(doc_plantourinfo.data())
            console.log(doc_plantourinfo.id)

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

            slideContainer.appendChild(img)

            buttonImage.style.order = plantsList.length


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


                // WATERING SECTION ======================================
                    
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

                        } else if ( dateDifference < 0 ) {
                            console.log(-dateDifference + ' days late')
                            button.innerHTML = -dateDifference + ' days late'
                        }

                        button.classList.remove('update')
                        

                    } else {
                        // Update a date to today
                        console.log('elseが走ってる！', todayString)
                        const plantsListCopy = [...plantsList]
                        plantsListCopy[index].watering_date = todayString
                        const doctoUpdate = doc(db, "plant_userinfo", userId)
                        try {
                            await updateDoc(doctoUpdate, {plantsList : plantsListCopy})

                        } catch (error) {
                            console.log(error)
                        }

                        // Set calendar value to Today
                        dateControlForWatering.value = todayString
                        console.log(dateControlForWatering.value)

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


            const myCarousel = new MyCarousel('.slide-container', '#myplant')
        
            nextBtn.addEventListener('click', ()=>{
                myCarousel.toNext()
            })

            prevBtn.addEventListener('click', ()=>{
                myCarousel.toPrev()
            })






                // NUTRITIONS SECTION ======================================


                // Display Button
                const buttonNutritions = document.createElement('button')
                buttonNutritions.classList.add('nutritionize-today')
                buttonNutritions.innerHTML = 'Nutritionize today!'
                // buttonNutritions.id = `btn_${plantid}`
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

                        // Get calendar value
                        const calendarValueString = dateControlForNutritionizing.value
                        console.log(calendarValueString)
                        // Update a date manually
                        const doctoUpdate = doc(db, "plant_userinfo", userId)


                        const plantsListCopy = [...plantsList]

                        plantsListCopy[index].nutritionizing_date = calendarValueString
                        try {
                            await updateDoc(doctoUpdate, {plantsList : plantsListCopy})

                        } catch (error) {
                            console.log(error)
                        }


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




                // SUNLIGHT SECTION ======================================

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

                // Add Plant image border
                const greenBorder = document.querySelector('.green-border')

                if ( greenBorder ) {
                    console.log('ボーダーあり！')
                    greenBorder.classList.remove('green-border')
                } 
                img.classList.add('green-border')

                // Display nickname
                if (document.querySelector(".nickname")) {
                    document.querySelector(".nickname").remove()
                }
                const nickname = e.nickname
                console.log(nickname)

                const span = document.createElement('span')
                span.classList.add('nickname')
                span.innerHTML = ` for ${nickname}`

                const plantSchedule = document.querySelector('.plant-schedule')
                plantSchedule.appendChild(span)


                // WATERING SECTION ======================================

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




                // NUTRITIONS SECTION ======================================

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
                        // Get calendar value
                        const calendarValueString = dateControlForNutritionizing.value
                        console.log(calendarValueString)
                        // Update a date manually
                        const doctoUpdate = doc(db, "plant_userinfo", userId)
                        const plantsListCopy = [...plantsList]

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


                        buttonNutritions.classList.remove('update')
                        

                    } else {
                        // Update a date to today
                        const doctoUpdate = doc(db, "plant_userinfo", userId)
                        const plantsListCopy = [...plantsList]
  
                        plantsListCopy[index].nutritionizing_date = todayString
                        try {
                            await updateDoc(doctoUpdate, {plantsList : plantsListCopy})

                        } catch (error) {
                            console.log(error)
                        }
                        // Set calendar value to Today
                        dateControlForNutritionizing.setAttribute('value', todayString)


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




                // SUNLIGHT SECTION ======================================

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


            })
 
        })
        
    })


}

getPlantinfo()

}
