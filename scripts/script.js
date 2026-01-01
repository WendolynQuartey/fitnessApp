let mainMenu = [
   {text: 'Account', href: '#', drop:[
      {text: 'Log In', href: '#'},
      {text: 'Sign Up', href: '#'}, ]},
   {text: 'Calorie Tracker', href: '#'},
   {text: 'Workout Log', href: '#'}, 
];

let navMenu = document.getElementById("navBar");
let image = makeElement('img');
let main = document.querySelector("main");

main.style.backgroundColor = 'rgba(237, 251, 251, 1)';
image.src = '../images/fitLogo.png';
main.appendChild(image);
main.classList.add('flex-center')

navMenu.classList.add('flex-around');

for (let i of mainMenu) {
  let a = makeElement('a');
  a.getAttribute(i.href);
  a.textContent = i.text;
  navMenu.appendChild(a);
}

function makeElement(el) {
   let newElement = document.createElement(el);
   return newElement;
}