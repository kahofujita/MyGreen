import {app, db} from './js/firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";




//GET USER DB avatar and username(今は使わない)
// const getUserInfo = await getDocs(collection(db, "user_info"));
// getUserInfo.forEach((doc) => {
  
//   console.log(doc.data());
// });
const journalArray = [];
//Get JOURNAL DB
const journal = await getDocs(collection(db, "journal"));
let journalPost;
journal.forEach((doc) => {
  
  // const journalPost = doc.data()
  journalArray.push(doc.data());
  // console.log(journalPost);


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



console.log(journalArray);
let i = 0;
function Nbrs(){
  const Nbr = journalArray.indexOf(journalArray[i]);
}
// console.log(journalArray[i].caption);

// const Nbr = journalArray.indexOf(journalArray[i]);
//Display each Journal
for(let i = 0; journalArray.length > i; i++ ){
   
  const Nbr = journalArray.indexOf(journalArray[i]);


      const infoArea = document.getElementById("post");          
      const article = document.createElement("div");
      const divTag = article.classList.add("journal");
      const divClass = article.setAttribute('id', i );
      infoArea.appendChild(article);
     
      


      // }
      const click_tag = document.createElement("a");
      // const Nbr = journalArray.indexOf(journalArray[i]);
    //  const imgTag = click_tag.setAttribute('id', 'click-single-page' + Nbr);
    //  const imgTag = click_tag.setAttribute('class', 'click-single-page');
    
    
    // temp-index = "indexjournal _single.html"
    // temp-index = temp-index + i;
    
    click_tag.href = "#single_page";
    console.log(click_tag);
    const aaa = click_tag.setAttribute('class', 'single');
    // const imgTag = click_tag.setAttribute('id', i );
    const imgTag = click_tag.setAttribute('id', 'oya' );

   
      article.appendChild(click_tag);
    
      const picture = document.createElement("img");
      
      // imageReference.getDownloadURL().then(url => { 
      //   targetImg.src = url; 
      // }); 
      // const imgtags = idtag + picture 
      
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
    
    
    
   
    const Nbr = journalArray.indexOf(journalArray[i]);
    console.log(Nbr);
  //  const e = document.querySelector("#click-single-page" + Nbr);
   const hidePage = document.getElementById("result");

  //  const a = document.querySelectorAll("a");
  //  console.log(a);
  
  // RESULT PAGE HIDE //////
  const resultPage = document.getElementById('result');
  resultPage.style.display = "none";

  const backBtn = document.getElementById('btn');
  backBtn.style.display = "none";



    ///Mobe to Single Page EventListener /////
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

 ////両方ともelseに引っかかっているから、それぞれのページのdiv.pageの名前を変える
//  。一つがblockになったら 　一つがnoneになるように変える・
  