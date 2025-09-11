import { modalHandler } from "../../../logic/shared/modalHandler.js";
import { startCountdown } from "../../../logic/utils/getTimeRemaining.js";
import { getBids } from "../../../logic/utils/getBids.js";

export async function renderAdDetails(data, container) {
  const adTitle = document.getElementById("ad-title");
  const titleContainer = document.getElementById("ad-title-section");
  const title = data.title || "Ad Title";
  adTitle.textContent = data.title || "Ad Title";
  const description = data.description || "No description available.";
  const imageUrl = data.media?.[0]?.url || "../assets/placeholder-image.png";
  const bids = getBids(data.bids);
  const lastFiveBids = bids.slice(-5);
  let currentBid = bids.slice(-1)[0]?.amount;
  if (!currentBid) {
    currentBid = 0;
  }
  const endsAt = data.endsAt;

  createAuctionDisplay(
    titleContainer,
    container,
    data,
    imageUrl,
    title,
    currentBid,
    lastFiveBids,
    description,
    endsAt
  );
}

function createAuctionDisplay(
  titleContainer,
  container,
  data,
  imageUrl,
  title,
  currentBid,
  bids,
  description,
  endsAt
) {
  // Create seller link for titleContainer
  const sellerLink = document.createElement("a");
  sellerLink.className =
    "text-lg font-semibold text-text-primary mb-2 underline inline-block";
  sellerLink.href = `/profile/?name=${data.seller.name}`; // Sanitize URL parameter
  sellerLink.textContent = `Seller: ${data.seller.name}`;
  titleContainer.appendChild(sellerLink);

  // Create image container
  const imageContainer = document.createElement("div");
  imageContainer.className = "xl:grow xl:basis-1/2";

  const auctionImage = document.createElement("img");
  auctionImage.className =
    "w-full lg:max-w-full h-96 lg:h-[600px] object-contain rounded-lg bg-gray-100 hover:transform hover:scale-105 transition-transform duration-300 hover:cursor-pointer hover:opacity-80";
  auctionImage.id = "auction-image";
  auctionImage.src = imageUrl;
  auctionImage.alt = title;
  imageContainer.appendChild(auctionImage);

  // Create modal
  const modal = document.createElement("div");
  modal.id = "image-modal";
  modal.className =
    "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 hidden";

  const modalInner = document.createElement("div");
  modalInner.className = "relative max-w-4xl w-full p-4";

  const closeButton = document.createElement("button");
  closeButton.id = "close-modal";
  closeButton.className =
    "absolute top-2 right-5 text-white text-4xl font-bold hover:text-gray-300 hover:cursor-pointer";
  closeButton.textContent = "×"; // Use textContent instead of innerHTML
  modalInner.appendChild(closeButton);

  const modalImage = document.createElement("img");
  modalImage.id = "modal-image";
  modalImage.src = imageUrl;
  modalImage.alt = `Expanded view of ${title}`;
  modalImage.className =
    "w-full max-h-[90vh] object-contain rounded-lg bg-black";
  modalInner.appendChild(modalImage);

  modal.appendChild(modalInner);

  // Create details container
  const detailsContainer = document.createElement("div");
  detailsContainer.className = "xl:grow xl:basis-1/2 mt-2";

  // Create bid info section
  const bidInfo = document.createElement("div");
  bidInfo.className =
    "flex justify-between items-center bg-background p-4 rounded";

  const highestBid = document.createElement("p");
  const highestBidText = document.createElement("span");
  highestBidText.textContent = "Highest Bid: ";
  const highestBidAmount = document.createElement("span");
  highestBidAmount.className = "block text-accent";
  highestBidAmount.textContent = `${currentBid} NOK`;
  highestBid.appendChild(highestBidText);
  highestBid.appendChild(highestBidAmount);
  bidInfo.appendChild(highestBid);

  const endsIn = document.createElement("p");
  const endsInText = document.createElement("span");
  endsInText.textContent = "Ends In: ";
  const timeRemaining = document.createElement("span");
  const timeLeft = startCountdown(endsAt, timeRemaining);

  timeRemaining.className = "block text-secondary";
  timeRemaining.textContent = timeLeft ? timeLeft : "Expired";
  endsIn.appendChild(endsInText);
  endsIn.appendChild(timeRemaining);
  bidInfo.appendChild(endsIn);

  // Create action buttons container
  const actionButtons = document.createElement("div");
  actionButtons.className = "flex justify-around";
  actionButtons.id = "action-buttons";

  // Create bid input section
  const bidSection = document.createElement("div");
  bidSection.className = "mt-4 border-y-2 border-gray-300 py-4";

  const bidInput = document.createElement("input");
  bidInput.type = "number";
  bidInput.name = "bid";
  bidInput.id = "bid";
  bidInput.placeholder = `Suggested bid: ${currentBid + 10} NOK`;
  bidInput.required = true;
  bidInput.className = "border p-2 rounded w-full border-b-2 border-gray-300";
  // Add a visually hidden label for accessibility
  const bidInputLabel = document.createElement("label");
  bidInputLabel.htmlFor = "bid";
  bidInputLabel.textContent = "Enter your bid amount";
  bidInputLabel.className = "sr-only"; // Assumes Tailwind or similar for screen-reader only
  bidSection.appendChild(bidInputLabel);

  bidSection.appendChild(bidInput);

  const placeBidButton = document.createElement("button");
  placeBidButton.type = "submit";
  placeBidButton.id = "place-bid";
  placeBidButton.className =
    "mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition w-full";
  placeBidButton.textContent = "Place Bid";
  bidSection.appendChild(placeBidButton);

  const bidMessage = document.createElement("div");
  bidMessage.id = "bid-message";
  bidSection.appendChild(bidMessage);

  // Create location section
  const locationSection = document.createElement("div");
  locationSection.className = "border-b-2 border-gray-300 p-4";

  const locationText = document.createElement("p");
  locationText.className = "text-gray-700 text-center";

  const locationSpan = document.createElement("span");
  locationSpan.textContent = "Item is located in Oslo, Norway";
  locationText.appendChild(locationSpan);
  locationSection.appendChild(locationText);

  // Create bid history section
  const bidHistorySection = document.createElement("div");
  const bidHistoryTitle = document.createElement("h2");
  bidHistoryTitle.className =
    "text-base font-semibold text-text-primary m-2 uppercase";
  bidHistoryTitle.textContent = "Bid History";
  bidHistorySection.appendChild(bidHistoryTitle);

  const bidList = document.createElement("ul");
  bidList.className = "mt-2 flex-col justify-between";
  bidList.id = "bid-history";

  if (bids.length > 0) {
    bids.forEach((bid) => {
      const bidItem = document.createElement("li");
      bidItem.className = "py-1 flex justify-between";

      const bidderName = document.createElement("span");
      bidderName.textContent = bid.name;
      bidItem.appendChild(bidderName);

      const bidAmount = document.createElement("span");
      bidAmount.className = "text-accent";
      bidAmount.textContent = bid.amount + " NOK";
      bidItem.appendChild(bidAmount);

      bidList.appendChild(bidItem);
    });
  } else {
    const noBids = document.createElement("li");
    noBids.className = "py-1 flex justify-between";
    noBids.textContent = "No bids yet.";
    bidList.appendChild(noBids);
  }
  bidHistorySection.appendChild(bidList);

  // Create description section
  const descriptionSection = document.createElement("div");
  const descriptionTitle = document.createElement("h2");
  descriptionTitle.className =
    "text-base font-semibold text-text-primary m-2 uppercase";
  descriptionTitle.textContent = "Description";
  descriptionSection.appendChild(descriptionTitle);

  const descriptionText = document.createElement("p");
  descriptionText.className = "text-gray-700";
  descriptionText.textContent = description;
  descriptionSection.appendChild(descriptionText);

  // Append all sections to details container
  detailsContainer.appendChild(bidInfo);
  detailsContainer.appendChild(actionButtons);
  detailsContainer.appendChild(bidSection);
  detailsContainer.appendChild(locationSection);
  detailsContainer.appendChild(bidHistorySection);
  detailsContainer.appendChild(descriptionSection);

  // Append all to main container
  container.appendChild(imageContainer);
  container.appendChild(modal);
  container.appendChild(detailsContainer);

  // Call modal handler
  modalHandler();
}
