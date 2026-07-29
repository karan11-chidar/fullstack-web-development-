const user = {
  name: "Karan",
  // Yahan 'address' object nahi hai
};

// Purana tarika (App crash ho jayegi)
// console.log(user.address.city);

// Naya tarika - Optional Chaining (Crash nahi hoga)
console.log(user.address?.city); // Output: undefined
