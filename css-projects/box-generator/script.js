const loginBtn = document.getElementById("loginBtn");
const signUpLink = document.getElementById("signUpLink");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginBtn.classList.add("pulse");
  setTimeout(() => loginBtn.classList.remove("pulse"), 230);
});

signUpLink.addEventListener("click", (e) => {
  e.preventDefault();
  // here you could open sign‑up card / page
  alert("Open Sign‑Up UI here.");
});
