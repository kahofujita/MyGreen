
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
console.log(yourUserId);
///GET JOURNALS FROM DB /////
const journal = await getDocs(collection(db, "journal"));
let journalPost;
journal.forEach((doc) => {
//  let myId = doc.data().user_id;
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
console.log(personalArray);
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
console.log(jId);
let instruction;
//DISPLAY ALL JOURNAL ////
for(let i = 0; personalArray.length > i; i++ ){
  const Nbr = personalArray.indexOf(personalArray[i]);
      const infoArea = document.getElementById("post");
      const article = document.createElement("div");
      const divTag = article.classList.add("journal");
      const divClass = article.setAttribute('id', i );
      infoArea.appendChild(article);
      const click_tag = document.createElement("a");
    click_tag.href = "#single_page";
    console.log(click_tag);
    const aaa = click_tag.setAttribute('class', 'single');
    const ok = click_tag.setAttribute('id', jId[i]);
      article.appendChild(click_tag);
      const picture = document.createElement("img");
      const pictures = click_tag.setAttribute('class', 'single');
      picture.src = personalArray[i].picture_img_name;
      picture.innerText;
    click_tag.appendChild(picture);
      const cap = document.createElement("p");
      cap.innerText = personalArray[i].caption;
      article.appendChild(cap);
      const date = document.createElement("p");
      date.innerText = personalArray[i].journal_date;
      article.appendChild(date);
      instruction = document.createElement("p");
      instruction.setAttribute('class', 'inst');
      instruction.innerText = personalArray[i].care_instruction;
      article.appendChild(instruction);
    console.log(instruction);
    // instruction.style.display = "none";
    }
    const Nbr = personalArray.indexOf(personalArray[i]);
    console.log(Nbr);
   const hidePage = document.getElementById("result");
  // RESULT PAGE HIDE WHEN WHOLE PAGE OPEN//////
  const resultPage = document.getElementById('result');
  resultPage.style.display = "none";
  const comment = document.getElementById('comment');
  comment.style.display = "none";
  const backBtn = document.getElementById('btn');
  backBtn.style.display = "none";
  const add_post_btn = document.getElementById('go-camera');
    ///MOVE TO SINGLE PAGE  EventListener /////
  console.log(result);
  const atag = document.getElementsByClassName('single');
  console.log(atag);
  [...atag].forEach(single_page => {
    single_page.addEventListener('click', (e)=>{
      result.innerText = ' hello';
      console.log(single_page.parentElement);
      const nikki = single_page.parentElement;
      const nikkis = nikki.innerHTML;
      result.innerHTML = nikkis;
      //The ID You Clicked NOW! = Journal ID
      const active = document.activeElement;
      yourId = active.id;
      console.log(yourId);
    //////CHANGE PAGE //////
    navigateToPage();
    displayCmt();
    for (let i = 0; cmtArray.length > i; i++){
      if(yourId == cmtArray[i].journal_id){
        displayCmt();
      }else{
      }
    }
    })
  })
  console.log(yourId);
  window.addEventListener("hashchange", navigateToPage);
  const pageId = document.getElementById("post");
  const allPages = document.querySelectorAll("div.page");
  // const single_img = document.querySelectorAll('img');
  const HnS = document.getElementsByClassName("inst");
     console.log(HnS);
  console.log(allPages);
  function navigateToPage(event) {
    pageId.style.display = "none";
    resultPage.style.display = "block";
    backBtn.style.display = "block";
    postNbr.style.display = "none";
    comment.style.display = "block";
    add_post_btn.style.display = "none";
    // instruction.style.display = "block";
    console.log(pageId);
}
backBtn.addEventListener('click', (event)=>{
  resultPage.style.display = "none";
  backBtn.style.display = "none";
  pageId.style.display = "block";
  postNbr.style.display = "block";
  comment.style.display = "none";
  add_post_btn.style.display = "block";
  instruction.style.display = "none";
})
//COMMENT ======================================//
const comments = document.getElementById('comment');
//GET COMMENT DB
const cmtArray = [];
const cmt = await getDocs(collection(db, "comment"));
cmt.forEach((doc) => {
  cmtArray.push(doc.data());
});
console.log(cmtArray);
//Display Comments & Username
function displayCmt(){
  const cmt_display = document.getElementById("cmt_display");
    cmt_display.innerHTML += `<div class="cmts"><p>${cmtArray[i].username}</p><p>${cmtArray[i].comment}<P></div>`;
};
  //ここで今開いてるJournalのIDとコメントアレーの中のJr IFが同じやつだけpickupして表示させる＊database に入れる！
  //COMMMET Journal_ id & this clicked Journal ID is same DISPLAY
  ////Get USERNAME FROM LOGIN ID///// commentの記入者を特定
  let userId = sessionStorage.getItem('userID');
  console.log(sessionStorage.getItem('userID'));
  const uns = doc(db, "user_info", userId);
  const uninfo =  await getDoc(uns);
  let yourname = uninfo.data().username;
  console.log(yourname);
  //SUBMIT COMMENT ======================
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
  cmt_display.innerHTML += `<div class="cmts"><p>${yourname} :</p><p>${cmtarea.value}<P></div>`;
  cmtarea.innerHTML = "";
  })


}
