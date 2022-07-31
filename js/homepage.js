export function init () {

// Hamburger Menu

const menu = document.querySelector('.menu-mobile');

menuButton.addEventListener('click', function () {

  menu.classList.toggle('show-menu');
})

//Navigation of desktop

// let cls = document.querySelector('main')
// let arr = cls.classList
// arr.forEach (c=> {console.log(c)})

// =============================================================
// let current_url = document.location.hash;
// let name = 'hasan';
// console.log(name.includes('san')
// console.log(current_url.includes('person'), 'in baraye safe hast')

// let a = document.querySelector(`a[href = ${current_url} ]`)
// console.log(`a[href = ${current_url} ]`);
// a.style.color = 'white'

// document.querySelectorAll(".navigation").forEach(address =>{
//   if (address.href.includes(current_url)){
//     console.log('doroste va alan injaii', current_url);
//   }
//   console.log(address)
// })


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

// SLIDESHOW
document.querySelector('.flt-left').addEventListener('click', () => {
  console.log('left button clicked');
})





}