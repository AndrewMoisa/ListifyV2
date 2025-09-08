import { loginUser } from "../api/loginUser.js";
import { saveToken, saveUsername } from "../utils/storage.js";
import {
  renderSuccessMessage,
  renderErrorMessage,
} from "../../ui/shared/displayMessage.js";
import { setupFormValidation } from "../utils/formUtils.js";
import { getUserFriendlyErrorMessage } from "../utils/errorUtils.js";

export function loginHandler() {
  const form = document.querySelector("#login-form");

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
  const messageElement = document.querySelector("#message");

  try {
    button.textContent = "Loading...";
    const response = await loginUser(data);
    const { data: userData } = response;
    const { accessToken, name } = userData;

    saveToken(accessToken);
    saveUsername(name);

    renderSuccessMessage(messageElement, "Login successful!");

    setTimeout(() => {
      window.location.href = "../../../listings/"; // Redirect to listings page after successful login
    }, 2000);
  } catch (error) {
    console.error(error);
    messageElement.innerHTML = "";
    renderErrorMessage(messageElement, getUserFriendlyErrorMessage(error));
  } finally {
    button.textContent = "Submit";
  }
}
