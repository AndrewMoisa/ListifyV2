export function renderModalForm(container) {
  // Clear container
  container.innerHTML = "";

  // Create Edit Profile button
  const openModalBtn = document.createElement("button");
  openModalBtn.id = "open-modal-btn";
  openModalBtn.className =
    "text-sm bg-primary text-white hover:bg-primary-hover rounded-md px-2 py-1 transition duration-200 md:px-3 md:py-2 hidden";
  openModalBtn.textContent = "Edit Profile";

  // Create modal container
  const profileModal = document.createElement("div");
  profileModal.id = "profile-modal";
  profileModal.className =
    "fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center hidden z-50";

  // Create modal content
  const profileForm = document.createElement("div");
  profileForm.id = "profile-form";
  profileForm.className =
    "bg-white rounded-lg shadow-lg p-4 w-full max-w-md m-2";

  // Create header section
  const headerDiv = document.createElement("div");
  headerDiv.className = "flex justify-between items-center mb-4";

  const heading = document.createElement("h2");
  heading.className = "text-xl font-semibold";
  heading.textContent = "Edit Profile";

  const closeBtn = document.createElement("button");
  closeBtn.id = "close-modal-btn";
  closeBtn.className = "text-gray-500 hover:text-gray-700 text-2xl";
  closeBtn.innerHTML = "&times;";

  headerDiv.appendChild(heading);
  headerDiv.appendChild(closeBtn);

  // Create form
  const form = document.createElement("form");
  form.id = "register-form";
  form.className = "space-y-4";

  // Image URL field
  const imageDiv = document.createElement("div");

  const imageLabel = document.createElement("label");
  imageLabel.htmlFor = "image";
  imageLabel.className = "block text-sm font-medium text-gray-700";
  imageLabel.textContent = "Profile Image URL";

  const imageInput = document.createElement("input");
  imageInput.type = "text";
  imageInput.id = "image";
  imageInput.name = "avatar";
  imageInput.placeholder = "Image URL";
  imageInput.className =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder:text-sm";

  imageDiv.appendChild(imageLabel);
  imageDiv.appendChild(imageInput);

  // Banner URL field
  const bannerDiv = document.createElement("div");

  const bannerLabel = document.createElement("label");
  bannerLabel.htmlFor = "banner";
  bannerLabel.className = "block text-sm font-medium text-gray-700";
  bannerLabel.textContent = "Profile Banner URL";

  const bannerInput = document.createElement("input");
  bannerInput.type = "text";
  bannerInput.id = "banner";
  bannerInput.name = "banner";
  bannerInput.placeholder = "Banner URL";
  bannerInput.className =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder:text-sm";

  bannerDiv.appendChild(bannerLabel);
  bannerDiv.appendChild(bannerInput);

  // Bio field
  const bioDiv = document.createElement("div");

  const bioLabel = document.createElement("label");
  bioLabel.htmlFor = "bio";
  bioLabel.className = "block text-sm font-medium text-gray-700";
  bioLabel.textContent = "Description";

  const bioTextarea = document.createElement("textarea");
  bioTextarea.id = "bio";
  bioTextarea.name = "bio";
  bioTextarea.rows = 3;
  bioTextarea.placeholder = "Update your bio here";
  bioTextarea.className =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder:text-sm";

  bioDiv.appendChild(bioLabel);
  bioDiv.appendChild(bioTextarea);

  // Help text
  const helpText = document.createElement("p");
  helpText.className = "text-xs";
  helpText.textContent = "You can update your profile information here.";

  // Submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className =
    "w-full bg-primary text-white hover:bg-primary-hover rounded-md py-2 transition duration-200";
  submitButton.textContent = "Edit";

  // Error message container
  const errorDiv = document.createElement("div");
  errorDiv.id = "form-error-message";

  // Assemble form
  form.appendChild(imageDiv);
  form.appendChild(bannerDiv);
  form.appendChild(bioDiv);
  form.appendChild(helpText);
  form.appendChild(submitButton);
  form.appendChild(errorDiv);

  // Assemble modal
  profileForm.appendChild(headerDiv);
  profileForm.appendChild(form);
  profileModal.appendChild(profileForm);

  // Add elements to container
  container.appendChild(openModalBtn);
  container.appendChild(profileModal);

  // Initialize modal functionality
  formModal();
}

function formModal() {
  const openModalBtn = document.getElementById("open-modal-btn");
  const profileModal = document.getElementById("profile-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");

  // Open modal
  openModalBtn.addEventListener("click", () => {
    profileModal.classList.remove("hidden");
  });

  // Close modal
  function closeModal() {
    profileModal.classList.add("hidden");
  }

  closeModalBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside
  profileModal.addEventListener("click", (e) => {
    if (e.target === profileModal) {
      closeModal();
    }
  });
}
