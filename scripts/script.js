let mainMenu = [
   {text: 'Workout Log', href: '#'},
   {text: 'Account', href: '#', drop:[
      {text: 'Log In', form: 'login'},
      {text: 'Sign Up', form: 'signup'}, ]},
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


function handleClick(event){
   event.preventDefault();
   if (event.target.tagName !== 'A') return;
   let currentActive = navMenu.querySelector('.active');

   if(currentActive){
      currentActive.classList.remove('active');
   }
  
  event.target.classList.add('active');
}

function openDropdown(event){
   event.preventDefault();
   if (event.target.tagName !== 'A') return;

   for (let i of mainMenu){
      if(i.text === event.target.textContent && i.drop){
         createDropdown(event.target, i.drop);
         break;
      }
   }
}


function createDropdown(a, item) {
   let current = a.nextElementSibling;
   if(current && current.classList.contains('dropdown')){
      current.remove();
      return;
   }

   let dropDown = makeElement('div');
   dropDown.classList.add('dropdown');

   for (let i of item){
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

function showForm(type){
   let curr = document.querySelector('.loginForm');
   if (curr) curr.remove();
   
   content.innerHTML='';

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