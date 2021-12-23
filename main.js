const menuBtn = document.querySelector('.btn-hamburger');
menuBtn.addEventListener('click',()=>{
    document.querySelector('.header--nav').classList.toggle('show');
    menuBtn.querySelector('img').setAttribute('src','./assets/icons/icon-close.svg');
});