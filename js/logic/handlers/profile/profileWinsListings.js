import { fetchProfileDetails } from "../../api/fetchProfileDetails.js";
import { getUsername } from "../../utils/storage.js";
import { renderListings } from "../../../ui/listings/renderListings.js";
import { baseUrl } from "../../constants/constants.js";
import { getQueryParam } from "../../utils/getQueryParam.js";

export async function profileWinsHandler() {
  const userName = getUsername();
  const queryName = getQueryParam("name");
  const container = document.querySelector("#won-listings-container");

  try {
    let url = `profiles/${userName}/wins`;
    if (!container) {
      throw new Error("Container element not found");
    }
    if (!userName) {
      throw new Error("Username not found in storage");
    }

    if (queryName) {
      url = `profiles/${queryName}/wins`;
    }

    const profileDetails = await fetchProfileDetails(url);

    if (profileDetails.data.length === 0) {
      container.innerHTML =
        "<p class='text-gray-500'>No won listings found.</p>";
      return;
    }

    container.innerHTML = "";
    renderListings(profileDetails.data, container);
  } catch (error) {
    console.error("Error fetching profile details:", error);
    container.innerHTML = "";
    renderErrorMessage(container, error.message);
  }
}
