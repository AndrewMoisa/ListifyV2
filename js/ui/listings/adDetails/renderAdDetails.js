import { getTimeRemaining } from "../../../logic/utils/getTimeRemaining.js";

export async function renderAdDetails(data, container) {
  const adTitle = document.getElementById("ad-title");
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

  container.innerHTML = ` 
    
        <img
          class="w-full lg:max-w-2xl max-h-full bg-cover rounded-lg mb-4"
          src="${imageUrl}" 
          alt="${title}"
        />
        <a class="text-lg font-semibold text-text-primary mb-2 underline" href="/profile/?name=${
          data.seller.name
        }">Seller: ${data.seller.name}</a>
        <div class="w-full lg:w-1/2">
          <section
            class="flex justify-between items-center bg-background p-4 rounded"
          >
            <p>Highest Bid: <span class="block text-accent">${currentBid} NOK</span></p>
            <p>
              Ends In: <span class="block text-secondary">${timeRemaining}</span>
            </p>
          </section>
          <form class="mt-4 border-y-2 border-gray-300 py-4">
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
          </form>
          <div class="border-b-2 border-gray-300 p-4">
            <p class="text-gray-700 text-center">
              <img
                src="../assets/pin.png"
                alt="pin icon"
                class="inline w-5 h-5 mr-2"
              />Item is located in Oslo, Norway
            </p>
          </div>
          <section>
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
          </section>
          <section>
            <h2 class="text-base font-semibold text-text-primary m-2 uppercase">
              Description
            </h2>
            <p class="text-gray-700">
              ${description}
            </p>
          </section>
        </div>`;
}
