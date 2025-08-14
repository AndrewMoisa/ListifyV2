import { getTimeRemaining } from "../../logic/utils/getTimeRemaining.js";

// Render function stays clean
export async function renderListings(data, container) {
  // container.innerHTML = "";

  data.forEach((listing) => {
    const element = createListingElement(listing);
    container.appendChild(element);
  });
}

// Reusable function to create a listing DOM element
function createListingElement(listing) {
  const listingElement = document.createElement("div");
  listingElement.classList.add(
    "listing-item",
    "p-2",
    "border-1",
    "border-gray-300",
    "rounded-sm",
    "shadow-md"
  );

  const timeRemaining = getTimeRemaining(listing.endsAt);
  const lastBid =
    Array.isArray(listing.bids) && listing.bids.length > 0
      ? listing.bids[listing.bids.length - 1].amount
      : 0;

  // Image
  const img = document.createElement("img");
  img.src = listing.media[0]?.url || "";
  img.alt = listing.media[0]?.alt || "Listing image";
  img.classList.add("w-full", "h-40", "object-cover", "mb-4", "rounded");

  // Title
  const title = document.createElement("h2");
  title.classList.add(
    "font-semibold",
    "text-lg",
    "text-text-primary",
    "mb-2",
    "truncate"
  );
  title.textContent = listing.title;

  // Time remaining
  const timePara = document.createElement("p");
  timePara.classList.add("mt-2", "text-sm", "text-text-primary");
  timePara.textContent = "Time remaining:";

  const timeSpan = document.createElement("span");
  timeSpan.classList.add("font-medium", "block", "text-secondary");
  timeSpan.textContent = timeRemaining;
  timePara.appendChild(timeSpan);

  // Last bid
  const bidPara = document.createElement("p");
  bidPara.classList.add("my-2", "text-sm", "text-text-primary");
  bidPara.textContent = "Last bid: ";

  const bidSpan = document.createElement("span");
  bidSpan.classList.add("font-medium", "block", "text-accent");
  bidSpan.textContent = `${lastBid} - NOK`;
  bidPara.appendChild(bidSpan);

  // View Details link
  const link = document.createElement("a");
  link.href = "/listings/ad.html?id=" + listing.id;
  link.classList.add(
    "text-accent",
    "hover:underline",
    "text-sm",
    "font-medium"
  );
  link.textContent = "View Details";

  // Assemble listing element
  listingElement.appendChild(img);
  listingElement.appendChild(title);
  listingElement.appendChild(timePara);
  listingElement.appendChild(bidPara);
  listingElement.appendChild(link);

  return listingElement;
}
