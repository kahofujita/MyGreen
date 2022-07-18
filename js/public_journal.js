import { db, auth} from './firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

// import avatars from 'avatar';

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
 
//GET COMMENT DB　（今まだ使わない）
// const commenting = await getDocs(collection(db, "comment"));
// let CM = commenting.forEach((doc) => {
  
//   console.log(doc.data());

//   journalPost = doc.data()
//   console.log(orderBy="$journal_id")
// });

//MONTH & YEAR//
const day = new Date();

let month_name = '';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const year = day.getFullYear();
// const month = currentDate.getMonth() + 1;
month_name = months[day.getMonth()];

const date = document.getElementById("date");
date.innerHTML = `${month_name}. ${year}`;
console.log(year);



//POST NUMBER //
const postNbr = document.getElementById("postNbr");
console.log(journalArray.length);
if (journalArray.length <= 1){
  postNbr.innerText = `${journalArray.length}Post`;
}else{
  postNbr.innerText = `${journalArray.length}Posts`;
}



let i = 0;
function Nbrs(){
  const Nbr = journalArray.indexOf(journalArray[i]);
}

//GET JOURNAL IDs
const jId = [];
const querySnapshot = await getDocs(collection(db, 'journal'));
querySnapshot.forEach((doc) => {
  jId.push(doc.id);  
})
console.log(jId);

  // const idtag = article.setAttribute('id', doc.id);
//OnClick action for Journal ID

// let fd = 
// function reply_click(clicked_id)
// {
//     aconsole.log(clicked_id);
// }
// let ac = function addComment(this.id){
//   lconsole.log(clicked_id);
// } 

//DISPLAY ALL JOURNAL
for(let i = 0; journalArray.length > i; i++ ){
   
  const Nbr = journalArray.indexOf(journalArray[i]);

  
      const infoArea = document.getElementById("post");          
      const article = document.createElement("div");
      const divTag = article.classList.add("journal");
      
      
      // const divClass = article.setAttribute('id', jId[i] );
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
       click_tag.setAttribute('class', 'article');
    //  click_tag.setAttribute("onClick", 'reply_click(this.id)');
      article.appendChild(click_tag);
     
      
      const picture = document.createElement("img");
      picture.src = journalArray[i].picture_img_name;
      picture.innerText;
      click_tag.appendChild(picture);
     
      

      const cap = document.createElement("caption");
      cap.innerText = journalArray[i].caption;
      article.appendChild(cap);


      const date = document.createElement("p");
      date.innerText = journalArray[i].journal_date;
      article.appendChild(date);
  
      const instruction = document.createElement("p");
      instruction.innerText = journalArray[i].care_instruction;
      article.appendChild(instruction);
    
    
    }
 
   const hidePage = document.getElementById("result");

    // RESULT PAGE HIDE WHEN WHOLE PAGE OPEN//////
    const resultPage = document.getElementById('result');
    resultPage.style.display = "none";

    const comment = document.getElementById('comment');
    comment.style.display = "none";  

    const backBtn = document.getElementById('btn');
    backBtn.style.display = "none";



    ///Move to Single Page EventListener /////
    console.log(result);
    const atag = document.getElementsByClassName('article'); 
    console.log(atag);
    let b = [...atag].forEach(single_page => {
    single_page.addEventListener('click', (e)=>{
      
      console.log(single_page.parentElement);
      const nikki = single_page.parentElement;
      const nikkis = nikki.innerHTML;
 
    result.innerHTML = nikkis;

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
  
  console.log(pageId);
  
  function navigateToPage(event) {
   
    pageId.style.display = "none";
    resultPage.style.display = "block";
    comment.style.display = "block";
    backBtn.style.display = "block";
    // console.log(pageId);
    
}
  backBtn.addEventListener('click', (event)=>{
  resultPage.style.display = "none";
  comment.style.display = "none";
  backBtn.style.display = "none";
  pageId.style.display = "block";

})

//COMMENT ======================================// 
const comments = document.getElementById('comment');

//GET COMMENT in DB
const cmtArray = [];

const cmt = await getDocs(collection(db, "comment"));
cmt.forEach((doc) => {

  

  cmtArray.push(doc.data());
});
console.log(cmtArray);

//CHECK IF THIS COMMENT IS FOR THIS ARTICLE
// for(let i = 0; cmtArray.length > 0; i ++){
//   if(cmtArray[i].journal_No == );
// }


//Display Comments & Username
function displayCmt(){
  const cmt_display = document.getElementById("cmt_display");  
  
    const who_write =  document.createElement("p");
    who_write.innerText = cmtArray[i].username;
    cmt_display.appendChild(who_write);

    const yourcmt =  document.createElement("p");
    yourcmt.innerText = cmtArray[i].comment;
    cmt_display.appendChild(yourcmt);
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
// const submit_btn =document.querySelector('.items');

// getCmtBtn();
const cmtarea =document.getElementById('write_cmt');
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

//ADD NEW COMMENT INTO COMMENT FIELD
displayCmt();
cmtarea.innerHTML = "";

})
  
 



  


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
