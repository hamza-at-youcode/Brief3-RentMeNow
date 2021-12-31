const menuBtn = document.querySelector('.btn-hamburger');
menuBtn.addEventListener('click',()=>{
    document.querySelector('.header--nav').classList.toggle('show');
    menuBtn.classList.toggle('arrow');
});