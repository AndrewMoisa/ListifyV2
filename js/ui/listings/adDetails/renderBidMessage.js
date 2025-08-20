export function renderBidInfo(bid) {
  const bidContainer = document.getElementById("bid-message");
  if (bid.errors && bid.errors.length > 0) {
    const bidResponse = bid.errors[0].message;

    bidContainer.innerHTML = "";

    // render Message
    const div = document.createElement("div");
    div.className = "border-t border-gray-300 py-2";

    const p = document.createElement("p");

    p.className = "text-error";
    p.textContent = bidResponse;

    div.appendChild(p);
    bidContainer.appendChild(div);
  } else {
    // render success message
    const div = document.createElement("div");
    div.className = "border-t border-gray-300 py-2";
    const p = document.createElement("p");
    p.className = "text-success";
    p.textContent = "Bid placed successfully!";
    div.appendChild(p);
    bidContainer.appendChild(div);
  }
}
