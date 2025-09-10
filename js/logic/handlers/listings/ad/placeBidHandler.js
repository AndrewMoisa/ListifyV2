import { placeBid } from "../../../api/placeBid.js";
import { renderBidInfo } from "../../../../ui/listings/adDetails/renderBidMessage.js";
import { renderErrorMessage } from "../../../../ui/shared/displayMessage.js";
import { instantRenderBid } from "../../../../ui/listings/adDetails/renderInstantBid.js";

export async function placeBidHandler(id) {
  const placeBidBtn = document.getElementById("place-bid");
  const placeBidInput = document.getElementById("bid");
  const bidContainer = document.getElementById("bid-message");

  // Validate DOM elements
  if (!placeBidBtn || !placeBidInput || !bidContainer) {
    throw new Error(
      "Bid button, input field, or bid container not found in DOM"
    );
  }

  // Validate listing ID
  if (!id) {
    throw new Error("Listing ID not provided");
  }

  // Enable button initially
  placeBidBtn.disabled = false;

  // Remove existing listeners to prevent duplication
  const handler = async () => {
    const bidValue = placeBidInput.value;
    const bidAmount = Number(bidValue);

    try {
      // Disable button and show loading state
      placeBidBtn.disabled = true;
      placeBidBtn.textContent = "Placing Bid...";

      const bidPlaced = await placeBid(id, { amount: bidAmount });

      // Instant render bid in bid history
      if (bidPlaced) {
        instantRenderBid(bidAmount);
      }

      renderBidInfo(bidPlaced, bidContainer);

      // Clear input after successful bid
      placeBidInput.value = "";
    } catch (error) {
      console.error("Error placing bid:", error);
      bidContainer.innerHTML = "";
      renderErrorMessage(bidContainer, error.message);
    } finally {
      // Re-enable button
      placeBidBtn.disabled = false;
      placeBidBtn.textContent = "Place Bid";
    }
  };

  // Remove any existing listeners
  placeBidBtn.removeEventListener("click", handler);
  placeBidBtn.addEventListener("click", handler);
}
