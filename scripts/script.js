let mainMenu = [
   {text: 'Account', href: '#', drop:[
      {text: 'Log In', href: '#'},
      {text: 'Sign Up', href: '#'}, ]},
   {text: 'Calorie Calculator', href: '#'},
   {text: 'Workout Log', href: '#'}, 
];

let navMenu = document.getElementById("navBar");
let image = makeElement('img');
let main = document.querySelector("main");

image.src = '../images/fitLogo.png';
main.appendChild(image);
main.classList.add('flex-center');
navMenu.classList.add('flex-center', 'flex-around');

for (let i of mainMenu) {
  let a = makeElement('a');
  a.getAttribute(i.href);
  a.textContent = i.text;

  navMenu.appendChild(a);
}

navMenu.addEventListener('click', openDropdown);

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


function createDropdown(a, item){
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
    dropDown.appendChild(dropItem);
  }

  a.after(dropDown);
}

function makeElement(el) {
   let newElement = document.createElement(el);
   return newElement;
}