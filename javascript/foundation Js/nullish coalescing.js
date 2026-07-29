let userScore = 0;

// Purana tarika (||) - Yeh 0 ko reject kar dega
console.log(userScore || 100); // Output: 100 (Ghalat result!)

// Naya tarika (??) - Yeh sirf null/undefined check karega
console.log(true ?? 100); // Output: 0 (Ekdum sahi result!)
