let mainMenu = [
   { text: 'Workout Log', href: '#' },
   { text: 'Calorie Calculator', href: '#' },
   {
      text: 'Account', href: '#', drop: [
         { text: 'Log In', form: 'login' },
         { text: 'Sign Up', form: 'signup' },]
   },
];

let navMenu = document.getElementById("navBar");
let main = document.querySelector("main");
let content = document.getElementById("mainContent");

let image = makeElement('img');
image.src = '../images/fitLogo.png';
content.appendChild(image);

main.classList.add('flex-center');
navMenu.classList.add('flex-center', 'flex-around');

for (let i of mainMenu) {
   let a = makeElement('a');
   a.getAttribute(i.href);
   a.textContent = i.text;

   navMenu.appendChild(a);
}

navMenu.addEventListener('click', openDropdown);
navMenu.addEventListener('click', handleClick);
navMenu.addEventListener('click', showCalc);

function showCalc(event) {
   event.preventDefault();
   if (event.target.tagName !== 'A') return;

   for (let i of mainMenu) {
      if (i.text === 'Calorie Calculator') {
         let curr = document.querySelector('.calorieForm');
         if (curr) {curr.remove()};

         content.innerHTML = '';

         let template = document.getElementById('calorieCard');
         let calcClone = template.content.cloneNode(true);
         
         calcClone.querySelector('#calcCals').addEventListener('click', doCalc);
         content.appendChild(calcClone);
      }
   }

}

function doCalc(event){
   event.preventDefault();
   const age = Number(document.getElementById('age').value);
   const weight =  Number(document.getElementById('weight').value);
   const feet =  Number(document.getElementById('feet').value);
   const inches =  Number(document.getElementById('inches').value);
   const gender =  document.getElementById('gender').value;
   const activity =  Number(document.getElementById('activity').value);

   if(
      age === '' || isNaN(age) || 
      weight === '' || isNaN(weight) || 
      feet === '' || isNaN(feet) || 
      inches === '' || isNaN(inches) || 
      isNaN(activity) 
   ){
      content.textContent = 'Please fill out all fields';
      return;
   }

   const totalInches = (feet*12) + inches;
   let bmr;

   if(gender === "male") {
      bmr = (10 * (weight * 0.45359237)) + (6.25 * (totalInches * 2.54)) - (5 * age ) + 5;
   } else if (gender === "female"){
      bmr =  (10 * (weight * 0.45359237)) + (6.25 * (totalInches * 2.54)) - (5 * age ) - 161;
   }

   const tdee = bmr * activity;
   content.innerHTML = `<h1>You should be eating ${Math.round(tdee)} kcal per day to maintain your weight</h1>`;
}


function handleClick(event) {
   event.preventDefault();
   if (event.target.tagName !== 'A') return;
   let currentActive = navMenu.querySelector('.active');

   if (currentActive) {
      currentActive.classList.remove('active');
   }

   event.target.classList.add('active');
}

function openDropdown(event) {
   event.preventDefault();
   if (event.target.tagName !== 'A') return;

   for (let i of mainMenu) {
      if (i.text === event.target.textContent && i.drop) {
         createDropdown(event.target, i.drop);
         break;
      }
   }
}


function createDropdown(a, item) {
   let current = a.nextElementSibling;
   if (current && current.classList.contains('dropdown')) {
      current.remove();
      return;
   }

   let dropDown = makeElement('div');
   dropDown.classList.add('dropdown');

   for (let i of item) {
      let dropItem = makeElement('a');
      dropItem.getAttribute(i.href);
      dropItem.textContent = i.text;
      dropItem.addEventListener('click', e => {
         e.preventDefault();
         showForm(i.form);
      });

      dropDown.appendChild(dropItem);
   }

   a.after(dropDown);
}

function showForm(type) {
   let curr = document.querySelector('.loginForm');
   if (curr) {curr.remove()};

   content.innerHTML = '';

   let template = document.getElementById('loginCard');
   let loginClone = template.content.cloneNode(true);

   let title = loginClone.querySelector('.formTitle');
   let button = loginClone.querySelector('button');

   if (type === 'login') {
      title.textContent = 'Log In';
      button.textContent = 'Log In';
   }
   else if (type === 'signup') {
      title.textContent = 'Sign Up';
      button.textContent = 'Create Account';
   }
   document.querySelector('main').appendChild(loginClone);
}

function makeElement(el) {
   let newElement = document.createElement(el);
   return newElement;
}