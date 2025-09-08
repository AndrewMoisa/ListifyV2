import { getUsername, removeAuthData } from "../utils/storage.js";

export function authUser() {
  const loginLink = document.getElementById("login-link");
  const loginLinkMobile = document.getElementById("login-link-mobile");
  const profileLinkMobile = document.getElementById("profile-link-mobile");
  const profileLink = document.getElementById("profile-link");
  const createListing = document.getElementById("create-listing-link");
  const createListingMobile = document.getElementById(
    "create-listing-link-mobile"
  );

  const userName = getUsername();

  if (userName) {
    loginLink.textContent = "Log Out";
    loginLinkMobile.textContent = "Log Out";

    loginLink.addEventListener("click", () => {
      removeAuthData();
      location.reload();
    });

    loginLinkMobile.addEventListener("click", () => {
      removeAuthData();
      location.reload();
    });

    profileLinkMobile.textContent = userName;
    profileLink.textContent = userName;
  }

  if (!userName) {
    profileLinkMobile.style.display = "none";
    profileLink.style.display = "none";
    createListing.style.display = "none";
    createListingMobile.style.display = "none";
  }
}
