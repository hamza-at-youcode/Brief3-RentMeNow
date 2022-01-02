import vehicles from './vehicles.js';

const form = document.querySelector('.reservation--form');
const nextBtn = document.querySelector('.btn--next');
const type = document.querySelector('.type');
const fuel = document.querySelector('.fuel');
const gearbox = document.querySelector('.gearbox');
const durationInput = document.querySelector('#duration');

const nameInput = document.querySelector('#fullname');
const emailInput = document.querySelector('#email');
const identityInput = document.querySelector('#idcard');

let selectType = null;
let selectFuel = null;
let selectGbox = null;

let silde = 1;

window.onload = () =>{
    let types = [];
    vehicles.forEach(v=>{types.push(v.type)});
    selectType = createSelectElement(types);
    type.appendChild(selectType);
    
    selectType.addEventListener('change',()=>{
        let index = vehicles.findIndex(v=>v.type == selectType.value);
        if(index != -1){
            selectFuel = createSelectElement(vehicles[index].fuel);
            fuel.querySelector(':nth-child(2)').remove();
            fuel.appendChild(selectFuel);

            selectGbox = createSelectElement([vehicles[index].gearbox]);
            gearbox.querySelector(':nth-child(2)').remove();
            gearbox.appendChild(selectGbox);

            if(selectType.value.toLocaleLowerCase() == 'moto'){
                selectGbox.setAttribute('disabled',true);   
            }
        }
    });
}


// Create select element (width options)
function createSelectElement(options = [],required = false){
    let select = document.createElement('select');
    if (required) {
        let required = document.createAttribute('required');
        select.setAttributeNode(required);
    }
    select.append(createOptionElement('','Select'));
    
    options.forEach(function(opt){
        select.append(createOptionElement(opt,opt));
    })

    return select;
}

// Create option element
function createOptionElement(value,text){
    let option = document.createElement('option');
    option.value = value;
    option.append(text);
    return option;
}

// Handel slides
nextBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(silde);
    let valide = false;
    if (silde === 1) {
        valide = isValide(selectType) && isValide(selectFuel) && isValide(selectGbox) && isValide(durationInput);
    }else if(silde === 2) {
        valide = isValide(nameInput) && isValide(emailInput) && isValide(identityInput);
        nextBtn.style.display = 'none';
    }

    if(valide){
        let currentSlide = document.querySelector('.current--silde');
        currentSlide.classList.add('prev--silde');
        currentSlide.classList.remove('current--silde');
        currentSlide.nextElementSibling.classList.add('current--silde');
        silde++;
    }else{
        alert("All fields are required!");
    }
});


function isValide(input){
    if(input.disabled) return true;

    if(input.value === ""){
        input.style.border = "1px solid red";
        return false;
    }

    if(input.type === 'email'){
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if(!regex.test(input.value)){
            input.style.border = "1px solid red";
            return false;
        }
    }else if (input.type === 'number' && parseInt(input.value) < parseInt(input.min)) {
        return false;
    }

    return true;
}