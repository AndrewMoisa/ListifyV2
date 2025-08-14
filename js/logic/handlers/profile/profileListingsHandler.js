import { fetchProfileDetails } from "../../api/fetchProfileDetails.js";
import { getUsername } from "../../utils/storage.js";
import { renderListings } from "../../../ui/listings/renderListings.js";
import { baseUrl } from "../../constants/constants.js";
import { getQueryParam } from "../../utils/getQueryParam.js";

export async function profileListingsHandler() {
  const userName = getUsername();
  const queryName = getQueryParam("name");

  let url = `${baseUrl}profiles/${userName}/listings`;
  const container = document.querySelector("#bidded-listings-container");

  try {
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

    renderListings(profileDetails.data, container);
  } catch (error) {
    console.error("Error fetching profile details:", error);
  }
}
