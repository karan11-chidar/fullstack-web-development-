// let btn = document.querySelector('.btn');
// let img = document.querySelector('img');
// console.log(img)
// btn.addEventListener('dblclick', () => {
//     img.classList.toggle('resize');
//     if (img.className == 'resize') {
//         btn.textContent = 'Intial Image';
//     } else {
//         btn.textContent = "Resize Image";
//     }
// })

let name = document.querySelector('.name');
let input = document.querySelector('input');
input.addEventListener('input', () => {
    name.textContent = input.value;
})