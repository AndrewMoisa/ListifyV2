import { fetchSearch } from "../../../logic/api/fetchSearch.js";
import { renderListings } from "../../../ui/listings/renderListings.js";
import { renderErrorMessage } from "../../../ui/shared/displayMessage.js";

export function searchHandler() {
  const searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-button");
  const listingsContainer = document.querySelector("#listings-container");

  let currentQuery = "";
  let scrollControl = null;

  const handleSearch = async () => {
    const query = searchInput.value.trim();
    if (!query) {
      searchInput.placeholder = "Please enter a search query";
      return;
    }

    currentQuery = query;
    listingsContainer.innerHTML = "Loading..."; // Simple loading indicator

    try {
      const searchPosts = await fetchSearchPage(currentQuery, 20, 1);
      listingsContainer.innerHTML = "";
      renderListings(searchPosts, listingsContainer);

      searchInput.value = "";
    } catch (error) {
      listingsContainer.innerHTML = "";
      renderErrorMessage(listingsContainer, "Failed to fetch search results.");
      console.error("Error fetching search results:", error);
    }
  };

  searchButton.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  searchInput.addEventListener("focus", () => {
    searchInput.placeholder = "Search...";
  });

  async function fetchSearchPage(query, page = 1, limit = 10) {
    try {
      const result = await fetchSearch(query, page, limit);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
}
