import { fetchProfileDetails } from "../../api/fetchProfileDetails.js";
import { getUsername } from "../../utils/storage.js";
import { renderProfileDetails } from "../../../ui/profile/renderProfileDetails.js";
import { baseUrl } from "../../constants/constants.js";
import { getQueryParam } from "../../utils/getQueryParam.js";

export async function profileDetailsHandler() {
  const userName = getUsername();

  const queryParams = getQueryParam("name");

  let url = `${baseUrl}profiles/${userName}?&_listings=true&_wins=true`;
  try {
    if (!userName) {
      throw new Error("Username not found in storage");
    }

    if (queryParams) {
      console.log("Using query param for username:", queryParams);
      url = `${baseUrl}profiles/${queryParams}?&_listings=true&_wins=true`;
    }

    const profileDetails = await fetchProfileDetails(url);
    if (!profileDetails || !profileDetails.data) {
      throw new Error("Profile details not found");
    }

    renderProfileDetails(profileDetails.data);
    console.log("Fetched profile details:", profileDetails.data);
  } catch (error) {
    console.error("Error fetching profile details:", error);
  }
}
