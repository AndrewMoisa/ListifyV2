import { fetchListings } from "../../../api/fetchListings.js";
import { renderListings } from "../../../../ui/listings/renderListings.js";
import { getQueryParam } from "../../../utils/getQueryParam.js";
import { fetchAdDetails } from "../../../api/fetchAdDetails.js";
import { renderAdDetails } from "../../../../ui/listings/adDetails/renderAdDetails.js";
import { placeBidHandler } from "./placeBidHandler.js";
import { deleteListingHandler } from "../deleteListingHandler.js";
import { getUsername } from "../../../utils/storage.js";

export async function adDetailsHandler(numberOfListings = 4) {
  try {
    // render ad details
    const adDetailsContainer = document.getElementById("details-container");
    adDetailsContainer.innerHTML = ""; // Clear previous content
    const listingId = getQueryParam("id");

    if (!listingId) {
      console.error("Listing ID not found in query parameters");
      return;
    }
    const adDetails = await fetchAdDetails(listingId);
    console.log("Fetched ad details:", adDetails.data);
    renderAdDetails(adDetails.data, adDetailsContainer);

    // place bid handler
    const newListingId = adDetails.data.id;
    placeBidHandler(newListingId);

    // delete listing handler
    const dataUser = adDetails.data.seller.name;
    const user = getUsername();

    if (dataUser === user) {
      deleteListingHandler(adDetails.data);
    }

    // Get the container for more listings
    const container = document.getElementById("more-listings");
    container.innerHTML = ""; // Clear previous content
    if (!container) {
      console.error("Listings container not found");
      return;
    }

    const limit = numberOfListings; // Set the limit for listings
    const listingsIndex = await fetchListings(limit);
    renderListings(listingsIndex.data, container);
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
}
