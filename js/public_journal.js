import { db, auth} from './firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

// import avatars from 'avatar';

export async function init () {
  console.log(" initializing about.js module:" + new Date());


const journalArray = [];
//Get JOURNAL DB
const journal = await getDocs(collection(db, "journal"));
let journalPost;
journal.forEach((doc) => { 
  journalArray.push(doc.data());
 
  // =======
  // journalArray.push(doc.data().caption);
  // console.log(doc)
 
});
 
//MONTH & YEAR//
const day = new Date();

let month_name = '';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const year = day.getFullYear();
// const month = currentDate.getMonth() + 1;
month_name = months[day.getMonth()];

const date = document.getElementById("date");
date.innerHTML = `${month_name}, ${year}`;
console.log(year);



//POST NUMBER //
const postNbr = document.getElementById("postNbr");
console.log(journalArray.length);
if (journalArray.length <= 1){
  postNbr.innerText = `${journalArray.length}Post`;
}else{
  postNbr.innerText = `${journalArray.length}Posts`;
}



// let i = 0;
// function Nbrs(){
//   const Nbr = journalArray.indexOf(journalArray[i]);
// }

//GET JOURNAL IDs
const jId = [];
const querySnapshot = await getDocs(collection(db, 'journal'));
querySnapshot.forEach((doc) => {
  jId.push(doc.id);  
})
console.log(jId);


  // //COMMENT ======================================// 
// //GET COMMENTS FROM DB
const cmtArray = [];

const cmt = await getDocs(collection(db, "comment"));
cmt.forEach((doc) => {

  cmtArray.push(doc.data());
});
console.log(cmtArray);




let instruction;
let cmt_display;
let commenty;
// let span1;
// let span2;
// let span3;
//DISPLAY ALL JOURNAL
for(let i = 0; journalArray.length > i; i++ ){
   
  const Nbr = journalArray.indexOf(journalArray[i]);

  
      const infoArea = document.getElementById("post");          
      const article = document.createElement("article");
      const divTag = article.classList.add("journal");
      article.setAttribute('id', i );
      infoArea.appendChild(article);
     
      // /ADDING AVATAR TO EACH JOURNAL ここがうまくいかないsrcが生成されない
      const avat = document.createElement("img");
      avat.setAttribute('id', 'avatar');
      // avatars (avat) ;
      console.log(avat);
      avat.innerText;
      article.appendChild(avat);
      

      // const click_tag = `<a href="#single_page" class = "article"  id = "${jId[i]}" onclick = "addComment(this.id)"></a>`;
    
    const click_tag = document.createElement("a");  
    
      click_tag.href = "#single_page";
      const ok = click_tag.setAttribute('id', jId[i]);
      click_tag.setAttribute('class', 'single');
      article.appendChild(click_tag);
     
      
      const picture = document.createElement("img");
      picture.src = journalArray[i].picture_img_name;
      picture.innerText;
      click_tag.appendChild(picture);
     
       //Div for contents 
       const meta = document.createElement("div");
       meta.setAttribute('id', 'meta');

       //CAPTION
       meta.innerHTML += `<p id="cap_title">Caption</p>`; 
      const cap = document.createElement("p");
      cap.setAttribute('class', 'cap');
      cap.innerText = journalArray[i].caption;
      meta.appendChild(cap);

      //DATE
      const date = document.createElement("p");
      date.setAttribute('id', 'dates');
      date.innerText = journalArray[i].journal_date;
      meta.appendChild(date);

      //Span tag for border
      const span1 = document.createElement("span");
      meta.appendChild(span1);

      //INSTRUCTION
     meta.innerHTML += `<p id="inst_title">Care Instructions</p>`; 
      const instruction = document.createElement("p");
      instruction.setAttribute('class', 'inst');
      instruction.innerText = journalArray[i].care_instruction;
      meta.appendChild(instruction);

       //Span tag for border
       const span2 = document.createElement("span");
       meta.appendChild(span2);
       
       //３つをメタの中に入れる
       article.appendChild(meta);

       // Div for comment
       commenty = document.createElement("div");
       commenty.setAttribute('id', 'commenty');
       article.appendChild(commenty);
 
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
       //Span tag for border
       const span3 = document.createElement("span");
       commenty.appendChild(span3);
      
        const cmt_input = commenty.innerHTML += `<div id="input_area"><input type="text" id="write_cmt" placeholder ="Add a Comment"><button id="submiting" class="item">Post</button></div>`;
         


    }
 
   const hidePage = document.getElementById("result");

    // RESULT PAGE HIDE WHEN WHOLE PAGE OPEN//////
    const result_area = document.getElementById('result_area');
    result_area.style.display = "none";

    // const comment = document.getElementById('comment');
    // comment.style.display = "none";  

    const backBtn = document.getElementById('btn');
    backBtn.style.display = "none";

    let z;
 let nikki;

    ///Move to Single Page EventListener /////
   
    const atag = document.getElementsByClassName('single'); 
    console.log(atag);
    let b = [...atag].forEach(single_page => {
    single_page.addEventListener('click', (e)=>{
      
     
      const nikki = single_page.parentElement;
      
         //new class for css 
         const user_info_single = document.querySelector('.user-info');
         const main_single = document.querySelector('.publicjournal_main');
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
        //  const spanTags = document.getElementsByTagName('span');
                  
         // const result_single = document.querySelector('#result');
   
         
         user_info_single.classList.add('user-info-single');
         main_single.classList.add('publicjournal_main-single');
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
        //  span1.classList.add('tag_single');
         console.log(hide_title);
         // result_single.classList.add('result_single');
         // result_single.remove('div');
      
      
      const nikkis = nikki.innerHTML;
 
      result_box_single.innerHTML = nikkis;

    //The ID You Clicked NOW! = Journal ID
      const active = document.activeElement;
     const yourId = active.id; 
      console.log(yourId);
      // console.log(active.id);
 
      //////CHANGE PAGE //////     
      navigateToPage();
  
    })
  })
  let yourId;
  console.log(yourId);
  // function getCmtBtn(){
  //   const submit_btn =document.querySelector('.items');
  // console.log(submit_btn);
  // }
  
  // const input_area = document.getElementById('input_area');
  // input_area.innerHTML = `<input type="text" id="write_cmt" placeholder="add a comment"><button id="submit" class="items" >Post</button>`; 
  
  

  // const active = document.getElementById(b);
  // console.log(active);

  window.addEventListener("hashchange", navigateToPage);
  
  const pageId = document.getElementById("post");
  const allPages = document.querySelectorAll("div.page");
  
  const HnS = document.getElementsByClassName("inst");
  const inputArea = document.getElementById("input_area");
  const spans = document.querySelectorAll("span");
  
  ////NAVIGATE PAGE
  function navigateToPage(event) {
   
    pageId.style.display = "none";
    result_area.style.display = "block";
    // commenty.style.display = "block";
    backBtn.style.display = "block";
    
    // console.log(pageId);
    
}
  backBtn.addEventListener('click', (event)=>{
  result_area.style.display = "none";
  // comment.style.display = "none";
  backBtn.style.display = "none";
  pageId.style.display = "block";

})

//COMMENT ======================================// 
// const comments = document.getElementById('comment');

// //GET COMMENT in DB
// const cmtArray = [];

// const cmt = await getDocs(collection(db, "comment"));
// cmt.forEach((doc) => {

  

//   cmtArray.push(doc.data());
// });
// console.log(cmtArray);

//CHECK IF THIS COMMENT IS FOR THIS ARTICLE
// for(let i = 0; cmtArray.length > 0; i ++){
//   if(cmtArray[i].journal_No == );
// }


//Display Comments & Username
function displayCmt(){
  const z = document.getElementById("cmt_display");  
  
    // const who_write =  document.createElement("p");
    // who_write.innerText = cmtArray[i].username;
    // cmt_display.appendChild(who_write);

    // const yourcmt =  document.createElement("p");
    // yourcmt.innerText = cmtArray[i].comment;
    // cmt_display.appendChild(yourcmt);
};

  
  
  
  for (let i = 0; cmtArray.length > i; i++){

    if(yourId == cmtArray[i].journal_id){
      displayCmt();
    }else{

    }
    // const cmt_display = document.getElementById("cmt_display");  
  
    // const who_write =  document.createElement("p");
    // who_write.innerText = cmtArray[i].username;
    // cmt_display.appendChild(who_write);

    // const yourcmt =  document.createElement("p");
    // yourcmt.innerText = cmtArray[i].comment;
    // cmt_display.appendChild(yourcmt);

    // displayCmt();
  }






////Get USERNAME FROM LOGIN ID///// commentの記入者を特定
let userId = sessionStorage.getItem('userID');
console.log(sessionStorage.getItem('userID'));

const un = doc(db, "user_info", userId);
const uninfo =  await getDoc(un);
let yourname = uninfo.data().username;
console.log(yourname);




//SUBMIT COMMENT ======================


// getCmtBtn();
const cmtarea = document.getElementById('write_cmt');
const submitBtn = document.getElementById('submiting');
console.log(submitBtn);
submitBtn.addEventListener('click', (e) =>{


  //ADD COMMENT INTO DB
  const commentdb = collection(db, 'comment');
  addDoc(commentdb, {
      comment:cmtarea.value,
      user_info_id:userId,
      username:yourname,
      journal_id:yourId
  })

// //ADD NEW COMMENT INTO COMMENT FIELD
// displayCmt();
// cmtarea.innerHTML = "";
console.log(nikki);
  const display = nikki.querySelector('#cmt_display');
  console.log(display);
  display.innerHTML += `<div class="cmts"><p>${yourname} :</p><p>${cmtarea.value}</p></div>`;
  console.log(display);
  // cmtarea.innerHTML = "";

})


}
  
 



  


// const click_tag = document.createElement("a");

//     click_tag.href = "#single_page";
//     console.log(click_tag);
//     const aaa = click_tag.setAttribute('class', 'single');
//     // const imgTag = click_tag.setAttribute('id', i );
//     const imgTag = click_tag.setAttribute('id', 'oya' );





//how to get document 
// const docRef = doc(db, "journal", "Um2tjbRjsK917w1tjSYJ");

// const docSnap = await getDoc(docRef);
// console.log(docSnap.data().caption);



// Multiple Hover treatment

