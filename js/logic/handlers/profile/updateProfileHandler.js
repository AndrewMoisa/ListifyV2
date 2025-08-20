import { updateProfile } from "../../api/updateProfile";
import { renderErrorMessage } from "../../../ui/shared/displayMessage";
import { getUsername } from "../../utils/storage";

export function updateProfileHandler() {
  const form = document.querySelector("#update-container");

  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();
  const name = getUsername();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const button = form.querySelector("button");
  console.log("Form data:", data);

  // Transform data to match API structure
  const transformedData = {
    bio: data.bio || "", // Use empty string if bio is undefined
  };

  // Only include avatar if it exists and is not empty
  if (data.avatar && data.avatar !== "") {
    transformedData.avatar = {
      url: data.avatar,
      alt: data.avatarAlt || "", // Use provided alt text or empty string
    };
  }

  // Only include banner if it exists and is not empty
  if (data.banner && data.banner !== "") {
    transformedData.banner = {
      url: data.banner,
      alt: data.bannerAlt || "", // Use provided alt text or empty string
    };
  }

  if (data.bio === "" && data.avatar === "" && data.banner === "") {
    delete data.bio;
    delete data.avatar;
    delete data.banner;
  }

  try {
    button.disabled = true;
    await updateProfile(transformedData, name);
    form.reset();

    renderSuccessMessage(form, "Registration successful! You can now log in.");
    setTimeout(() => {
      window.location.href = "/profile/"; // Redirect to profile page after success
    }, 2000); // Redirect after 2 seconds
  } catch (error) {
    console.error("Error registering user:", error);
    renderErrorMessage(form, error.message);
  } finally {
    button.disabled = false;
  }
}
