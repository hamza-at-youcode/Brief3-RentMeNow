import vehicles from './vehicles.js';

const nextBtn = document.querySelector('.btn--next');

nextBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let currentSlide = document.querySelector('.current--silde');
    currentSlide.classList.add('prev--silde');
    currentSlide.classList.remove('current--silde');
    currentSlide.nextElementSibling.classList.add('current--silde');
});
