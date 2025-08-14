export function mobileMenuToggle() {
  const toggle = document.getElementById("menu-toggle");
  const hamburger = document.getElementById("hamburger");
  const bars = hamburger.querySelectorAll(".bar");
  const mobileMenu = document.getElementById("mobile-menu");

  toggle.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("hidden");

    if (hamburger.classList.contains("open")) {
      bars[0].classList.add("rotate-45", "translate-y-2", "bg-blue-500");
      bars[1].classList.add("opacity-0");
      bars[2].classList.add("-rotate-45", "-translate-y-2", "bg-blue-500");
    } else {
      bars[0].classList.remove("rotate-45", "translate-y-2", "bg-blue-500");
      bars[1].classList.remove("opacity-0");
      bars[2].classList.remove("-rotate-45", "-translate-y-2", "bg-blue-500");
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !hamburger.contains(event.target) &&
      !mobileMenu.contains(event.target)
    ) {
      hamburger.classList.remove("open");
      mobileMenu.classList.add("hidden");
      bars[0].classList.remove("rotate-45", "translate-y-2", "bg-blue-500");
      bars[1].classList.remove("opacity-0");
      bars[2].classList.remove("-rotate-45", "-translate-y-2", "bg-blue-500");
    }
  });
}

export function changeReview() {
  const slides = document.querySelectorAll(".review-slide");
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function handleChangeReview(direction) {
    current = (current + direction + slides.length) % slides.length;
    showSlide(current);
  }

  const prevBtn = document.getElementById("review-prev");
  const nextBtn = document.getElementById("review-next");
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => handleChangeReview(-1));
    nextBtn.addEventListener("click", () => handleChangeReview(1));
  }

  // Initialize
  showSlide(current);
}
