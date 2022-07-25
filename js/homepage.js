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

// SLIDESHOW
let slideIndex = 1;
showSlides(slideIndex);

const slides = document.querySelectorAll('.arrow-silde');
slides.forEach(slide => {
  slide.addEventListener('click',  function plusSlides(n) {
    showSlides(slideIndex += n);
  })

})

slide.onclick="plusSlides(1)"
slide.onclick="plusSlides(-1)"


function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  
}

