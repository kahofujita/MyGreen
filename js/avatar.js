import { db, auth} from './firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";



////Get Personal ID /////
let userId = sessionStorage.getItem('userID');
console.log(sessionStorage.getItem('userID'));



//GET AVATAR IMG ///
let ava = document.getElementById("avatar")
let avaArray = [];
const avatar = await getDocs(collection(db, "user_info"));
let avaname;
avatar.forEach((doc) => {
//  let myId = doc.data().user_id;

//全部が入ったarray
 avaArray.push(doc.data());
//  console.log(doc.data());
//  console.log(avaArray); 
});
// console.log(doc.data());
console.log(avaArray); 
let i = 0;
const avatarNbr = avaArray[i].avatar_img_name;
for(let i = 0; avaArray.length > i; i++){
//   console.log(avatarNbr);
  if (avaArray[i].user_id == userId){ 
console.log(avaArray[i].avatar_img_name);
          switch(true){
            case(avatarNbr === "option1"):
                ava.src = "avatar/1.png";
            case(avatarNbr === "option2"):
                 ava.src = "avatar/2.png";
            case(avatarNbr === "option3"):
                 ava.src = "avatar/3.png";
            case(avatarNbr === "option4"):
                 ava.src = "avatar/4.png";
            case(avatarNbr === "option5"):
                 ava.src = "avatar/5.png";
            case(avatarNbr === "option6"):
                 ava.src = "avatar/6.png";
            case(avatarNbr === "option7"):
                 ava.src = "avatar/7.png";
            case(avatarNbr === "option8"):
                 ava.src = "avatar/8.png";
            case(avatarNbr === "option9"):
                 ava.src = "avatar/9.png";
            case(avatarNbr === "option10"):
                 ava.src = "avatar/10.png";
          default:
            break;
        }
    }else{
        ava.innerHTML = `No avatar`;
    }

}

