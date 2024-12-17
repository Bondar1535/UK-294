const passwordInput = document.getElementById("password-input");
const passwordConfirmationInput = document.getElementById("password-confirmation-input");

passwordConfirmationInput.addEventListener("input", () => {
  if(passwordInput.value !== passwordConfirmationInput.value) {
    passwordConfirmationInput.setCustomValidity("Passwords need to match!");
  } else {
    passwordConfirmationInput.setCustomValidity("");
  }
})
