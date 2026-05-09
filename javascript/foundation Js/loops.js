// Write program to table in 2
// for (let i = 1; i <= 10; i++){
//     console.log("2 * "+i+" = "+(2*i))
// }
// import promptSync from 'promp';
// const prompt = promptSync();
// let correctNumber = 7;
// let userGuess = Number(prompt("Guess a number between 1 and 10:"));

// while (userGuess !== correctNumber) {
//     console.log("Wrong guess! Try again.");
//     // Yahan hum userGuess ko UPDATE kar rahe hain
//     userGuess = Number(prompt("Wrong! Guess again:"));
// }

// alert("Congratulations! You guessed it.");

// let count = 1;
// let myTimer = setInterval(function() {
//     console.log("Timer chal raha hai:", count);
//     count++;
    
//     // Timer ko 5 tak pahunchne par rokna
//     if(count > 5) {
//         clearInterval(myTimer); // Isse loop ruk jayega
//         console.log("Timer ruk gaya!");
//     }
// }, 1000); // 1000 ms = 1 second


let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let cdate = date.getDate();
let format = cdate + '/' + month + '/' + year;
console.log(format)
let hour = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
let formatTime = hour + ":" + min + ":" + sec;
console.log(formatTime);