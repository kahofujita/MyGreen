
// Import the functions you need from the SDKs you need
import { db, auth } from './js/firebase/firebase-config.js';
import { getFirestore, collection, query, where, getDocs, } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

//collection Ref
const colRef = collection(db, 'plant_ourinfo');

//get collection data
let plantOurinfo = [];
await getDocs(colRef)
  .then((snapshot) => {
    console.log(snapshot.docs);

    snapshot.docs.forEach((doc) => {
      plantOurinfo.push({ ...doc.data(), id: doc.id });
    })
    console.log(plantOurinfo);
  })
  .catch(err => {
    console.log(err.message);
  })


let reg = (input, text) => {
  let flags = 'gi';
  let regString = new RegExp(input, flags)
  // console.log(regString)
  const result = regString.test(text)
  // console.log(result)
  return result
}

let timer
const inputSearch = document.querySelector('#search-input')
inputSearch.addEventListener('input', (e) => {//try change it will search all of them , click button, keyup when you hit enter on the keyboard
  if (!timer) {
    timer = setTimeout(() => {
      plantOurinfo.map(plant => {
        if (reg(e.target.value, plant.plant_name)) {
          document.querySelector('.result').innerHTML = `The name is ${plant.plant_name} and the water frequency is ${plcy} the soil frequency is ${plant.soil_frequency}`;
          console.log(plant);
        }
      })

    }, 500)
  } else {
    clearTimeout(timer);
    timer = setTimeout(() => {
      plantOurinfo.map(plant => {
        if (reg(e.target.value, plant.plant_name)) {
          document.querySelector('.result').innerHTML = `The name is ${plant.plant_name} and the water frequency is ${plant.water_frequency} the soil frequency is ${plant.soil_frequency}`;
          console.log(plant);
        
        }
      })
    }, 500)

  }

});




