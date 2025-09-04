import { registerUser } from "../../logic/api/registerUser.js";
import {
  renderErrorMessage,
  renderSuccessMessage,
} from "../../ui/shared/displayMessage.js";
import { setupFormValidation } from "../utils/formUtils.js";

export function registerHandler() {
  const form = document.querySelector("#register-form");

  if (form) {
    form.addEventListener("submit", submitForm);
    setupFormValidation(form, "button", "input, textarea");
  }
}

async function submitForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const button = form.querySelector("button");

  try {
    button.disabled = true;
    await registerUser(data);
    form.reset();
    renderSuccessMessage(form, "Registration successful! You can now log in.");
    setTimeout(() => {
      window.location.href = "/login/"; // Redirect to login page after success
    }, 2000); // Redirect after 2 seconds
  } catch (error) {
    console.error("Error registering user:", error);
    renderErrorMessage(form, error.message);
  } finally {
    button.disabled = false;
  }
}
