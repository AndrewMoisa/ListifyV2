import { fetchProfileDetails } from "../../api/fetchProfileDetails.js";
import { getUsername } from "../../utils/storage.js";
import { renderListings } from "../../../ui/listings/renderListings.js";
import { baseUrl } from "../../constants/constants.js";
import { getQueryParam } from "../../utils/getQueryParam.js";

export async function profileWinsHandler() {
  const userName = getUsername();
  const queryName = getQueryParam("name");

  let url = `${baseUrl}profiles/${userName}/wins`;
  const container = document.querySelector("#won-listings-container");
  try {
    if (!userName) {
      throw new Error("Username not found in storage");
    }

    if (queryName) {
      url = `${baseUrl}profiles/${queryName}/wins`;
    }

    const profileDetails = await fetchProfileDetails(url);

    console.log(profileDetails);

    if (profileDetails.data.length === 0) {
      container.innerHTML +=
        "<p class='text-gray-500'>No won listings found.</p>";
      return;
    }

    renderListings(profileDetails.data, container);

    console.log("Fetched profile details:", profileDetails.data);
  } catch (error) {
    console.error("Error fetching profile details:", error);
  }
}
