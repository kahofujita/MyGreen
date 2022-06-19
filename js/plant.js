
import {app, db} from './firebase/firebase-config.js'

import {collection, addDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";


const getPlantinfo = async () => { 
    const docRef = doc(db, "plant_userinfo", "0bGQUunaahMZrACl7KGT");
    const docSnap = await getDoc(docRef); 

    const docSnapId = docSnap.data().user_info_id
    console.log(docSnapId)

    const q = query(collection(db, "plant_ourinfo"), where("plant_id", "==", 200));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });
}


getPlantinfo()

// An async function is a function declared with the async keyword, and the await keyword is permitted within it.
// wait until we find getDoc