import { placeBid } from "../../../api/placeBid.js";

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

      console.log(bidPlaced);

      renderBidInfo(bidPlaced);
    });
  } catch (error) {
    console.error("Error placing bid:", error);
  }
}

function renderBidInfo(bid) {
  console.log("Bid response:", bid);

  if (bid.errors && bid.errors.length > 0) {
    const bidResponse = bid.errors[0].message;

    const bidContainer = document.getElementById("bid-message");
    bidContainer.innerHTML = "";

    // render Message
    const div = document.createElement("div");
    div.className = "border-t border-gray-300 py-2";

    const p = document.createElement("p");

    p.className = "text-gray-700";
    p.textContent = bidResponse;

    div.appendChild(p);
    bidContainer.appendChild(div);
  } else {
    const bidContainer = document.getElementById("bid-message");

    // render success message
    const div = document.createElement("div");
    div.className = "border-t border-gray-300 py-2";
    const p = document.createElement("p");
    p.className = "text-gray-700";
    p.textContent = "Bid placed successfully!";
    div.appendChild(p);
    bidContainer.appendChild(div);
  }
}
