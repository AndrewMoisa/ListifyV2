import { fetchProfileDetails } from "../../api/fetchProfileDetails.js";
import { getUsername } from "../../utils/storage.js";
import { renderListings } from "../../../ui/listings/renderListings.js";
import { baseUrl } from "../../constants/constants.js";
import { getQueryParam } from "../../utils/getQueryParam.js";
import { renderErrorMessage } from "../../../ui/shared/displayMessage.js";

export async function profileListingsHandler() {
  const userName = getUsername();
  const queryName = getQueryParam("name");

  let url = `${baseUrl}profiles/${userName}/listings`;
  const container = document.querySelector("#bid-listings-container");

  try {
    if (!container) {
      throw new Error("Listings container not found in DOM");
    }

    if (!userName) {
      throw new Error("Username not found in storage");
    }

    if (queryName) {
      url = `${baseUrl}profiles/${queryName}/listings`;
    }

    const profileDetails = await fetchProfileDetails(url);

    if (profileDetails.data.length === 0) {
      container.innerHTML = "<p class='text-gray-500'>No listings found.</p>";
      return;
    }

    console.log("Fetched profile details:", profileDetails.data);
    container.innerHTML = "";
    renderListings(profileDetails.data, container);
  } catch (error) {
    console.error("Error fetching profile details:", error);
    container.innerHTML = "";
    renderErrorMessage(container, error.message);
  }
}
