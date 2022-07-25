// Next Buttons
const nextButton1 = document.querySelector('#next-button1');
const nextButton2 = document.querySelector('#next-button2');
const nextButton3 = document.querySelector('#next-button3');

// Back Buttons

const backButton2 = document.querySelector('#back-button2');
const backButton3 = document.querySelector('#back-button3');

const signupForm1 = document.querySelector('.signup-page1-wrapper');
const signupForm2 = document.querySelector('.signup-page2-wrapper');
const signupForm3 = document.querySelector('.signup-page3-wrapper');
const addPlantForm = document.querySelector('.addpPLantForm');
// console.log(addPlantForm)

nextButton1.addEventListener('click', () => {
    signupForm1.classList.remove('show')
    signupForm1.classList.toggle('left')
    signupForm2.classList.remove('right')
    signupForm2.classList.toggle('show')
})

nextButton2.addEventListener('click', () => {
    signupForm2.classList.remove('show')
    signupForm2.classList.toggle('left')
    signupForm3.classList.remove('right')
    signupForm3.classList.toggle('show')
})

// nextButton3.addEventListener('click', () => {
//     signupForm3.classList.remove('show')
//     signupForm3.classList.toggle('left')
//     addPlantForm.classList.remove('right')
//     addPlantForm.classList.toggle('show')
// })

backButton2.addEventListener('click', () => {
    signupForm1.classList.remove('left')
    signupForm1.classList.toggle('show')
    signupForm2.classList.remove('show')
    signupForm2.classList.toggle('right')
})

backButton3.addEventListener('click', () => {
    signupForm2.classList.remove('left')
    signupForm2.classList.toggle('show')
    signupForm3.classList.remove('show')
    signupForm3.classList.toggle('right')
})