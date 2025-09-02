import { createListing } from "../../api/createListing.js";
import {
  renderErrorMessage,
  renderSuccessMessage,
} from "../../../ui/shared/displayMessage.js";
import { renderListingForm } from "../../../ui/listings/renderListingForm.js";
import { processMedia } from "../../utils/processMedia.js";

export async function createListingsHandler() {
  renderListingForm("Create listing");

  const form = document.querySelector("#listing-form");

  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();

  const button = document.querySelector("#create-button");
  const errorDiv = document.querySelector("#error-message");

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Convert the date to ISO format
  const endsAtInput = form.querySelector("#endsAt");
  data.endsAt = new Date(endsAtInput.value).toISOString();

  if (typeof data.tags === "string") {
    data.tags = data.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean); // Remove empty strings
  }

  // Process media fields before sending the data
  processMedia(data);

  try {
    button.disabled = true;
    button.textContent = "Creating...";
    await createListing(data);
    form.reset();
    renderSuccessMessage(form, "Listing created successfully!");
    setTimeout(() => {
      window.location.href = "/profile/"; // Redirect to profile page after success
    }, 2000); // Redirect after 2 seconds
  } catch (error) {
    console.error("Error creating listing:", error);
    errorDiv.innerHTML = "";
    renderErrorMessage(errorDiv, error.message);
  } finally {
    button.disabled = false;
    button.textContent = "Create Listing";
  }
}
