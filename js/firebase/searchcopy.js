
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
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
//init services
const db = getFirestore(app);

//collection Ref
const colRef = collection(db, 'plant_ourinfo');
//variables
let wFreq;
let waterFreq = document.querySelector('#water-frequency');
waterFreq.addEventListener('input', (e) => { 
wFreq = e.target.value;

})

let sFreq;
let soilFreq = document.querySelector('#soil-frequency');
soilFreq.addEventListener('input', (e) => { 
sFreq = e.target.value;
})

let lFreq;
let lightFreq = document.querySelector('#sunlight-frequency');
lightFreq.addEventListener('input', (e) => { 
lFreq = e.target.value;
})


//queries
// const q = query(colRef, where("keyword.value", "==", "plant_name"));

async function getData(userInput) {
  const q1 = query(colRef, where("plant_name", "==", userInput));
  // const q2 = query(colRef, where("water_frequency", "==", wFreq));
  // const q3 = query(colRef, where("soil_frequency", "==", sFreq));
  // const q4 = query(colRef, where("light_frequency", "==", lFreq));

  const querySnapshot = await getDocs(q1);

  querySnapshot.forEach((doc) => {

    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}

let timer
const inputSearch = document.querySelector('#search-input')
inputSearch.addEventListener('input', (e) => {//try change it will search all of them , click button, keyup when you hit enter on the keyboard
  if (!timer) {
    timer = setTimeout(() => {
      getData(e.target.value);

    }, 500)
  } else {
    clearTimeout(timer);
    timer = setTimeout(() => {
      getData(e.target.value);
    }, 500)

  }
  
});











// //real time collection data
// let btn = document.querySelector('#submit-botton')
// btn.addEventListener('click', (e) => {
//   e.preventDefault();
// console.log('click shod');
//   onSnapshot(q, (snapshot)=>{
//     let plantInfo = [];
//     snapshot.docs.forEach((doc) => {
//       plantInfo.push({...doc.data,id:doc.id})
//     })
//     console.log(plantInfo);
//   })

//   colRef.orderBy("plant_name").equalTo("keyword.value").once("value", function(snapshot) {
//     console.log(snapshot.id);
//   });
// })























// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
// import { getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDiw7ZDS3pMMG8mk3cPa7C_Tlq7ZqBgbz4",
//   authDomain: "mygreen-be569.firebaseapp.com",
//   projectId: "mygreen-be569",
//   storageBucket: "mygreen-be569.appspot.com",
//   messagingSenderId: "251959047157",
//   appId: "1:251959047157:web:b250edff8856a28a6ce6bc",
//   measurementId: "G-2X66VZR13E"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);


// //collection Ref
// const colRef = collection(db, 'plant_ourinfo');



// import admin from 'firebase-admin';
// import FirestoreFullTextSearch from 'firestore-full-text-search';


// admin.initializeApp(firebaseConfig);
// const db = admin.firestore();

// // Specifies the collection in which to store the inverted index.
// const fullTextSearch = new FirestoreFullTextSearch(db.collection('index'));


// // Set documents
// const plantData: colRef = {
//     title: "What's Firestore Full-Text Search?",
//     content:
//     'Firestore Full-Text Search provides a Firestore-specific full-text search function. It runs on Cloud Functions and has excellent performance.',
//     created: admin.firestore.FieldValue.serverTimestamp(),
// };

// const docRef = postsRef.collection('Plant_ourinfo').doc('1');

// // WriteBatch is supported so that documents and search indexes can be stored atomically.
// const batch = db.batch();
// batch.set(docRef, plantData);
// await fullTextSearch.set('en', docRef, {batch, data: plantData});
// await batch.commit();

// // Search documents
// const results = await fullTextSearch.search('en', 'firestore');
