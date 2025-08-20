import {
  renderErrorMessage,
  renderSuccessMessage,
} from "../../../ui/shared/displayMessage.js";
import { editListing } from "../../api/editListing.js";
import { getQueryParam } from "../../../logic/utils/getQueryParam.js";
import { renderListingForm } from "../../../ui/listings/renderListingForm.js";

export async function editListingsHandler() {
  renderListingForm("Edit listing");

  document.getElementById("title").removeAttribute("required");
  document.getElementById("tags").removeAttribute("required");
  document.getElementById("mediaUrl").removeAttribute("required");
  document.getElementById("mediaAlt").removeAttribute("required");
  document.getElementById("description").removeAttribute("required");
  document.getElementById("endsAt").removeAttribute("required");

  const form = document.querySelector("#listing-form");

  if (form) {
    form.addEventListener("submit", submitForm);
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
  console.log("Form data:", data);

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

  if (data.mediaUrl || data.mediaAlt) {
    const mediaItem = {};

    if (data.mediaUrl) {
      mediaItem.url = data.mediaUrl.trim();
    }

    if (data.mediaAlt) {
      mediaItem.alt = data.mediaAlt.trim();
    }

    data.media = [mediaItem]; // Wrap in an array

    delete data.mediaUrl;
    delete data.mediaAlt;
  } else {
    delete data.mediaUrl;
    delete data.mediaAlt;
  }

  try {
    button.disabled = true;
    console.log("Submitting data:", data);
    await editListing(data, dataId);
    // Clear the form after successful registration
    form.reset();
  } catch (error) {
    console.error("Error creating listing:", error);
    renderErrorMessage(form, error.message);
  } finally {
    button.disabled = false;
    renderSuccessMessage(form, "Listing created successfully!");
    // setTimeout(() => {
    //   window.location.href = "/listings/"; // Redirect to listings page after success
    // }, 2000); // Redirect after 2 seconds
  }
}
