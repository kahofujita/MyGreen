import { db, auth} from './firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";


export async function init () {
  console.log(" initializing about.js module:" + new Date());

const journalArray = [];
const personalArray = [];

let  yourId;
// --------
// const active = document.activeElement;
// le yourId; 

///特定の人のjournal InfoのみをP/Uしてくる

////Get Personal ID FROM LOGIN/////
let yourUserId = sessionStorage.getItem('userID');



///GET JOURNALS FROM DB /////
const journal = await getDocs(collection(db, "journal"));
let journalPost;
journal.forEach((doc) => {


//journal全部が入ったarray
 journalArray.push(doc.data()); 

});

///IDENTIFY WHO'S JOURNAL IS THIS　
for(let i = 0; journalArray.length > i; i++){
  
  if (journalArray[i].user_id == yourUserId){
         
          personalArray.push(journalArray[i]);
      }else{     
}

}


//GET USER NAME
const userName = document.getElementById('username');


let usernameArray = [];
const un = await getDocs(collection(db, "user_info"));

un.forEach((doc) => {


 usernameArray.push(doc.data());
});

console.log(usernameArray); 
let j = 0;
const username = usernameArray[j].avatar_img_name;
for(let j = 0; usernameArray.length > j; j++){

  if (usernameArray[j].user_id == yourUserId){ 
        userName.innerText = usernameArray[j].username;
  }else{
  };
}


//POST NUMBER //
const postNbr = document.getElementById("postNbr");
if (personalArray.length <= 1){
  postNbr.innerHTML = `${personalArray.length}Post`;
}else{
  postNbr.innerHTML = `${personalArray.length}Posts`;
}


let i = 0;
function Nbrs(){
  const Nbr = personalArray.indexOf(personalArray[i]);
}

//GET JOURNAL IDs
const jId = [];
const querySnapshot = await getDocs(collection(db, 'journal'));
querySnapshot.forEach((doc) => {
  jId.push(doc.id);  
})

    //COMMENT ======================================// 
// const comments = document.getElementById('comment');
   //// comment
  //  for (let i = 0; cmtArray.length > i; i++){

  //   if(yourId == cmtArray[i].journal_id){
  //     displayCmt();
  //   }else{

  //   }
  // }


  // //COMMENT ======================================// 
// const comments = document.getElementById('commenty');
// console.log(comments);
// //GET COMMENT DB
const cmtArray = [];

const cmt = await getDocs(collection(db, "comment"));
cmt.forEach((doc) => {

  cmtArray.push(doc.data());
});
console.log(cmtArray);


let instruction;
let cmt_display;
let commenty;
//DISPLAY ALL JOURNAL ////
for(let i = 0; personalArray.length > i; i++ ){
   
  const Nbr = personalArray.indexOf(personalArray[i]);


  const infoArea = document.getElementById("post");  
  const article = document.createElement("article");
  article.classList.add("journal");
  article.setAttribute('id', i );
  infoArea.appendChild(article);
     
       
  const click_tag = document.createElement("a");
  click_tag.href = "#single_page";
  click_tag.setAttribute('class', 'single');
  click_tag.setAttribute('id', jId[i]);
  article.appendChild(click_tag);
    
  const picture = document.createElement("img");
  picture.src = personalArray[i].picture_img_name;
  picture.innerText;
  click_tag.appendChild(picture);
  
  //Div for contents 
  const meta = document.createElement("div");
  meta.setAttribute('id', 'meta')
  //caption
  meta.innerHTML += `<p id="cap_title">Caption</p>`; 
  const cap = document.createElement("p");
  cap.setAttribute('class', 'cap');
  cap.innerText = personalArray[i].caption;
  meta.appendChild(cap);
   
      
  //date
  const date = document.createElement("p");
  date.setAttribute('id', 'dates');
  date.innerText = personalArray[i].journal_date;
  meta.appendChild(date);

  /////instruction
  meta.innerHTML += `<p id="inst_title">Care Instructions</p>`; 
  instruction = document.createElement("p");
  instruction.setAttribute('class', 'inst');
  instruction.innerText = personalArray[i].care_instruction;
  meta.appendChild(instruction);

  //３つをメタの中に入れる
  article.appendChild(meta);
      
  // Div for comment
  commenty = document.createElement("div");
  commenty.setAttribute('id', 'commenty');
  article.appendChild(commenty)
  //CREATE COMMENT SECTION
  commenty.innerHTML += `<p>Comments</p>`; 
  const r = click_tag.id;
  console.log(r);
  cmt_display = document.createElement("div");
  cmt_display.setAttribute('id', 'cmt_display');
  commenty.appendChild(cmt_display);
      
  // displayCmt();
  for (let i = 0; cmtArray.length > i; i++){

    if( r == cmtArray[i].journal_id){
      cmt_display.innerHTML += `<div class="cmts"><p>${cmtArray[i].username} :</p><p>${cmtArray[i].comment}</p></div>`;
    console.log(cmt_display);

    }else{
      console.log('No comment');
    }
  }
        
      
    const cmt_input = commenty.innerHTML += `<div id="input_area"><input type="text" id="write_cmt" placeholder ="Add a Comment"><button id="submiting" class="item">Post</button></div>`;
    
    }
  
   const hidePage = document.getElementById("result");

  
  // RESULT PAGE HIDE WHEN WHOLE PAGE OPEN//////
  const result_area = document.getElementById('result_area');
  result_area.style.display = "none";

  const backBtn = document.getElementById('btn');
  backBtn.style.display = "none";

  // console.log(instruction);
  

  const add_post_btn = document.getElementById('go-camera');
   
  
  ///MOVE TO SINGLE PAGE  EventListener /////
 
  const atag = document.getElementsByClassName('single'); 
 
  
  let z;
 let nikki;
  [...atag].forEach(single_page => {
    single_page.addEventListener('click', (e)=>{
     
      // console.log(single_page.parentElement);
     nikki = single_page.parentElement;
      
        //new class for css 
      const user_info_single = document.querySelector('.user-info');
      const main_single = document.querySelector('.personaljournal-main');
      const ava_single = document.getElementById('avatar');
      const username_single = document.getElementById('username');
      const img_single = nikki.querySelector('a');
      const c_single = nikki.querySelector('.cap');
      const d_single = nikki.querySelector('.inst');
      const comment_single = nikki.querySelector('#commenty');
      const result_area_single = document.querySelector('#result_area');
      const result_box_single = document.querySelector('.result_box');
      const hide_title = nikki.querySelector('#cap_title');
      const hide_titles = nikki.querySelector('#inst_title');
      const dates_single = nikki.querySelector('#dates');
      const meta_single = nikki.querySelector('#meta');
      // const result_single = document.querySelector('#result');

      
      user_info_single.classList.add('user-info-single');
      main_single.classList.add('personaljournalmain-single');
      ava_single.classList.add('ava_single');
      username_single.classList.add('username_single');
      img_single.classList.add('img_single');
      c_single.classList.add('cap_single');
      d_single.classList.add('inst_single');
      comment_single.classList.add('comment_single');
      result_area_single.classList.add('result_area_single');
      result_box_single.classList.add('result_box_single');
      hide_title.classList.add('captitle_single');
      hide_titles.classList.add('insttitle_single');
      dates_single.classList.add('dates_single');
      meta_single.classList.add('meta_single');
      // result_single.classList.add('result_single');
      // result_single.remove('div');
    
      const nikkis = nikki.innerHTML;
      // console.log(nikkis);
      // result.innerHTML = nikkis;
      result_box_single.innerHTML = nikkis;
    


      //The ID You Clicked NOW! = Journal ID
      const active = document.activeElement;
      yourId = active.id; 
     
      // console.log(yourId);
      
       console.log(nikki);
    //////CHANGE PAGE //////
    
    const g = document.getElementById('result_area');
    console.log(g);


    navigateToPage();
    })
    
  })

  // console.log(yourId);
  window.addEventListener("hashchange", navigateToPage);
  
  const pageId = document.getElementById("post");
  const allPages = document.querySelectorAll("div.page");
 
 
  const HnS = document.getElementsByClassName("inst");
  const inputArea = document.getElementById("input_area");
  

////NAVIGATE PAGE
  function navigateToPage(event) {
   
    pageId.style.display = "none";
    postNbr.style.display = "none";
    add_post_btn.style.display = "none";
    backBtn.style.display = "block";
    result_area.style.display = "block";
    inputArea.style.display = "block";


  console.log(inputArea);

    // console.log(pageId);
    
}

///BACK TO JOURNAL BUTTON
backBtn.addEventListener('click', (event)=>{
  result_area.style.display = "none";
  backBtn.style.display = "none";
  pageId.style.display = "block";
  postNbr.style.display = "block";

  add_post_btn.style.display = "block";
  
})

// // //COMMENT ======================================// 
// const comments = document.getElementById('commenty');
// console.log(comments);
// // //GET COMMENT DB
// const cmtArray = [];

// const cmt = await getDocs(collection(db, "comment"));
// cmt.forEach((doc) => {

//   cmtArray.push(doc.data());
// });
// console.log(cmtArray);



// //Display Comments & Username
function displayCmt(){
  
  const z = document.getElementById('cmt_display');
  console.log(z);
  // z.innerHTML += `<p>Comments</p>`; 
  // console.log(z);

  // for (let i = 0; cmtArray.length > i; i++){
    
  //   if(yourId == cmtArray[i].journal_id){
  //     z.innerHTML += `<div class="cmts"><p>${cmtArray[i].username}</p><p>${cmtArray[i].comment}<P></div>`;
  //   console.log(cmt_display);

  //   }else{

  //   }
  // }
 
  // const cmt_display = document.createElement("div");
  // cmt_display.setAttribute('class', 'cmt_display');
  // z.appendChild(cmt_display);
  // const cmt_display = document.getElementById("cmt_display");  
    // console.log(cmt_display);
    // z.innerHTML += `<div class="cmts"><p>${cmtArray[i].username}</p><p>${cmtArray[i].comment}<P></div>`;
    // console.log(cmt_display);

  };

  //ここで今開いてるJournalのIDとコメントアレーの中のJr IFが同じやつだけpickupして表示させる＊database に入れる！
  //COMMMET Journal_ id & this clicked Journal ID is same DISPLAY
  
  // const commenty = document.createElement("div");
  //     commenty.setAttribute('class', 'commenty');
  //     article.appendChild(commenty);

  ////Get USERNAME FROM LOGIN ID///// commentの記入者を特定
  let userId = sessionStorage.getItem('userID');
  // console.log(sessionStorage.getItem('userID'));

  const uns = doc(db, "user_info", userId);
  const uninfo =  await getDoc(uns);
  let yourname = uninfo.data().username;
  // console.log(yourname);

  //SUBMIT COMMENT ======================
// getCmtBtn();
const cmtarea =document.getElementById('write_cmt');
const submitBtn = document.getElementById('submiting');
// console.log(submitBtn);
submitBtn.addEventListener('click', (e) =>{

  
  //ADD COMMENT INTO DB
  const commentdb = collection(db, 'comment');
  addDoc(commentdb, {
      comment:cmtarea.value,
      user_info_id:userId,
      username:yourname,
      journal_id:yourId
  })
  console.log(cmt_display);

console.log(nikki);
  const display = nikki.querySelector('#cmt_display');
  console.log(display);
  display.innerHTML += `<div class="cmts"><p>${yourname} :</p><p>${cmtarea.value}</p></div>`;
  console.log(display);
  // cmtarea.innerHTML = "";

  })

//////////////////////////////////////////////////////////////////////////////////////////
    //COMMENT ======================================// 
// const comments = document.getElementById('comment');
   //// comment
//    for (let i = 0; cmtArray.length > i; i++){

//     if(yourId == cmtArray[i].journal_id){
//       displayCmt();
//     }else{

//     }
//   }

//     //Create Div for comments
//     displayCmt();

// //Display Comments & Username
// function displayCmt(){
//   const cmt_display = document.getElementsByClassName("commenty");  
  
//     cmt_display.innerHTML += `<div class="cmts"><p>${cmtArray[i].username}</p><p>${cmtArray[i].comment}<P></div>`;
// };
    
}