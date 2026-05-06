// Write program to table in 2
// for (let i = 1; i <= 10; i++){
//     console.log("2 * "+i+" = "+(2*i))
// }
import promptSync from 'promp';
const prompt = promptSync();
let correctNumber = 7;
let userGuess = Number(prompt("Guess a number between 1 and 10:")); 

while (userGuess !== correctNumber) {
    console.log("Wrong guess! Try again.");
    // Yahan hum userGuess ko UPDATE kar rahe hain
    userGuess = Number(prompt("Wrong! Guess again:")); 
}

alert("Congratulations! You guessed it.");