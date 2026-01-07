// Array of navigation bar objects
let mainMenu = [
   { text: 'Calorie Calculator', href: '#' },
   {
      text: 'Account', href: '#', drop: [
         { text: 'Log In', form: 'login' },
         { text: 'Sign Up', form: 'signup' },]
   },
];

// Grabbing elements to late be manipulated
let navMenu = document.getElementById("navBar");
let main = document.querySelector("main");
let content = document.getElementById("mainContent");

// Initial page setup and styles it
let image = makeElement('img');
image.src = '../images/fitLogo.png';
content.appendChild(image);

main.classList.add('flex-center');
navMenu.classList.add('flex-center', 'flex-around');

// Builds navigation bar dynamically
for (let i of mainMenu) {
   let a = makeElement('a');
   a.getAttribute(i.href);
   a.textContent = i.text;

   navMenu.appendChild(a);
}

// Adds 3 event listeners to the same navigation bar
navMenu.addEventListener('click', handleClick);
navMenu.addEventListener('click', openDropdown);
navMenu.addEventListener('click', showCalc);
 
// Displays the calculator template when Calorie Calculator is clicked
function showCalc(event) {
   event.preventDefault();
   if (event.target.tagName !== 'A') return;
   if (event.target.textContent !== 'Calorie Calculator') return;

   // Removes any previous forms from showing on the DOM
   let curr = document.querySelector('.calorieForm');
   if (curr) { curr.remove() };

   content.innerHTML = ''; // Clears the existing HTML

   // Clones the HTML template with the id of calorieCard and assigns it to a variable
   let template = document.getElementById('calorieCard');
   let calcClone = template.content.cloneNode(true);
   let form = calcClone.querySelector('.calorieForm')

   form.classList.add('card')
   calcClone.querySelector('#calcCals').addEventListener('click', doCalc);
   content.appendChild(calcClone);

}

// Does the math for the calorie calculator 
function doCalc(event) {
   event.preventDefault();
   const age = Number(document.getElementById('age').value);
   const weight = Number(document.getElementById('weight').value);
   const feet = Number(document.getElementById('feet').value);
   const inches = Number(document.getElementById('inches').value);
   const gender = document.getElementById('gender').value;
   const activity = Number(document.getElementById('activity').value);

   // Handles any empty or non-numerical input values
   if (
      age == '' || isNaN(age) ||
      weight == '' || isNaN(weight) ||
      feet == '' || isNaN(feet) ||
      inches == '' || isNaN(inches) ||
      isNaN(activity)
   ) {
      window.alert('Please fill out all fields!');
      return;
   }

   // Converts feet and inches into totalInches
   const totalInches = (feet * 12) + inches;
   let bmr;

   // Calculates BMR differently depending on gender
   if (gender === "male") {
      bmr = (10 * (weight * 0.45359237)) + (6.25 * (totalInches * 2.54)) - (5 * age) + 5;
   } else if (gender === "female") {
      bmr = (10 * (weight * 0.45359237)) + (6.25 * (totalInches * 2.54)) - (5 * age) - 161;
   }
   
   // Calculates TDEE using BMR multiplied by the activity level chosen in the form and displays the result into the content div
   const tdee = bmr * activity;
   content.innerHTML = `<h1>You should be eating ${Math.round(tdee)} kcal per day to maintain your weight</h1>`;
}

// Checks if the active class is present in the specific event that was clicked
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
      if (i.text === event.target.textContent && i.drop && event.target.classList.contains('active')) {
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
      dropItem.addEventListener('click', event => {
         event.preventDefault();
         content.innerHTML = '';
         showForm(i.form);
      });

      dropDown.appendChild(dropItem);
   }

   a.after(dropDown);
}

function showForm(type) {
   let curr = document.querySelector('.loginForm');
   
   // Removes any previous forms from showing on the DOM
   if (curr) { curr.remove() };


   content.innerHTML = '';

   let template = document.getElementById('loginCard');
   let loginClone = template.content.cloneNode(true);

   let title = loginClone.querySelector('.formTitle');
   let button = loginClone.querySelector('button');
   let form = loginClone.querySelector('.loginForm');

   if (type === 'login') {
      title.textContent = 'Log In';
      button.textContent = 'Log In';
   }
   else if (type === 'signup') {
      title.textContent = 'Sign Up';
      button.textContent = 'Create Account';
   }
   form.classList.add('card');
   form.addEventListener('submit', handleLogin);
   content.appendChild(loginClone);
}

function handleLogin(event){
   event.preventDefault();
   window.alert("You're In!")
}

function makeElement(el) {
   let newElement = document.createElement(el);
   return newElement;
}