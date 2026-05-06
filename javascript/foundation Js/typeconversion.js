// Type conversion in JavaScript

// Implicit type conversion
console.log("5" - 2) // Output: 3 (string "5" is converted to number)
console.log("5" + 2) // Output: "52" (number 2 is converted to string)
console.log("10" + 2) // Output: "102" (number 2 is converted to string)

console.log(10 + 2 + "5") // Output: "125" (number 10 and 2 are added first, then converted to string)
console.log("5" * "5") // Output: 25 (both strings are converted to numbers and multiplied)

console.log(true + false) // Output: 2 (true is converted to 1)
console.log(true + true) // Output: 2 (both true are converted to 1)

console.log(null + 5) // Output: 5 (null is converted to 0)

console.log(null == undefined) // Output: true (null and undefined are considered equal in loose equality   )
