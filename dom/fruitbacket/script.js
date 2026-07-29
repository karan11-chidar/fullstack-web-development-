let parent = document.querySelector('#list');
let childMango = document.querySelectorAll('#list li')[1];
childMango.style.backgroundColor = 'red';
console.log(childMango);
let newElement = document.createElement('li');
newElement.textContent = 'papaya';
childMango.insertAdjacentElement("beforebegin", newElement);
