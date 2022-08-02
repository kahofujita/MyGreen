

// Hamburger Menu

const menu = document.querySelector('.menu-mobile');

menuButton.addEventListener('click', function () {

  menu.classList.toggle('show-menu');
})

// SEARCH BAR

const search = document.querySelector('.search-click');
const searchPage = document.querySelector('.searchbar-page');
const backButton = document.querySelector('.back-button');

search.addEventListener('focus', () => {
  searchPage.classList.add('show-search');
})
backButton.addEventListener('click', () => {
  searchPage.classList.remove('show-search');
})
// Grab Latest posts

// Import the functions you need from the SDKs you need
import { db, collection, orderBy, query, where, getDocs } from './firebase/firebase-config.js';

//collection Ref
const colRef = collection(db, 'journal');

export async function init() {
  //get collection data
  let links = []
  let more = []
  let journalArr = [];
  await getDocs(colRef)
    .then((snapshot) => {
      console.log(snapshot.docs);

      snapshot.docs.forEach((doc) => {
        journalArr.push({ ...doc.data(), id: doc.id });
      })
      console.log(journalArr);
      journalArr.map(item => { links = [...links, item.picture_img_name] })
      journalArr.map(detail => { more = [...more, detail.journal_date] })
    })
    .catch(err => {
      console.log(err.message);
    })

  // db.collection('journal').orderBy('journal_date').get().then((snapshot) => {
  //   snapshot.docs.forEach(doc => {
  //     console.log(doc,'in doc ast');
  //   })
  // })


  // SLIDESHOW

  let i = 0;
  const row_container = document.querySelector('.row-container')
  row_container.innerHTML += `<div class="container"><img src="${links[i + 0]}" ><div class="date">${more[i + 0]}</div></div>
`
  row_container.innerHTML += `<div class="container"><img src="${links[i + 1]}" ><div class="date">${more[i + 1]}</div></div>`
  row_container.innerHTML += `<div class="container"><img src="${links[i + 2]}" ><div class="date">${more[i + 2]}</div></div>
`

  document.querySelector('.flt-right').addEventListener('click', () => {
    if (i < links.length - 11) {
      i++;
      row_container.innerHTML = ''
      row_container.innerHTML += `<div class="container"><img src="${links[i + 0]}" ><div class="date">${more[i + 0]}</div></div>
    `
      row_container.innerHTML += `<div class="container"><img src="${links[i + 1]}" >
    <div class="date">${more[i + 1]}</div></div>`
      row_container.innerHTML += `<div class="container"><img src="${links[i + 2]}" >
    <div class="date">${more[i + 2]}</div></div>`
    }

  });

  document.querySelector('.flt-left').addEventListener('click', () => {
    if (i > 0) {
      i--;
      row_container.innerHTML = ''
      row_container.innerHTML += `<div class="container"><img src="${links[i + 0]}" >
    <div class="date">${more[i + 0]}</div></div>`
      row_container.innerHTML += `<div class="container"><img src="${links[i + 1]}" >
    <div class="date">${more[i + 1]}</div></div>`
      row_container.innerHTML += `<div class="container"><img src="${links[i + 2]}" >
    <div class="date">${more[i + 2]}</div></div>`
    }

  })
  // for(let i=0 ; i< containers.length-4; i++){
  //   document.querySelector('.row-container').innerHTML = `<img src=""`
  // }





}