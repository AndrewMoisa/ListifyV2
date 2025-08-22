import { fetchSearch } from "../../../logic/api/fetchSearch.js";
import { renderListings } from "../../../ui/listings/renderListings.js";
import { renderErrorMessage } from "../../../ui/shared/displayMessage.js";
import { debounce } from "../../utils/debounce.js";
import { resetPagination } from "../../utils/resetPagination.js";
import { loadMoreBtn } from "../../../logic/shared/loadMoreBtn.js";

export function searchHandler() {
  const searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-button");
  const listingsContainer = document.querySelector("#listings-container");
  const btnContainer = document.querySelector("#load-more-container");
  const container = document.querySelector("section");

  if (!searchInput || !searchButton || !listingsContainer) {
    console.error("Search elements not found");
    return;
  }

  let currentQuery = "";
  let currentPage = 1;

  const handleSearch = async () => {
    const query = searchInput.value.trim();
    if (!query) {
      searchInput.placeholder = "Please enter a search query";
      return;
    }

    // Reset pagination for new search
    resetPagination(currentPage);
    currentQuery = query;
    currentPage = 1;

    // Disable button and show loading state
    searchButton.disabled = true;
    searchButton.innerHTML = "Searching...";

    try {
      const result = await fetchSearch(query, 20, currentPage);
      const { data: searchPosts, meta: metaPagination } = result;
      listingsContainer.innerHTML = "";

      renderListings(searchPosts, listingsContainer);

      // Add "Load More" button for search results
      loadMoreBtn(metaPagination, 20, async (numberOfListings, pageId) => {
        currentPage = pageId; // Update search-specific page
        const result = await fetchSearch(
          currentQuery,
          numberOfListings,
          pageId
        );
        const { data: morePosts } = result;
        renderListings(morePosts, listingsContainer);
      });

      searchInput.value = "";
      searchInput.placeholder = "Search...";
    } catch (error) {
      console.error("Error fetching search results:", error);
      btnContainer.innerHTML = "";
      listingsContainer.innerHTML = "";
      renderErrorMessage(container, error.message);
    } finally {
      // Restore button state
      searchButton.disabled = false;
      searchButton.textContent = "Search";
    }
  };

  // Debounced click and Enter key handlers
  const debouncedHandleSearch = debounce(handleSearch, 300);
  searchButton.addEventListener("click", debouncedHandleSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") debouncedHandleSearch();
  });

  searchInput.addEventListener("focus", () => {
    searchInput.placeholder = "Search...";
  });
}
