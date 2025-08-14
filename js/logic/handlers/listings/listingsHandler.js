import { fetchListings } from "../../api/fetchListings.js";
import { renderListings } from "../../../ui/listings/renderListings.js";

export async function listingsHandler(numberOfListings = 4, pageId = 1) {
  try {
    const container = document.getElementById("listings-container");

    if (!container) {
      console.error("Listings container not found");
      return;
    }

    let limit = numberOfListings; // Set the limit for listings
    numberOfListings = 20; // Set the number of listings per page

    const listingsIndex = await fetchListings(limit, pageId);
    const metaPagination = listingsIndex.meta;
    console.log("Fetched listings:", metaPagination);

    console.log("Fetched limited listings:", listingsIndex.data);
    container.innerHTML = ""; // Clear previous listings

    renderListings(listingsIndex.data, container);

    const isListingsPage =
      window.location.pathname === "/listings/" ||
      window.location.pathname === "/listings/index.html";

    if (isListingsPage) {
      renderPagination(
        metaPagination.pageCount,
        metaPagination.currentPage,
        numberOfListings
      );
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
}

function renderPagination(totalPages, currentPage, numberOfListings) {
  const footer = document.getElementById("pagination-container");
  footer.innerHTML = "";

  const createButton = (label, page, disabled = false, active = false) => {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.className = `
      px-3 py-1 rounded border text-sm
      ${
        active
          ? "bg-blue-500 text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    `;
    if (!disabled && !active) {
      btn.addEventListener("click", () => {
        listingsHandler(numberOfListings, page);
      });
    }
    return btn;
  };

  const createEllipsis = () => {
    const span = document.createElement("span");
    span.innerText = "...";
    span.className = "px-2 text-gray-400 select-none";
    return span;
  };

  // Prev button
  footer.appendChild(createButton("Prev", currentPage - 1, currentPage === 1));

  const maxPagesToShow = 5;
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxPagesToShow - 1);

  if (end - start < maxPagesToShow - 1) {
    start = Math.max(1, end - maxPagesToShow + 1);
  }

  if (start > 1) {
    footer.appendChild(createButton("1", 1));
    if (start > 2) footer.appendChild(createEllipsis());
  }

  for (let i = start; i <= end; i++) {
    footer.appendChild(createButton(i, i, false, i === currentPage));
  }

  if (end < totalPages) {
    if (end < totalPages - 1) footer.appendChild(createEllipsis());
    footer.appendChild(createButton(totalPages, totalPages));
  }

  // Next button
  footer.appendChild(
    createButton("Next", currentPage + 1, currentPage === totalPages)
  );
}
