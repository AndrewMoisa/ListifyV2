import { fetchListings } from "../../../api/fetchListings.js";
import { renderListings } from "../../../../ui/listings/renderListings.js";
import { getQueryParam } from "../../../utils/getQueryParam.js";
import { fetchAdDetails } from "../../../api/fetchAdDetails.js";
import { renderAdDetails } from "../../../../ui/listings/adDetails/renderAdDetails.js";
import { placeBidHandler } from "./placeBidHandler.js";
import { deleteListingHandler } from "../deleteListingHandler.js";
import { getUsername } from "../../../utils/storage.js";
import { renderErrorMessage } from "../../../../ui/shared/displayMessage.js";

export async function adDetailsHandler(numberOfListings = 4) {
  // Get the container for ad details
  const adDetailsContainer = document.getElementById("details-container");

  // Get the container for more listings
  const container = document.getElementById("more-listings");
  try {
    if (!adDetailsContainer || !container) {
      throw new Error("Required DOM elements not found");
    }

    // render ad details
    const listingId = getQueryParam("id");
    if (!listingId) {
      throw new Error("Listing ID not found in query parameters");
    }

    // render ad details
    const adDetails = await fetchAdDetails(listingId);
    console.log("Ad Details:", adDetails);
    adDetailsContainer.innerHTML = ""; // Clear previous content
    renderAdDetails(adDetails.data, adDetailsContainer);

    // place bid handler
    const newListingId = adDetails.data.id;
    await placeBidHandler(newListingId);

    // delete listing handler
    const dataUser = adDetails.data.seller.name;
    const user = getUsername();

    if (dataUser === user) {
      deleteListingHandler(adDetails.data);
    }

    const limit = numberOfListings;
    const listingsResponse = await fetchListings(limit);

    container.innerHTML = ""; // Clear previous content
    renderListings(listingsResponse.data, container);
  } catch (error) {
    console.error("Error in adDetailsHandler:", error);
    adDetailsContainer.innerHTML = "";
    container.innerHTML = "";
    renderErrorMessage(adDetailsContainer, error);
  }
}
