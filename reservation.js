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

let selectedIndex = -1;
let duration = 1;
let selectedFuel = "";

window.onload = () =>{
    let types = [];
    vehicles.forEach(v=>{types.push(v.type)});
    selectType = createSelectElement(types);
    type.appendChild(selectType);
    
    selectType.addEventListener('change',()=>{
        let index = vehicles.findIndex(v=>v.type == selectType.value);
        if(index != -1){
            selectedIndex = index;
            selectFuel = createSelectElement(vehicles[index].fuel);
            fuel.querySelector(':nth-child(2)').remove();
            fuel.appendChild(selectFuel);

            selectGbox = createSelectElement([vehicles[index].gearbox]);
            gearbox.querySelector(':nth-child(2)').remove();
            gearbox.appendChild(selectGbox);

            if(selectType.value.toLocaleLowerCase() == 'moto'){
                selectGbox.setAttribute('disabled',true);   
            }

            selectFuel.addEventListener('change',()=>{
                selectedFuel = selectFuel.value; 
            });
        }
    });
}

durationInput.addEventListener('keyup',()=>{
    duration = parseInt(duration.value);
});

durationInput.addEventListener('click',()=>{
    duration = parseInt(duration.value);
});

function swapSlide(){
    let currentSlide = document.querySelector('.current--silde');
    currentSlide.classList.add('prev--silde');
    currentSlide.classList.remove('current--silde');
    currentSlide.nextElementSibling.classList.add('current--silde');
    silde++;
}

function calculateTotalPrice(type,price,gearbox,duration,fuel){
    let total = price;
    if (gearbox.toLocaleLowerCase() === 'automatique')
        total+=total*0.19;

    if (fuel.toLocaleLowerCase() === 'electrique') total+=total*0.05;
    else if(fuel.toLocaleLowerCase() === 'hybride') total+=total*0.09;
    else if(fuel.toLocaleLowerCase() === 'essence') total+=total*0.14;
    else if(fuel.toLocaleLowerCase() === 'diesel') total+=total*0.21;

    return duration*total;
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
    if (silde === 1) {
        if(isValide(selectType) && isValide(selectFuel) && isValide(selectGbox) && isValide(durationInput))
            swapSlide();
    }else if(silde === 2) {
        if(isValide(nameInput) && isValide(emailInput) && isValide(identityInput)){
            swapSlide();
            let v = vehicles[selectedIndex];
            let total = calculateTotalPrice(v.type,v.price,v.gearbox,duration,selectedFuel);
            console.log("total:",total);
            document.querySelector('.review').innerHTML = `
            <p><strong>Vehicle type:</strong> <span>${v.type}</span></p>
            <p><strong>Price (pure day):</strong> <span>${v.price}$</span></p>
            <p><strong>Gearbox:</strong> <span>${v.gearbox ? v.gearbox : '.....'}</span></p>
            <p><strong>Duration:</strong> <span>${(duration > 1) ? duration+'-Days' : duration+'-Day'}</span></p>
            <p><strong>Fuel:</strong> <span>${selectedFuel}</span></p>
            <p class="total"><strong>Total: ${total}$</strong></p>
            `;   
            nextBtn.style.display = 'none';
        }
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