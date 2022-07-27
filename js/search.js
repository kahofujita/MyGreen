
// Import the functions you need from the SDKs you need
import { db, auth, onAuthStateChanged, collection, query, where, getDocs } from './firebase/firebase-config.js';

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
          // let link = window.location.protocol + "//" + window.location.host + `/plant-detail.html?name=${plant.plant_name.replace(/ /g, "%20")}`;
          let link = `?name=${plant.plant_name.replace(/ /g, "%20")}#plant-detail`
          document.querySelector('.result').innerHTML += `<li>${plant.plant_name}(${plant.location}).<a href="${link}">the details</a></li>`;
        }
      })

    }, 500)
  } else {
    clearTimeout(timer);
    timer = setTimeout(() => {
      plantOurinfo.map(plant => {
        if (reg(e.target.value, plant.plant_name)) {
          // let link = window.location.protocol + "//" + window.location.host + `/plant-detail.html?name=${plant.plant_name.replace(/ /g, "%20")}`;
          let link = `?name=${plant.plant_name.replace(/ /g, "%20")}#plant-detail`
          document.querySelector('.result').innerHTML += `<li>${plant.plant_name}(${plant.location}).<a href="${link}">the details</a></li>`;
         
       
console.log(link);

    
        
        }
      })
      
    }, 500)

    
  }
});

inputSearch.value = "";


