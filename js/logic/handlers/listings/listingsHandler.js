import { fetchListings } from "../../api/fetchListings.js";
import { renderListings } from "../../../ui/listings/renderListings.js";
import { renderErrorMessage } from "../../../ui/shared/displayMessage.js";
import { loadMoreBtn } from "../../../logic/shared/loadMoreBtn.js";

// Store pagination state in memory
let currentPage = 1;

export async function listingsHandler(
  numberOfListings = 4,
  pageId = currentPage
) {
  try {
    const container = document.getElementById("listings-container");
    if (!container) {
      throw new Error("Listings container not found");
    }

    // Fetch listings with the specified limit and page
    const listingsIndex = await fetchListings(numberOfListings, pageId);
    const { data: listings, meta: metaPagination } = listingsIndex;

    // Clear container only on the first page to avoid removing existing listings
    if (pageId === 1) {
      container.innerHTML = "";
    }

    // Render listings
    renderListings(listings, container);

    // Handle load more button
    loadMoreBtn(metaPagination, numberOfListings, listingsHandler);
  } catch (error) {
    console.error("Error fetching listings:", error);
    // Display error to user
    const container = document.querySelector("section");
    const containerListings = document.getElementById("listings-container");
    containerListings.innerHTML = "";
    renderErrorMessage(container, error.message);
  }
}
