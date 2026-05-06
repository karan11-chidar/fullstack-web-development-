// // Q.1 Variables
// var a = 10;

// if (true) {
//   var a = 20;
// }

// console.log(a);
// Q.2
// let a = 10;

// if (true) {
//   let a = 20;
// }

// console.log(a);
// Q.3
// const a = 10;

// a = 20;

// console.log(a);

//Q.4
// {
//   let a = 10;
// }

// console.log(a);
var hero = "Ironman";

{
  var hero = "Batman";
  let sidekick = "Robin";
  console.log("Inside 1:", hero);
  console.log("Inside 2:", sidekick);
}

console.log("Outside 1:", hero);
console.log("Outside 2:", sidekick);