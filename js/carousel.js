
import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js'



const swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  spaceBetween: 30,
  slidesPerGroup: 3,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});




