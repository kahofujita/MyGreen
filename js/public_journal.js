import { db, auth} from './firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";



export async function init () {
  console.log(" initializing about.js module:" + new Date());

// USER ID GET
let userId = sessionStorage.getItem('userID');
 console.log(sessionStorage.getItem('userID'));

//Get JOURNAL DB
 const journalArray = [];
 
 const journal = await getDocs(collection(db, "journal"));
 let journalPost;
 journal.forEach((doc) => { 
   journalArray.push(doc.data());
   
 });
 console.log(journalArray);

//MONTH & YEAR//
const day = new Date();

let month_name = '';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const year = day.getFullYear();

month_name = months[day.getMonth()];

const date = document.getElementById("date");
date.innerHTML = `${month_name}, ${year}`;



// //POST NUMBER //
const postNbr = document.getElementById("postNbr");
console.log(journalArray.length);
if (journalArray.length <= 1){
  postNbr.innerText = `${journalArray.length}Post`;
}else{
  postNbr.innerText = `${journalArray.length}Posts`;
}

// //GET JOURNAL IDs
const jId = [];
const querySnapshot = await getDocs(collection(db, 'journal'));
querySnapshot.forEach((doc) => {
  jId.push(doc.id);  
})



//   // //COMMENT 
// // //GET COMMENTS FROM DB
const cmtArray = [];
const cmt = await getDocs(collection(db, "comment"));
cmt.forEach((doc) => {

  cmtArray.push(doc.data());
});


//  // ///GETUSER INFO FOR USER NAME

 const userArray = [];
 const uns = await getDocs(collection(db, "user_info"));
 uns.forEach((doc) => {
  userArray.push(doc.data());
 });

 console.log(userArray); 

//MY USERNAME FIND
 let myname;
for(let i = 0; i < userArray.length; i ++) {
  if(userArray[i].user_id == userId){
    console.log(userArray[i].username);
    myname = userArray[i].username;
  }else{

  }
}


let article;
let avat;


 


// //DISPLAY ALL JOURNAL
for(let i = 0; journalArray.length > i; i++ ){
   
  const Nbr = journalArray.indexOf(journalArray[i]);

  const infoArea = document.getElementById("post");          
  article = document.createElement("article");
  const divTag = article.classList.add("journal");
  article.setAttribute('id', i );
  infoArea.appendChild(article);
  

  // /ADDING AVATAR TO EACH JOURNALS 
  avat = document.createElement("img");
  avat.setAttribute('class', 'avatar');
  
  for(let index = 0; journalArray.length > index; index++ ){
  
  console.log(journalArray[i].user_id);
        console.log(userArray[index].user_id);  
      if(journalArray[i].user_id == userArray[index].user_id){
      
        const avanbr = userArray[index].avatar_img_name;
        const haha = avanbr.match(/(\d+)/)[0];
     
        
        avat.setAttribute('src', `./avatar/${haha}.png`);
        console.log(avat);
        avat.innerText;
        article.appendChild(avat);
    
      }else{
      }
    }
    
    


     const click_tag = document.createElement("a");  
    
      click_tag.href = "#single_page";
      const ok = click_tag.setAttribute('id', jId[i]);
      click_tag.setAttribute('class', 'single');
      article.appendChild(click_tag);
     
      
      const picture = document.createElement("img");
      picture.src = journalArray[i].picture_img_name;
      picture.innerText;
      click_tag.appendChild(picture);

     //DATE
      const date = document.createElement("p");
      date.setAttribute('class', 'dates');
      date.innerText = journalArray[i].journal_date;
      article.appendChild(date);

    }





    const hidePage = document.getElementById("result");

     // RESULT PAGE & BACK TO BUTTON HIDE WHEN WHOLE PAGE OPEN//////
    const result_area = document.getElementById('result_area');
    result_area.style.display = "none";

    const backBtn = document.getElementById('btn');
    backBtn.style.display = "none";

  
    let z;
    let nikki;
    let i;
    let journalId;
    ///MOVE TO SINGLE PAGE EVENTLISTENER/////
       
    const atag = document.getElementsByClassName('single'); 
   
    let b = [...atag].forEach(single_page => {
      single_page.addEventListener('click', (e)=>{

      
        const nikki = single_page.parentElement;  
        console.log(nikki);
        const nikkiId = nikki.id;
        console.log(nikkiId);
        const clickednikki = journalArray[nikkiId];
        console.log(journalArray[nikkiId]);
        console.log(clickednikki.user_id);
        console.log(userArray[0].username);

         // ///GET USERNAME OF THIS JOURNAL AND DISPLAY
         const username = document.getElementById('username_single');
         for(let i = 0; userArray.length >i ; i++){
           
          if (clickednikki.user_id == userArray[i].user_id){
            username.innerHTML = userArray[i].username; 
           }else{
           
           }
         }

          //GET AVATAR
          const single_ava = document.getElementById('single_ava');
          const srcs = nikki.children[0];
          const ad = srcs. getAttribute('src');
          single_ava.setAttribute('src', ad);
           //GET IMAGE
           const single_img = document.getElementById('single_img');
           single_img.src = clickednikki.picture_img_name;
           //GET CAPTION
           const cap_single = document.getElementById('cap_single');
           cap_single.innerHTML = clickednikki.caption;
           //GET DATE
           const dates_single = document.getElementById('dates_single');
           dates_single.innerHTML = clickednikki.journal_date;
           //GET INSTRUCTION
           const inst_single = document.getElementById('inst_single');
           inst_single.innerHTML = clickednikki.care_instruction;
           //GETEMOJI
           const emobox = document.getElementById('emobox');
           const emoArray = clickednikki.emoji;
           if(emoArray !== null){
                for(let i = 0; i < emoArray.length; i ++){
                 
                  const emoemo = document.createElement('img');
                  emoemo.setAttribute( 'src',`./emoji/${emoArray[i]}.svg`);
                  emobox.appendChild(emoemo);  
                 }   
              }else{
                console.log('no emoji');
              }
          
           //GET COEMMTNTS & DISPLAY COMMENTS & USERNAME
           console.log(single_page.id);
           journalId = single_page.id;
           for(let i = 0; i < cmtArray.length; i ++){
               if(single_page.id == cmtArray[i].journal_id ){
                 
                console.log(cmtArray[i].journal_id);

                const divs = document.createElement('div');
                divs.setAttribute('class','cmts');    
                cmt_display.appendChild(divs);
                
                const who_write =  document.createElement("p");
                who_write.innerText = cmtArray[i].username;
                divs.appendChild(who_write);
            
                const yourcmt =  document.createElement("p");
                yourcmt.innerText = cmtArray[i].comment;
                divs.appendChild(yourcmt);
              }else{
               console.log('no cmt');
              }
           
          
           }
           

         
         
         



      //////CHANGE PAGE //////     
      navigateToPage();

      });
    });  

    ///ADD NEW COMMENT INTO JOURNAL AND DB
    const write_cmt = document.querySelector('.write_cmt');
    const cmt_submit = document.querySelector('#cmt_submit');
    console.log(write_cmt);
    console.log(cmt_submit);

    cmt_submit.addEventListener('click', ()=>{
      //ADD COMMENT INTO DB
      const commentdb = collection(db, 'comment');
      addDoc(commentdb, {
          comment:write_cmt.value,
          user_info_id:userId,
          username:myname,
          journal_id:journalId
      })


      const display = document.getElementById("cmt_display");
     
      display.innerHTML += `<div class="cmts"><p>${myname} :</p><p>${write_cmt.value}</p></div>`;
      

    })
    

    ////NAVIGATE PAGE FUNCTION
    const post = document.getElementById("post");
    const who = document.getElementById("user-info");
    function navigateToPage(event) {
   
      post.style.display = "none";
      who.style.display = "none";
      result_area.style.display = "block";
      backBtn.style.display = "block";
    }
  
}
  
 



  



