import { getTimeRemaining } from "../../../logic/utils/getTimeRemaining.js";
import { modalHandler } from "../../../logic/shared/modalHandler.js";

export async function renderAdDetails(data, container) {
  const adTitle = document.getElementById("ad-title");
  const titleContainer = document.getElementById("ad-title-section");
  const title = data.title || "Ad Title";
  adTitle.textContent = data.title || "Ad Title";
  const description = data.description || "No description available.";
  const imageUrl = data.media?.[0]?.url || "../assets/placeholder-image.png";
  const currentBid =
    data.bids?.length > 0 ? data.bids[data.bids.length - 1].amount : 0;
  const timeRemaining = getTimeRemaining(data.endsAt);
  const bids =
    data.bids?.map((bid) => ({
      name: bid.bidder.name,
      amount: bid.amount,
    })) || [];

  titleContainer.innerHTML += `
    <a class="text-lg font-semibold text-text-primary mb-2 underline inline-block" href="/profile/?name=${data.seller.name}">Seller: ${data.seller.name}</a>
  `;

  container.innerHTML = `
        <div class="xl:grow xl:basis-1/2">
          <img
             class="w-full lg:max-w-full h-96 lg:h-[600px] object-contain rounded-lg bg-gray-100 hover:transform hover:scale-105 transition-transform duration-300 hover:cursor-pointer hover:opacity-80"
             id="auction-image"
            src="${imageUrl}"
            alt="${title}"
          />
        </div>
        <!-- Modal -->
<div
  id="image-modal"
  class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 hidden"
>
  <div class="relative max-w-4xl w-full p-4">
    <!-- Close Button -->
    <button
      id="close-modal"
      class="absolute top-2 right-5 text-white text-4xl font-bold hover:text-gray-300 hover:cursor-pointer"
    >
      &times;
    </button>

    <!-- Modal Image -->
    <img
      id="modal-image"
      src="${imageUrl}"
      alt="Expanded view of ${title}"
      class="w-full max-h-[90vh] object-contain rounded-lg bg-black"
    />
  </div>
</div>

        <div class="xl:grow xl:basis-1/2 mt-2">
          <div
            class="flex justify-between items-center bg-background p-4 rounded"
          >
            <p>Highest Bid: <span class="block text-accent">${currentBid} NOK</span></p>
            <p>
              Ends In: <span class="block text-secondary">${timeRemaining}</span>
            </p>
          </div>
          <div class="flex justify-around" id="action-buttons">
            
          </div>
          <div class="mt-4 border-y-2 border-gray-300 py-4" >
            <input
              type="number"
              name="bid"
              id="bid"
              placeholder="Suggested bid: ${currentBid + 10} NOK"
              required
              class="border p-2 rounded w-full border-b-2 border-gray-300"
            />
            <button
              type="submit"
                id="place-bid"
              class="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition w-full"
            >
              Place Bid
            </button>
            <div id="bid-message"></div>
          </div>
          <div class="border-b-2 border-gray-300 p-4">
            <p class="text-gray-700 text-center">
              <img
                src="../assets/pin.png"
                alt="pin icon"
                class="inline w-5 h-5 mr-2"
              />Item is located in Oslo, Norway
            </p>
          </div>
          <div>
            <h2 class="text-base font-semibold text-text-primary m-2 uppercase">
              Bid History
            </h2>
            <ul class="mt-2 flex-col justify-between" id="bid-history">
              ${
                bids.length > 0
                  ? bids
                      .map(
                        (bid) => `
                <li class="py-1 flex justify-between">
                  ${bid.name} <span class="text-accent">${bid.amount}</span>
                </li>
              `
                      )
                      .join("")
                  : `<li class="py-1 flex justify-between">
                  No bids yet.
                </li>`
              }
            </ul>
          </div>
          <div>
            <h2 class="text-base font-semibold text-text-primary m-2 uppercase">
              Description
            </h2>
            <p class="text-gray-700">
              ${description}
            </p>
          </div>`;
  modalHandler();
}
