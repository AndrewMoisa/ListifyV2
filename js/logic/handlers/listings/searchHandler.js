import { fetchSearch } from "../../../logic/api/fetchSearch.js";
import { renderListings } from "../../../ui/listings/renderListings.js";
import {
  renderErrorMessage,
  renderSuccessMessage,
} from "../../../ui/shared/displayMessage.js";
import { debounce } from "../../utils/debounce.js";
import { loadMoreBtn } from "../../../logic/shared/loadMoreBtn.js";
import { loadingSpinner } from "../../../ui/utils/loadingSpinner.js";
import { listingsHandler } from "./listingsHandler.js";

export function searchHandler() {
  const searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-button");
  const listingsContainer = document.querySelector("#listings-container");
  const btnContainer = document.querySelector("#load-more-container");
  const errorDiv = document.getElementById("error-message");

  if (!searchInput || !searchButton || !listingsContainer) {
    console.error("Search elements not found");
    return;
  }

  // Search state management
  const searchState = {
    currentQuery: "",
    currentPage: 1,
    isSearching: false,
    hasSearchResults: false,
    reset() {
      this.currentPage = 1;
    },
  };

  // Function to reset to default listings
  const resetToDefaultListings = () => {
    // Only reload listings if we previously had search results
    if (searchState.hasSearchResults) {
      errorDiv.innerHTML = "";

      // Add loading indicator before fetching default listings
      listingsContainer.innerHTML = "";
      loadingSpinner(listingsContainer);

      // Reset load more button
      btnContainer.innerHTML = "";

      // Reset state and trigger default listings fetch
      searchState.hasSearchResults = false;
      listingsHandler(20, 1);
    }
  };

  const handleSearch = async () => {
    const query = searchInput.value.trim();

    // If input is empty, reset to default listings
    if (!query) {
      resetToDefaultListings();
      return;
    }

    // Validate input length
    if (query.length < 2) {
      errorDiv.innerHTML = "";
      renderErrorMessage(errorDiv, "Please enter at least 2 characters");
      searchInput.focus();
      return;
    }

    // Prevent multiple searches
    if (searchState.isSearching) return;
    searchState.isSearching = true;

    // Reset pagination for new search
    searchState.reset();
    searchState.currentQuery = query;

    // Disable button and show loading state
    searchButton.disabled = true;
    searchButton.innerHTML = "Searching...";

    // Clear previous results and show loading indicator
    errorDiv.innerHTML = "";
    listingsContainer.innerHTML = "";
    btnContainer.innerHTML = "";
    loadingSpinner(listingsContainer);

    try {
      const result = await fetchSearch(query, 20, searchState.currentPage);
      const { data: searchPosts, meta: metaPagination } = result;
      listingsContainer.innerHTML = "";

      // Handle empty results
      if (!searchPosts || searchPosts.length === 0) {
        errorDiv.innerHTML = "";
        renderErrorMessage(errorDiv, `No results found for "${query}"`);
        return;
      }

      // Mark that we have search results
      searchState.hasSearchResults = true;

      // Render results
      renderListings(searchPosts, listingsContainer);

      // Add "Load More" button for search results
      loadMoreBtn(metaPagination, 20, async (numberOfListings, pageId) => {
        searchState.currentPage = pageId;
        try {
          btnContainer.innerHTML = "";
          loadingSpinner(btnContainer);

          const result = await fetchSearch(
            searchState.currentQuery,
            numberOfListings,
            pageId
          );

          btnContainer.innerHTML = "";
          const { data: morePosts } = result;
          renderListings(morePosts, listingsContainer);
        } catch (error) {
          btnContainer.innerHTML = "";
          renderErrorMessage(
            errorDiv,
            "Error loading more results: " + error.message
          );
        }
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
      listingsContainer.innerHTML = "";
      btnContainer.innerHTML = "";
      errorDiv.innerHTML = "";
      renderErrorMessage(errorDiv, error.message);
    } finally {
      // Restore button state
      searchButton.disabled = false;
      searchButton.textContent = "Search";
      searchState.isSearching = false;
    }
  };

  // Debounced search handler - with longer delay for input events
  const debouncedHandleSearch = debounce(handleSearch, 300);
  const debouncedResetSearch = debounce(resetToDefaultListings, 300);

  // Setup click and Enter key handlers
  searchButton.addEventListener("click", debouncedHandleSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") debouncedHandleSearch();
  });

  // Handle input changes separately with different debounce
  searchInput.addEventListener("input", () => {
    // Clear any error messages
    if (errorDiv.innerHTML) {
      errorDiv.innerHTML = "";
    }

    // Check if input is empty and we had search results
    const query = searchInput.value.trim();
    if (query === "" && searchState.hasSearchResults) {
      debouncedResetSearch();
    }
  });
}
