import { fetchProfileDetails } from "../../api/fetchProfileDetails.js";
import { getUsername } from "../../utils/storage.js";
import { renderProfileDetails } from "../../../ui/profile/renderProfileDetails.js";
import { baseUrl } from "../../constants/constants.js";
import { getQueryParam } from "../../utils/getQueryParam.js";
import { renderErrorMessage } from "../../../ui/shared/displayMessage.js";

export async function profileDetailsHandler() {
  const container = document.querySelector("#profile-details");

  const userName = getUsername();
  const queryParams = getQueryParam("name");

  let url = `${baseUrl}profiles/${userName}?&_listings=true&_wins=true`;
  try {
    if (!container) {
      console.error("Profile details container not found in DOM");
      return;
    }

    if (queryParams) {
      url = `${baseUrl}profiles/${queryParams}?&_listings=true&_wins=true`;
    }

    if (!userName && !queryParams) {
      throw new Error(
        "No username provided. Please log in or specify a profile."
      );
    }

    const profileDetails = await fetchProfileDetails(url);

    if (!profileDetails || !profileDetails.data) {
      throw new Error("Profile details not found");
    }
    container.innerHTML = "";
    renderProfileDetails(profileDetails.data, container);

    const btn = document.getElementById("open-modal-btn");
    if (userName === profileDetails.data.name) {
      btn.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error fetching profile details:", error);
    container.innerHTML = "";
    renderErrorMessage(container, error.message);
  }
}
