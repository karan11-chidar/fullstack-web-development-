let increaseBtn = document.getElementById("increase-btn");
let decreaseBtn = document.getElementById("decrease-btn");
let counterNumber = document.getElementById("counter-number");
console.log(counterNumber.value);
let num = 0;
increaseBtn.addEventListener("click", () => {
    console.log('click incerase btn');
    num++;
    counterNumber.textContent = num;
});
decreaseBtn.addEventListener('click', () => {
    console.log('click decrease btn');
    num--;
    console.log(num);
     counterNumber.textContent = num;
})
