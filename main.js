const menuBtn = document.querySelector('.btn-hamburger');
menuBtn.addEventListener('click',()=>{
    document.querySelector('.header--nav').classList.toggle('show');
    menuBtn.querySelector('img').setAttribute('src','./assets/icons/icon-close.svg');
});

document.querySelector('.btn-submit').addEventListener('click',(e)=>{
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let msg = document.getElementById("msg").value;
    alert(`Processing...\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${msg}`);
});