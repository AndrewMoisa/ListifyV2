import { debounce } from "../../logic/utils/debounce.js";

export function loadMoreBtn(metaPagination, numberOfListings, listingsHandler) {
  const loadMoreContainer = document.getElementById("load-more-container");
  if (!loadMoreContainer) {
    console.error("Load more container not found");
    return;
  }

  // Clear previous button
  loadMoreContainer.innerHTML = "";

  // Don't create button if on the last page
  if (metaPagination.isLastPage) {
    return;
  }

  // Create "Load More" button
  const loadMoreButton = document.createElement("button");
  loadMoreButton.textContent = "Load More";
  loadMoreButton.className = "bg-primary text-white rounded-sm px-4 py-2 mt-4";
  loadMoreButton.setAttribute("aria-label", "Load more listings");
  loadMoreContainer.appendChild(loadMoreButton);

  // Add debounced click event listener
  loadMoreButton.addEventListener(
    "click",
    debounce(async () => {
      // Disable button and show loading state
      loadMoreButton.disabled = true;
      loadMoreButton.setAttribute("aria-disabled", "true");
      loadMoreButton.textContent = "Loading...";

      try {
        // Increment page and fetch next listings
        await listingsHandler(numberOfListings, metaPagination.currentPage + 1);
      } catch (error) {
        console.error("Error loading more listings:", error);
      } finally {
        // Restore button state
        loadMoreButton.disabled = false;
        loadMoreButton.setAttribute("aria-disabled", "false");
        loadMoreButton.textContent = "Load More";
      }
    }, 300) // 300ms debounce window
  );
}
