import { fetchSearch } from "../../../logic/api/fetchSearch.js";
import { renderListings } from "../../../ui/listings/renderListings.js";
import { renderErrorMessage } from "../../../ui/shared/displayMessage.js";
import { debounce } from "../../utils/debounce.js";
import { loadMoreBtn } from "../../../logic/shared/loadMoreBtn.js";
import { loadingSpinner } from "../../../ui/utils/loadingSpinner.js";

export function searchHandler() {
  const searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-button");
  const listingsContainer = document.querySelector("#listings-container");
  const btnContainer = document.querySelector("#load-more-container");
  const errorDiv = document.getElementById("error-message");
  const loadMoreContainer = document.getElementById("load-more-container");

  if (!searchInput || !searchButton || !listingsContainer) {
    console.error("Search elements not found");
    return;
  }

  // Search state management
  const searchState = {
    currentQuery: "",
    currentPage: 1,
    isSearching: false,
    reset() {
      this.currentPage = 1;
    },
  };

  const handleSearch = async () => {
    const query = searchInput.value.trim();

    // Validate input
    if (!query || query.length < 2) {
      errorDiv.innerHTML = "Please enter at least 2 characters";
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

    // Show loading indicator
    loadingSpinner(errorDiv);

    try {
      errorDiv.innerHTML = "";
      const result = await fetchSearch(query, 20, searchState.currentPage);
      const { data: searchPosts, meta: metaPagination } = result;
      listingsContainer.innerHTML = "";

      // Handle empty results
      if (searchPosts.length === 0) {
        loadMoreContainer.innerHTML = "";
        errorDiv.innerHTML = `
          <div class="text-center py-8 ">
            <p class="text-gray-500">No results found for "${query}"</p>
            <button id="clear-search" class="mt-4 text-primary">Clear search</button>
          </div>`;
        document
          .getElementById("clear-search")
          .addEventListener("click", () => {
            searchInput.value = "";
            searchInput.focus();
          });
        return;
      }

      renderListings(searchPosts, listingsContainer);

      // Add "Load More" button for search results
      loadMoreBtn(metaPagination, 20, async (numberOfListings, pageId) => {
        searchState.currentPage = pageId;
        try {
          const result = await fetchSearch(
            searchState.currentQuery,
            numberOfListings,
            pageId
          );
          const { data: morePosts } = result;
          renderListings(morePosts, listingsContainer);
        } catch (error) {
          renderErrorMessage(
            errorDiv,
            "Error loading more results: " + error.message
          );
        }
      });

      searchInput.value = "";
      searchInput.placeholder = "Search...";
    } catch (error) {
      console.error("Error fetching search results:", error);
      btnContainer.innerHTML = "";
      listingsContainer.innerHTML = "";
      errorDiv.innerHTML = "";
      renderErrorMessage(errorDiv, error.message);
    } finally {
      // Restore button state
      searchButton.disabled = false;
      searchButton.textContent = "Search";
      searchState.isSearching = false;
    }
  };

  // Debounced click and Enter key handlers
  const debouncedHandleSearch = debounce(handleSearch, 300);
  searchButton.addEventListener("click", debouncedHandleSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") debouncedHandleSearch();
  });
}
