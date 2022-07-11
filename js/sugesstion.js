


// Import the functions you need from the SDKs you need
import { db, auth } from './js/firebase/firebase-config.js';
import { collection, getDocs, query, onSnapshot, where } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

//collection Ref
const colRef = collection(db, 'plant_ourinfo');
const userRef = collection(db, 'user_info');


const userId = sessionStorage.getItem('userID');

//queries
const userQuery = query(userRef, where('user_info_id','==', userId));

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

   //compare the month and date to avoid show new suggestion in same month
   let suggestions = [];

   const suggestionHandler = () => {
     let now = new Date();
     let dateToCompare = String(now.getMonth()) + String(now.getFullYear())
     console.log(suggestions.includes(dateToCompare), dateToCompare)
     if (suggestions.includes(dateToCompare) && q) {
       // console.log(suggestions, 'the suggestions')
       result.innerHTML = 'we have no suggestion';
     } else {
       console.log('else run shode')
       suggestions = [...suggestions, dateToCompare]
       suggestions.push();
       const index = Math.floor(Math.random() * plantOurinfo.length);
       console.log(index);
       let plantResult = `Our suggestion is ${plantOurinfo[index].plant_name} you should water the plant ${plantOurinfo[index].water_frequency} and change the soil ${plantOurinfo[index].soil_frequency}.`
       console.log(plantResult)
       return result.innerHTML = plantResult;
   
     }
     return
   }

// const getUserinfo = async () => {
//  //
//   const userQuerySnapshot = await getDocs(userQuery);
//   userQuerySnapshot.forEach((doc) => {

//     suggestionHandler();
//   })

//   userQuerySnapshot();

import { getAuth, onAuthStateChanged } from "firebase/auth";


onAuthStateChanged(auth, (userQuery) => {
  if (userQuery) {
    // User is signed in
    const uid = user.uid;
    console.log(uid);
   
  } else {
    // User is signed out
  
  }
});