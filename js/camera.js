import {db, auth} from './firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

export async function init () {
  console.log(" initializing about.js module:" + new Date());

class Note {
    #date;

    constructor( imageURL,caption,date , journal, ) {
        
        this.imageURL = imageURL;
        this.caption = caption;
        this.date = date;
        this.journal = journal;
        
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
            // alart("You can not input feature date");
        }
    }

    toString() {
        return ` Image URL: ${this.imageURL},
                Caption: ${this.caption},
                Date: ${this.date},  
                journal: ${this.journal},`;
    }

}

////Get Personal ID /////
let userId = sessionStorage.getItem('userID');
console.log(sessionStorage.getItem('userID'));

//GET USER NAME & AVATAR
const userName = document.getElementById('username');
const ava = document.getElementById('avatar');


let usernameArray = [];
const un = await getDocs(collection(db, "user_info"));

un.forEach((doc) => {
 usernameArray.push(doc.data());
});

console.log(usernameArray); 
let j = 0;
// const username = usernameArray[j].avatar_img_name;
for(let j = 0; usernameArray.length > j; j++){

  if (usernameArray[j].user_id == userId){ 
        userName.innerText = usernameArray[j].username;
        const avaNbr = usernameArray[j].avatar_img_name;
        const ans = avaNbr.match(/(\d+)/)[0];
        console.log(ans);
        ava.setAttribute('src', `./avatar/${ans}.png`);
  }else{
  };
}

////CHANGE PAGE AND HIDE & SEEK
//HIDE RESULT PICTURE
const imageSelected = document.getElementById("imageSelected");
imageSelected.style.display = "none";

const picture = document.getElementById('picture');
console.log(picture);
picture.style.display = "none";

const items = document.querySelector('.items');
console.log(items);

///MOVE TO CAMERA PAGE
items.addEventListener('click', ()=>{
  const card = document.getElementById('card');
  card.style.display = "none";
  const picture = document.getElementById('picture');
  picture.style.display = "block";

})

//BACK TO JOURNAL PAGE
const item = document.querySelector('.item');
console.log(item);
item.addEventListener('click', ()=>{
  const card = document.getElementById('card');
  card.style.display = "grid";
  const picture = document.getElementById('picture');
  picture.style.display = "none";
  imageSelected.style.display = "block";
  console.log(imageSelected);

  const imgicon = document.querySelector('.imgicon');
  const plztag = document.querySelector('.plztag');
  const items = document.querySelector('.items');
  // imgicon.style.display = "none";
  plztag.innerHTML = "Picture is successfully uploaded! ";
  items.style.display = "none";


  // const pic_area = document.querySelector('.pic_area');
  // console.log(pic_area);
  // pic_area.style.display = "none";
  

})

const docRef = doc(db, "journal", "Um2tjbRjsK917w1tjSYJ");

const docSnap = await getDoc(docRef);


///EMOJI
const emo = document.getElementsByClassName('clickhere');
console.log(emo);
const emojiArray = [];
const emoarray = emo.length;
let yaho;
for (let i = 0; i < emoarray; i++ ){
emo[i].addEventListener('click', (e) => {
                  const emoselect = emo[i];
                  const emoNbr = emoselect.id;
                  console.log(emoNbr); 
                  emojiArray.push(emoNbr);
                  console.log(emojiArray);

                  const rst = document.getElementById('emoji_result');
                  console.log(rst);
                  const emodiv = document.createElement('img');
                  emodiv.setAttribute ( 'src',`./emoji/${emoNbr}.svg`);
                  rst.appendChild(emodiv);

})
                  
}

////SUBMIT //////
const form1 = document.getElementById("form1");
// imageSelected =form1.querySelector("#imageSelected");

form1.addEventListener("submit", function (event) {
    event.preventDefault();
    const dateInput = form1.querySelector("#date");
    const captionInput = form1.querySelector("#caption");
    const journalInput = form1.querySelector("#journal");
    const imageInput = form1.querySelector("#image");
    

    const note = new Note( imageInput.value, captionInput.value, dateInput.value,
                            journalInput.value  );
    console.info(note.toString());   

    const back = document.getElementById("back");
    back.innerHTML = renderDogAsHTML(note);

    const card = document.getElementById("card");
    card.style.display = "none";

    
    
    
    
    ///Emoji Display
    const emospace = document.getElementById('emospace');
     for(let i = 0; i < emojiArray.length; i ++){
      const emoemo = document.createElement('img');
      emoemo.setAttribute( 'src',`./emoji/${emojiArray[i]}.svg`);
    
      
      emospace.appendChild(emoemo);
      console.log(emospace);
    }
    //ADD DATA into Firebase
    
    const colUserInfo = collection(db, 'journal');
    addDoc(colUserInfo, {
            picture_img_name: form1.image.value,
            caption:form1.caption.value,
            journal_date:form1.date.value,  
            care_instruction:form1.journal.value,
            user_id:userId,
            emoji:emojiArray      
    })
})

function renderDogAsHTML( note ) {
    if ((!note instanceof Note)) { 
        return "<div>Not a Valid Dog Object</div>";
    }
    let htmlBlock = `<div class="results">
            <p class="titles">Caption</p>
            <p>${note.caption} </p>
            <p class="dates">${note.date} </p>        
            <p class="titles">Care Instructions</p>
            <p>${note.journal} </p>
            <p>Emoji</p>
            <div id="emospace"></div>
            </div>`;
            console.log(htmlBlock);
  
    if (note.imageURL){
        htmlBlock += `<div id="final-img"><img src="${note.imageURL}" width="400" ></div>`;
    } else {
        htmlBlock += `<div>No Image Provided</div>`;
    }
    return htmlBlock;
     
    
   
}

///Change page  ////////
const allPages = document.querySelectorAll("div.page");
// navigateToPage();

// function navigateToPage(event) {
//     const pageId = location.hash? location.hash : '#profile';
//     for(let page of allPages) {
//         if (pageId === '#'+page.id) {
//             page.style.display = "block";
//         } else {
//             page.style.display = "none";
//         }
//     }
//     return;
// }

///camera system camera on & snap    /////////

// window.addEventListener("hashchange", navigateToPage);



const video = document.getElementById('video');


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.scale(0.5, 0.5);
// context.scale(1, 1);



document.getElementById("start").addEventListener("click", function () {
  
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  
    navigator.mediaDevices.getUserMedia({ video: true }).then( (stream) => {
      
      video.srcObject = stream;
     
    });
  } else {
    console.log("media devices not available in this browser");
  }
  videoFlame.style.display = "block";
});




const videoFlame = document.getElementById("video");
const cameraOnBtn = document.getElementById("start");

//////SNAP PICTURE////////
document.getElementById("snap").addEventListener("click",  () => {
  
  context.drawImage(video, 0, 0,);
  const imageBlob = canvas.toBlob(handleBlob, 'image/jpeg');
  
  //stop camera automatically
  const tracks = video.srcObject.getTracks();
  tracks.forEach(track => track.stop());

  videoFlame.style.display = "none";
  cameraOnBtn.innerText = "Snap Again";

});


function handleBlob(blob) {
   
    const objectURL = window.URL.createObjectURL(blob);


    const reader = new FileReader();
    reader.addEventListener('load', () => {
      console.log(reader.result);
    
      document.getElementById("image").value = reader.result;
      imageSelected.src=reader.result;
    });
    reader.readAsDataURL(blob); 
   
  }

}