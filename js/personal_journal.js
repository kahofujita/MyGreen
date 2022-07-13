import { db, auth} from './firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

const journalArray = [];
const personalArray = [];

///特定の人のjournal InfoのみをP/Uしてくる

////Get Personal ID FROM LOGIN/////
let yourUserId = sessionStorage.getItem('userID');
console.log(yourUserId);


///GET JOURNAL INFO FROM DB /////
const journal = await getDocs(collection(db, "journal"));
let journalPost;
journal.forEach((doc) => {
//  let myId = doc.data().user_id;

//全部が入ったarray
 journalArray.push(doc.data()); 

});

///docの中のid とloginしたid　が同じだったら 　
for(let i = 0; journalArray.length > i; i++){
  
  if (journalArray[i].user_id == yourUserId){
         
          personalArray.push(journalArray[i]);
      }else{
        
}

}

console.log(personalArray);

///アバターとusernameがGetできていない//
//db.collectionを使うと 一列目でエラーが出る
//GET AVATAR AND USERNAME //

// const avaname = (user_id,document)=>{
//   const ava = collection(db,user_id);
//   return getDocs(ava,document);
// }


// const ava = query(collection( db,"user_info".username ));
// const avaname = await getDocs(ava);
// avaname.forEach((doc) => {
//       console.log(doc.data().username);
// })


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

//DISPLAY WHOLE JOURNAL ////
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
   
    const imgTag = click_tag.setAttribute('id', 'oya' );

   
      article.appendChild(click_tag);
    
      const picture = document.createElement("img");
      
    
      
      picture.src = personalArray[i].picture_img_name;
      picture.innerText;
    click_tag.appendChild(picture);
      


      const cap = document.createElement("caption");
      cap.innerText = personalArray[i].caption;
      article.appendChild(cap);


      const date = document.createElement("p");
      date.innerText = personalArray[i].journal_date;
      article.appendChild(date);
  
      const instruction = document.createElement("p");
      instruction.innerText = personalArray[i].care_instruction;
      article.appendChild(instruction);
    
    
    }
    
    
    
   
    const Nbr = personalArray.indexOf(personalArray[i]);
    console.log(Nbr);
  
   const hidePage = document.getElementById("result");

  
  // RESULT PAGE HIDE WHEN WHOLE PAGE OPEN//////
  const resultPage = document.getElementById('result');
  resultPage.style.display = "none";

  const backBtn = document.getElementById('btn');
  backBtn.style.display = "none";



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

   //////CHANGE PAGE //////
    
    navigateToPage();
    
    })
  })

  window.addEventListener("hashchange", navigateToPage);
  
  const pageId = document.getElementById("post");
  const allPages = document.querySelectorAll("div.page");
  
  console.log(allPages);
  
  function navigateToPage(event) {
   
    pageId.style.display = "none";
    resultPage.style.display = "block";
    backBtn.style.display = "block";
    console.log(pageId);
    
}
backBtn.addEventListener('click', (event)=>{
  resultPage.style.display = "none";
  backBtn.style.display = "none";
  pageId.style.display = "block";

})