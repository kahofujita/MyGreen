// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
// import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getFirestore, collection, getDocs, query, onSnapshot } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiw7ZDS3pMMG8mk3cPa7C_Tlq7ZqBgbz4",
  authDomain: "mygreen-be569.firebaseapp.com",
  projectId: "mygreen-be569",
  storageBucket: "mygreen-be569.appspot.com",
  messagingSenderId: "251959047157",
  appId: "1:251959047157:web:b250edff8856a28a6ce6bc",
  measurementId: "G-2X66VZR13E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//init services
const db = getFirestore(app);

//collection Ref
const colRef = collection(db, 'plant_ourinfo');

//queries
const q = query(colRef);

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

// let now = new Date();
// console.log(dateToCompare)

let suggestions = []

const suggestionHandler = () => {
  let now = new Date();
  let dateToCompare = String(now.getMonth()) + String(now.getFullYear())
  console.log(suggestions.includes(dateToCompare), dateToCompare)
  if (suggestions.includes(dateToCompare)) {
    console.log(suggestions, 'in suggestions hast tarikhaii k click shode')
    result.innerHTML = 'we have no suggestion';
  } else {
    console.log('else run shode')
    suggestions = [...suggestions, dateToCompare]
    const index = Math.floor(Math.random() * plantOurinfo.length);
    console.log(index);
    let plantResult = `Our suggestion is ${plantOurinfo[index].plant_name} you should water the plant ${plantOurinfo[index].water_frequency} and change the soil ${plantOurinfo[index].soil_frequency}.`
    console.log(plantResult)
    return result.innerHTML = plantResult;

  }
  return
}

let button = document.querySelector('#button')
button.addEventListener('click', suggestionHandler)



// if (now.getDate() === 30) {
//   button.addEventListener('click', () => {

//     const index = Math.floor(Math.random() * plantOurinfo.length);
//     console.log(index);
//     let plantResult = `Our suggestion is ${plantOurinfo[index].plant_name} you should water the plant ${plantOurinfo[index].water_frequency} and change the soil ${plantOurinfo[index].soil_frequency}.`
//     return result.innerHTML = plantResult;

//   })
// }
// else {
//   button.addEventListener('click', () => {
//     console.log('we have no suggestion')
//     result.innerHTML = 'we have no suggestion';
//   })
// }


//Realtime collection
// getDocs(colref)
// .then((snapshot)=> {
//   let plantSuggest = [];
//   snapshot.docs.forEach((doc) => {
//     plantSuggest.push({...doc.data,id:doc.id})
//   })
//   console.log(plantSuggest);
// })







