let container = document.querySelector('#container');
let card = document.createElement('div');
let heading = document.createElement('h1');
let bio = document.createElement('p');
card.setAttribute('id', 'cardBox');
console.log(card);
heading.textContent = 'karan chidar';
bio.textContent = "Web Dev and Dsa Learing Future Coder 🚀";
card.style.cssText =
    "background-color:pink; padding:3rem; margin:0,auto; display:flex; flex-direction:column; gap: 2rem; border:2px solid black;";
  container.style.cssText = "background-color:black; height:100vh;";

card.appendChild(heading);
card.appendChild(bio);
container.appendChild(card);

console.log(container)