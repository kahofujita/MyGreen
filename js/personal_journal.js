import { db, auth} from './firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";


export async function init () {
  console.log(" initializing about.js module:" + new Date());
  
  ////GET PERSONAL ID FROM LOGIN/////
  let yourUserId = sessionStorage.getItem('userID');
  
  
  // ///GET JOURNALS FROM DB /////
  const journalArray = [];
  
  const journal = await getDocs(collection(db, "journal"));
    let journalPost;
    journal.forEach((doc) => {
    
    journalArray.push(doc.data()); 
    
  });
  
  // ///IDENTIFY WHO'S JOURNAL IS THIS & GET YOUR JOURNAL ONLY
  const personalArray = [];
  
  for(let i = 0; journalArray.length > i; i++){
    
    if (journalArray[i].user_id == yourUserId){
           
            personalArray.push(journalArray[i]);
        }else{     
  }
  
  }
  
  
  // //GET USER NAME & AVATAR & DISPLAY
  const userName = document.getElementById('username');
  const avatag = document.getElementById('avatar');
  
  let userArray = [];
  const un = await getDocs(collection(db, "user_info"));
  un.forEach((doc) => {
    userArray.push(doc.data());
  });
  
  
  let j = 0;
  let myname;
  let ans;
  for(let j = 0; userArray.length > j; j++){
  
    if (userArray[j].user_id == yourUserId){ 
          userName.innerText = userArray[j].username;
          myname = userArray[j].username;
          const an = userArray[j].avatar_img_name;
          ans = an.match(/(\d+)/)[0];
          avatag.setAttribute('src', `./avatar/${ans}.png`);
    }else{
    };
  }
  
  // //POST NUMBER //
  const postNbr = document.getElementById("postNbr");
  if (personalArray.length <= 1){
    postNbr.innerHTML = `${personalArray.length}Post`;
  }else{
    postNbr.innerHTML = `${personalArray.length}Posts`;
  }
  let  yourId;
  
  
   //GET JOURNAL IDs
  const jId = [];
  const querySnapshot = await getDocs(collection(db, 'journal'));
  querySnapshot.forEach((doc) => {
    jId.push(doc.id);  
  })
  
  
  
  // ///GET COMMENT FROM DB
  const cmtArray = [];
  
  const cmt = await getDocs(collection(db, "comment"));
  
  cmt.forEach((doc) => {
  
  cmtArray.push(doc.data());
  });
  
  
  let article;
  let avat;
  //DISPLAY ALL JOURNAL
  for(let i = 0; personalArray.length > i; i++ ){
     
    const Nbr = personalArray.indexOf(personalArray[i]);
    
  
    const infoArea = document.getElementById("post");          
    article = document.createElement("article");
    const divTag = article.classList.add("journal");
    article.setAttribute('id', i );
    infoArea.appendChild(article);
    
  
      const click_tag = document.createElement("a");  
    
       click_tag.href = "#single_page";
       const ok = click_tag.setAttribute('id', jId[i]);
       click_tag.setAttribute('class', 'single');
       article.appendChild(click_tag);
      
       
       const picture = document.createElement("img");
       picture.src = personalArray[i].picture_img_name;
       picture.innerText;
       click_tag.appendChild(picture);
      //DATE
       const date = document.createElement("p");
       date.setAttribute('class', 'dates');
       date.innerText = personalArray[i].journal_date;
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
      // console.log(atag);
      [...atag].forEach(single_page => {
        single_page.addEventListener('click', (e)=>{
        
          const nikki = single_page.parentElement;  
          const nikkiId = nikki.id;
          const clickednikki = personalArray[nikkiId];
        
          console.log(personalArray[nikkiId]);
          
          console.log(clickednikki.user_id);
          console.log(userArray[0].username);
        
          
    //AVATAR      
    const ava_single = document.getElementById('ava_single');
    ava_single.setAttribute('src',`./avatar/${ans}.png`);
    // console.log(ans);
    //GET IMAGE
    const single_img = document.getElementById('single_img');
    single_img.src = clickednikki.picture_img_name;
    //USERNAME
    const username_single = document.getElementById('username_single');
    username_single.innerHTML = myname;
        
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
    const addClass = document.querySelector('.personaljournal-main');
       console.log(addClass);
       addClass.classList.add('personaljournal-main-single');
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
        user_info_id:yourUserId,
        username:myname,
        journal_id:journalId
    })
  
  
    const display = document.getElementById("cmt_display");
  
    display.innerHTML += `<div class="cmts"><p>${myname}</p><p>${write_cmt.value}</p></div>`;
  
  
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
  
  // ///BACK TO JOURNAL BUTTON
  backBtn.addEventListener('click', (event)=>{
    result_area.style.display = "none";
    backBtn.style.display = "none";
    pageId.style.display = "block";
    postNbr.style.display = "block";
    add_post_btn.style.display = "block";
    
  })
  
  

}