import { createListing } from "../../api/createListing.js";
import {
  renderErrorMessage,
  renderSuccessMessage,
} from "../../../ui/shared/displayMessage.js";

export async function createListingsHandler() {
  const form = document.querySelector("#listing-form");

  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();

  const button = document.querySelector("#create-button");

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log("Form data:", data);

  // Convert the date to ISO format
  const endsAtInput = form.querySelector("#endsAt");
  data.endsAt = new Date(endsAtInput.value).toISOString();

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
    await createListing(data);
    // Clear the form after successful registration
    // form.reset();
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
