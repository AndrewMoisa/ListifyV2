import { placeBid } from "../../../api/placeBid.js";
import { renderBidInfo } from "../../../../ui/listings/adDetails/renderBidMessage.js";
export async function placeBidHandler(id) {
  try {
    const placeBidBtn = document.getElementById("place-bid");

    placeBidBtn.disabled = false; // Disable the button while processing
    const placeBidInput = document.getElementById("bid");

    placeBidBtn.addEventListener("click", async () => {
      const bidValue = placeBidInput.value;

      const bidAmount = Number(bidValue);
      console.log(bidAmount);

      if (!id) {
        console.error("Listing ID not found in query parameters");
        return;
      }

      const bidPlaced = await placeBid(id, { amount: bidAmount });

      renderBidInfo(bidPlaced);
    });
  } catch (error) {
    console.error("Error placing bid:", error);
  }
}
