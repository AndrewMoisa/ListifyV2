export function instantRenderBid(bidAmount) {
  const bidHistoryContainer = document.getElementById("bid-history");
  const bidItem = document.createElement("li");
  bidItem.className = "py-1 flex justify-between";

  const bidderName = document.createElement("span");
  bidderName.textContent = "You";
  bidItem.appendChild(bidderName);

  const bidAmountSpan = document.createElement("span");
  bidAmountSpan.className = "text-accent";
  bidAmountSpan.textContent = bidAmount + " NOK";
  bidItem.appendChild(bidAmountSpan);

  if (bidHistoryContainer) {
    bidHistoryContainer.appendChild(bidItem);
  }
}
