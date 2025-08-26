export function modalHandler() {
  // Elements
  const auctionImage = document.getElementById("auction-image");
  const imageModal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const closeModal = document.getElementById("close-modal");

  // Open modal on image click
  auctionImage.addEventListener("click", () => {
    modalImage.src = auctionImage.src; // ensure correct src
    imageModal.classList.remove("hidden");
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    imageModal.classList.add("hidden");
  });

  // Close when clicking outside image
  imageModal.addEventListener("click", (e) => {
    if (e.target === imageModal) {
      imageModal.classList.add("hidden");
    }
  });
}
