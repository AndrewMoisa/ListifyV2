import {
  renderErrorMessage,
  renderSuccessMessage,
} from "../../../ui/shared/displayMessage.js";
import { editListing } from "../../api/editListing.js";
import { getQueryParam } from "../../../logic/utils/getQueryParam.js";
import { renderListingForm } from "../../../ui/listings/renderListingForm.js";
import { processMedia } from "../../utils/processMedia.js";
import { setupFormValidation } from "../../utils/formUtils.js";

export async function editListingsHandler() {
  renderListingForm("Edit");
  // Remove 'required' attributes for editing
  document.getElementById("title").removeAttribute("required");
  document.getElementById("tags").removeAttribute("required");
  document.getElementById("mediaUrl").removeAttribute("required");
  document.getElementById("mediaAlt").removeAttribute("required");
  document.getElementById("description").removeAttribute("required");
  document.getElementById("endsAt").removeAttribute("required");

  const form = document.querySelector("#listing-form");

  if (form) {
    form.addEventListener("submit", submitForm);
    setupFormValidation(form, "#create-button", "input, textarea, select");
  }
}

async function submitForm(event) {
  event.preventDefault();
  const dataId = getQueryParam("id");
  console.log("Data ID from query:", dataId);
  const button = document.querySelector("#create-button");
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Convert the date to ISO format
  const endsAtInput = form.querySelector("#endsAt");
  if (endsAtInput.value) {
    data.endsAt = new Date(endsAtInput.value).toISOString();
  } else {
    delete data.endsAt;
  }

  if (typeof data.tags === "string") {
    data.tags = data.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean); // Remove empty strings
  }

  processMedia(data);

  try {
    button.disabled = true;
    button.textContent = "Saving...";
    await editListing(data, dataId);
    // Clear the form after successful registration
    form.reset();
    renderSuccessMessage(form, "Listing updated successfully!");
    setTimeout(() => {
      window.location.href = "/listings/ad.html?id=" + dataId; // Redirect to listings page after success
    }, 1500); // Redirect after 1.5 seconds
  } catch (error) {
    console.error("Error updating listing:", error);
    renderErrorMessage(form, error.message);
  } finally {
    button.disabled = false;
    button.textContent = "Edit";
  }
}
