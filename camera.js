import {app, db, auth} from './js/firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
class Note {
    #date;

    constructor( date, caption, journal, imageURL) {

        this.date = date;
        this.caption = caption;
        this.journal = journal;
        this.imageURL = imageURL;
    }

    get date() {
      return this.#date;
    } 

    set date( date) {
        const now = new Date();
        console.log(now);
        if (new Date(date) <= now) {
            this.#date = date;
        } else {
            console.error("invalid Date is provided: "+date);
        }
    }

    toString() {
        return `Date: ${this.date}, 
                Caption: ${this.caption}, 
                journal: ${this.journal},  
                Image URL: ${this.imageURL}`;
    }

}

////Get Personal ID /////
let userId = sessionStorage.getItem('userID');
console.log(sessionStorage.getItem('userID'));




////SUBMIT //////
const form1 = document.getElementById("form1");

form1.addEventListener("submit", function (event) {
    event.preventDefault();
    const dateInput = form1.querySelector("#date");
    const captionInput = form1.querySelector("#caption");
    const journalInput = form1.querySelector("#journal");
    const imageInput = form1.querySelector("#image");


    const note = new Note( dateInput.value, captionInput.value,
                            journalInput.value, imageInput.value );
    console.info(note.toString());   

    const back = document.getElementById("back");
    back.innerHTML = renderDogAsHTML(note);

    
    //ADD DATA into Firebase
    
    const colUserInfo = collection(db, 'journal');
    addDoc(colUserInfo, {
      journal_date:form1.date.value,  
            caption:form1.caption.value,
            care_instruction:form1.journal.value,
            picture_img_name: form1.image.value,

            user_id:userId
            
    })

})



//ADD DATA into Firebase
// Add a new document with a generated id.
// const res = await db.collection('journal').add({
//   journal_date:form1.date.value,  
//         caption:form1.caption.value,
//         care_instruction:form1.journal.value,
//         picture_img_name: form1.image.value
// });

// console.log('Added document with ID: ', res.id);




function renderDogAsHTML( note ) {
    if ((!note instanceof Note)) { 
        return "<div>Not a Valid Dog Object</div>";
    }
    let htmlBlock = `<div>
            <p>Date: ${note.date} </p>        
            <p>Caption: ${note.caption} </p>
            <p>journal: ${note.journal} </p>
            </div>
            <hr>`;
            console.log(htmlBlock);
  
    if (note.imageURL){
        htmlBlock += `<div><img src="${note.imageURL}" width="400" ></div>`;
    } else {
        htmlBlock += `<div>No Image Provided</div>`;
    }
    return htmlBlock;
}

///Change page  ////////
const allPages = document.querySelectorAll("div.page");
navigateToPage();

function navigateToPage(event) {
    const pageId = location.hash? location.hash : '#profile';
    for(let page of allPages) {
        if (pageId === '#'+page.id) {
            page.style.display = "block";
        } else {
            page.style.display = "none";
        }
    }
    return;
}

///camera system camera on & snap    /////////

window.addEventListener("hashchange", navigateToPage);


const video = document.getElementById('video');


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.scale(0.5, 0.5);



document.getElementById("start").addEventListener("click", function () {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  
    navigator.mediaDevices.getUserMedia({ video: true }).then( (stream) => {
      
      video.srcObject = stream;
     
    });
  } else {
    console.log("media devices not available in this browser");
  }

});

////Change camera front & back

  // const videos = document.querySelector("#camera");
  // let useFront = true;     // フロントカメラ:true, バックカメラ:false


  // document.querySelector("#btn-toggle").addEventListener("click", ()=>{
  //   syncCamera(videos, useFront);
  //   useFront = !useFront;      // boolean値を反転
  // });

  // function syncCamera(videos, is_front=true){
  //   // 前後カメラの設定
  //   let facingMode = null;
  // facingMode = (is_front)?  "user":{ exact: "environment" };
  // }

//////SNAP PICTURE////////
document.getElementById("snap").addEventListener("click",  () => {
  
  context.drawImage(video, 0, 0,);
  const imageBlob = canvas.toBlob(handleBlob, 'image/jpeg');
  
  //stop camera automatically
  const tracks = video.srcObject.getTracks();
  tracks.forEach(track => track.stop());

});

// document.getElementById("stop").addEventListener("click",  ()=> {
//   const tracks = video.srcObject.getTracks();
//   tracks.forEach(track => track.stop());
// });



// Get a reference to the storage service, which is used to create references in your storage bucket
// const storage = getStorage();

// // // Create a storage reference from our storage service
// const storageRef = ref(storage, 'journal');

//     // 'file' comes from the Blob or File API
// uploadBytes(storageRef, file).then((snapshot) => {
//   console.log('Uploaded a blob or file!');
// });

// ///////



function handleBlob(blob) {
   
    const objectURL = window.URL.createObjectURL(blob);


    const reader = new FileReader();
    reader.addEventListener('load', () => {
      console.log(reader.result);
    
      document.getElementById("image").value = reader.result;
    });
    reader.readAsDataURL(blob); 
   
  }


//   document.getElementById("menu_toggle").addEventListener("click", menuToggler);

//   function menuToggler() {
//     document.getElementById("menu").classList.toggle("show_menu");
// }

// (async () => {
//   try {

//     const userRef = await db.collection('journal').doc('wjJ0hWsTUcl8gspsqRcM')
//     await userRef.set({
//       picture_img_name:'image'.value,

//     })

//   }
// }