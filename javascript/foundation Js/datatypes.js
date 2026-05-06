// Q.1

// let a = 10;
// let b = a;

// b = 50;

// console.log(a);

// Q.2
// let obj1 = { x: 10 };
// let obj2 = obj1;

// obj2.x = 100;

// console.log(obj1.x);

// Q.3
// let obj1 = { x: 10 };
// let obj2 = { ...obj1 };

// obj2.x = 50;

// console.log(obj1.x);
// Part A: Numbers
let score1 = 100;
let score2 = score1;
score1 = 200;

// Part B: Objects
let user1 = { name: "Karan" };
let user2 = user1;
user1.name = "Master";

console.log("Score 2 is:", score2);
console.log("User 2 Name is:", user2.name);