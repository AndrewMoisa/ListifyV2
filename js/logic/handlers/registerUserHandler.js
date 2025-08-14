import { registerUser } from "../../logic/api/registerUser.js";
import {
  renderErrorMessage,
  renderSuccessMessage,
} from "../../ui/shared/displayMessage.js";

export function registerHandler() {
  const form = document.querySelector("#register-form");

  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log("Form data:", data);

  const button = form.querySelector("button");

  try {
    button.disabled = true;
    await registerUser(data);
    // Clear the form after successful registration
    form.reset();
  } catch (error) {
    console.error("Error registering user:", error);
    renderErrorMessage(form, error.message);
  } finally {
    button.disabled = false;
    renderSuccessMessage(form, "Registration successful! You can now log in.");
    setTimeout(() => {
      window.location.href = "/login/"; // Redirect to login page after success
    }, 2000); // Redirect after 2 seconds
  }
}
