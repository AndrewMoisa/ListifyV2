import { loginUser } from "../api/loginUser.js";
import { saveToken, saveUsername } from "../utils/storage.js";
import {
  renderSuccessMessage,
  renderErrorMessage,
} from "../../ui/shared/displayMessage.js";

export function loginHandler() {
  const form = document.querySelector("#login-form");

  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  console.log(data);

  const button = form.querySelector("button");
  const messageElement = document.querySelector("#message");

  try {
    button.textContent = "Loading...";
    const response = await loginUser(data);
    console.log(response);
    const { data: userData } = response;

    console.log(userData);
    const { accessToken, name } = userData;

    saveToken(accessToken);
    saveUsername(name);

    renderSuccessMessage(messageElement, "Login successful!");

    setTimeout(() => {
      window.location.href = "../../../listings/"; // Redirect to listings page after successful login
    }, 2000);
  } catch (error) {
    console.error(error);
    renderErrorMessage(messageElement, error.message);
  } finally {
    button.textContent = "Submit";
  }
}
