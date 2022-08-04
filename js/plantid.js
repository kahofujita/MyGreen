
export function init () {
function getPlantApi(data) {

  fetch('https://api.plant.id/v2/identify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);

      let arr = data.suggestions;





     document.querySelector('.result-message').innerHTML = `<p>We found it!</p>`;

      for(let i = 0; i < arr.length ; i++ ){
        // console.log(data.suggestions[i].plant_name);
        document.querySelector('.scientific-name-title').innerHTML = "Scientific Name:";
        document.querySelector('.plant-name').innerHTML += data.suggestions[i].plant_name + ",";

        for(let q = 0; q < data.suggestions[i].plant_details.common_names.length; q++){
      document.querySelector('.common-name-title').innerHTML = "Common Name:";
      document.querySelector('.common-name').innerHTML += data.suggestions[i].plant_details.common_names[q]+ ",";
      }

      // for(let j = 0; j < data.suggestions[i].similar_images.length; j++){
      // Just need the first picture
      let image = data.suggestions[0].similar_images[0].url ;
      document.querySelector('.plant-picture').innerHTML += `<img src="${image}" alt="" >`;
     

      }

    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

//take a photo
document.querySelector('.icon-camera-container').addEventListener("click", () => {
  myImg.src = "";
  document.querySelector('.camera').style.display = 'grid'

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      //video.src = window.URL.createObjectURL(stream);
      video.srcObject = stream;
      // video.play();  // or autplay
    });
  } else {
    console.log("media devices not available in this browser");
  }

   // Trigger photo take
   document.getElementById("snap").addEventListener("click", () => {
    //canvas.width = video.videoWidth; 
    //canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0,);
    console.log(canvas);
    document.querySelector('.camera').style.display = 'hidden'
    const tracks = video.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    const imageBlob = canvas.toBlob(handleBlob, 'image/jpeg');
    console.log('in imageBlobe');
    console.log(imageBlob);
   
  });
  });
  

const video = document.getElementById('video');

// Elements for taking the snapshot
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.scale(0.5, 0.5);


//Upload a photo
const imgInp = document.querySelector('#input-plant-id')

imgInp.onchange = evt => {
  const [file] = imgInp.files
  if (file) {

    myImg.src = URL.createObjectURL(file)
  }
}



// get data
document.querySelector('.plant-id-button').addEventListener('click', function sendIdentification() {
  
  const files = [...document.querySelector('input[type=file]').files];

  const promises = files.map((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target.result;
        console.log(res);
        resolve(res);
      }
      reader.readAsDataURL(file)
    })

  })

  Promise.all(promises).then((base64files) => {
    console.log(base64files)

    const data = {
      api_key: "xFCXUGwXmsC3mUrFGjsu6CwofUABXyIiu9juLeAAVFbQhUv4Ml",
      images: base64files,
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      plant_details: ["common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms"],

    };

    getPlantApi(data)

  })


  const uploadingArea = document.querySelector('.uploading-picture-form');
  uploadingArea.style.display = "none";
  myImg.src = "";
  document.querySelector('.camera').style.display= "none"
  document.querySelector('.moon-cactus-image').style.display = "none";
});






function handleBlob(blob) {

  const objectURL = window.URL.createObjectURL(blob);


  const reader = new FileReader();
  reader.addEventListener('load', () => {
    console.log(reader.result);

    const data = {
      api_key: "xFCXUGwXmsC3mUrFGjsu6CwofUABXyIiu9juLeAAVFbQhUv4Ml",
      images: [reader.result],
      plant_language: "en",
      plant_details: ["common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms"],

    };
    getPlantApi(data);
    const uploadingArea = document.querySelector('.uploading-picture-form');
    uploadingArea.style.display = "none";
    myImg.src = "";
    document.querySelector('.camera').style.display= "none"
    document.querySelector('.moon-cactus-image').style.display = "none";
  });
  reader.readAsDataURL(blob);



}


// fake code
// document.querySelector('.plant-id-button').addEventListener('click', ()=> {
//   const uploadingArea = document.querySelector('.uploading-picture-form');
//   uploadingArea.style.display = "none";
//   myImg.src = "";
//   document.querySelector('.camera').style.display= "none"
//   document.querySelector('.moon-cactus-image').style.display = "none";

//   document.querySelector('.result-message').innerHTML = `<p>We found it!</p>`;
//   document.querySelector('.scientific-name-title').innerHTML = "Scientific Name:";
//         // document.querySelector('.plant-name').innerHTML += data.suggestions[i].plant_name + ",";
//         document.querySelector('.plant-name').innerHTML += "Fruit Salad Plant, Swiss Chees Plant";
//         document.querySelector('.common-name-title').innerHTML = "Common Name:";
//       // document.querySelector('.common-name').innerHTML += data.suggestions[i].plant_details.common_names[q]+ ",";
//       document.querySelector('.common-name').innerHTML += "Moon Cactus";
//         document.querySelector('.plant-picture').innerHTML += `<img src="images/plant_img/Moon Cactus.png" alt="" >`;
// })




}