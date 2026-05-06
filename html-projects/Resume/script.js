let changeName = document.querySelector('#headingName');
changeName.innerText = 'chidar karan';

let newHeading = document.createElement('h1');
newHeading.innerText = 'Karan is the king ';
let parent = document.querySelector('#header');
parent.insertAdjcent(newHeading);