import { updateProfile } from "../../api/updateProfile.js";
import {
  renderErrorMessage,
  renderSuccessMessage,
} from "../../../ui/shared/displayMessage.js";
import { getUsername } from "../../utils/storage.js";
import { renderModalForm } from "../../../ui/profile/renderModalForm.js";
import {
  setupFormValidation,
  transformProfileData,
} from "../../utils/formUtils.js";

export function updateProfileHandler() {
  const profileContainer = document.querySelector("#edit-profile");
  renderModalForm(profileContainer);

  // Set up form after rendering (with a short delay to ensure DOM is ready)
  setTimeout(() => {
    const form = document.querySelector("#register-form");

    // Set up validation with our utility function
    if (form) {
      setupFormValidation(form);
      form.addEventListener("submit", submitForm);
    }
  }, 100);
}

async function submitForm(event) {
  event.preventDefault();
  const name = getUsername();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const button = form.querySelector("button");
  const errorDiv = document.querySelector("#form-error-message");
  const profileForm = document.querySelector("#profile-form");

  // Validate form has at least one value
  if (!data.bio && !data.avatar && !data.banner) {
    renderErrorMessage(errorDiv, "Please fill in at least one field to update");
    return;
  }

  // Transform data using our utility function
  const transformedData = transformProfileData(data);

  try {
    button.disabled = true;
    await updateProfile(transformedData, name);
    form.reset();

    renderSuccessMessage(
      profileForm,
      "Profile edited successfully! Page will refresh."
    );

    setTimeout(() => {
      window.location.href = "/profile/";
    }, 1500);
  } catch (error) {
    console.error("Error updating profile:", error);
    errorDiv.innerHTML = "";
    renderErrorMessage(errorDiv, error.message);
  } finally {
    button.disabled = false;
  }
}
