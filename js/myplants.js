
import {app, db} from './firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc, Timestamp} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

// import {waterFunc, sunTempFunc, nutriFunc} from './weekly-schedule.js';



const userId = 10;

const watering = document.querySelector('.watering')

const getPlantinfo = async () => {


// Get plant ID info
const userQuery = query(collection(db, "plant_userinfo"), where("user_info_id", "==", userId))

const userQuerySnapshot = await getDocs(userQuery);
userQuerySnapshot.forEach((plantuserinfo) => {
    // console.log(e.data().plant_id)

    const plantIds = plantuserinfo.data().plant_id

    const date = new Date(plantuserinfo.data().water_1*1000)

    console.log(date);

    plantIds.forEach( async(plantid, index) => {
    
        const plantQuery = query(collection(db, "plant_ourinfo"), where("plant_id", "==", plantid))

        console.log(plantid)


    

        // document.getElementById('watered-today').addEventListener('click', () => {
        //     console.log('you click me!')

        //     if (document.querySelector("div")) {
        //         document.querySelector("div").remove()
        //     }

        //     createElement('div')
        //     div.innerHTML = "....";
        // })




        
    
        const plantQuerySnapshot = await getDocs(plantQuery);
        plantQuerySnapshot.forEach((plantourinfo) => {

            // Display plant image
            const plantName = plantourinfo.data().plant_name
        
            const div = document.createElement('div')
            // div.classList.add('swiper-slide')
            div.classList.add('plant-image')

            const img = document.createElement('img')

            img.setAttribute('id', 'myplant');
            
            img.src = `./plant_img/${plantName}.jpg`
            img.alt = plantName
            
            div.appendChild(img)

            const myplantWrapper = document.querySelector('.myplant-wrapper')

            myplantWrapper.appendChild(div)

            console.log(plantName)


            // Weekly schedule
            
                console.log(index)

                if ( index == 0) {
                    console.log('0きてるよ！')
                    
                    const button = document.createElement('button')
                    button.classList.add('watered-today')
                
                    button.innerHTML = 'Watered today'
                    button.addEventListener('click', async() => {
                        console.log(plantid)

                        const currentDate = new Date().getTime()
                        console.log(currentDate)



                        const doctoUpdate = doc(db, "plant_userinfo", plantuserinfo.id);

                        await updateDoc(doctoUpdate, {
                            [`water_${plantid}`]: Timestamp.fromDate(new Date())
                        });


                    })
                
                    watering.appendChild(button)
                    
                }
            




            // Click plant image
            img.addEventListener('click', () => {
                console.log(index)

                // watering
                const waterFrequent = plantourinfo.data().water_frequency

                console.log(waterFrequent)

                if (document.querySelector(".water-frequency")) {
                    document.querySelector(".water-frequency").remove()
                }

                const divWater = document.createElement("div")
                divWater.classList.add('water-frequency')
                
                // const watering = document.querySelector('.watering')
                watering.appendChild(divWater)

                divWater.innerHTML = waterFrequent;

                // sunlight and temperature
                const sunTemp = plantourinfo.data().sunlight_temperature_frequency

                console.log(sunTemp)

                if (document.querySelector(".suntemp-frequency")) {
                    document.querySelector(".suntemp-frequency").remove()
                }

                const divSunTemp = document.createElement("div")
                divSunTemp.classList.add('suntemp-frequency')
                
                const sunlightTemp = document.querySelector('.sunlight-temp')
                sunlightTemp.appendChild(divSunTemp)
                
                divSunTemp.innerHTML = sunTemp;

                // nutritions
                const soilFrequent = plantourinfo.data().soil_frequency

                console.log(soilFrequent)

                if (document.querySelector(".soil-frequency")) {
                    document.querySelector(".soil-frequency").remove()
                }

                const divSoil = document.createElement("div")
                divSoil.classList.add('soil-frequency')
                
                const nutritions = document.querySelector('.nutritions')
                nutritions.appendChild(divSoil)
                
                divSoil.innerHTML = soilFrequent;


                // Waterd today
                if (document.querySelector(".watered-today")) {
                    document.querySelector(".watered-today").remove()
                }
        
                const button = document.createElement('button')
                button.classList.add('watered-today')
                
                button.innerHTML = 'Watered today'
                button.addEventListener('click', async() => {
                    console.log(plantid)

                    const currentDate = new Date().getTime()
                    console.log(currentDate)



                    const doctoUpdate = doc(db, "plant_userinfo", plantuserinfo.id);

                    await updateDoc(doctoUpdate, {
                        [`water_${plantid}`]: Timestamp.fromDate(new Date())
                        });
                })


                
                watering.appendChild(button)

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