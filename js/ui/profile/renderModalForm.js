export function renderModalForm(container) {
  container.innerHTML = `
    
    <button id="open-modal-btn" class="text-sm bg-primary text-white hover:bg-primary-hover rounded-md px-2 py-1 transition duration-200 md:px-3 md:py-2 hidden">
        Edit Profile
    </button>

    <!-- Modal -->
    <div id="profile-modal" class="fixed inset-0  backdrop-blur-lg bg-opacity-50 flex items-center justify-center hidden">
        <div class="bg-white rounded-lg shadow-lg p-4 w-full max-w-md m-2" id="profile-form">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold">Edit Profile</h2>
                <button id="close-modal-btn" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
           <form id="register-form" class="space-y-4">
            <div>
              <label for="image" class="block text-sm font-medium text-gray-700"
                >Profile Image URL</label
              >
              <input
                type="text"
                id="image"
                name="avatar"
                placeholder="Image URL"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder:text-sm"
              />
            </div>
            <div>
              <label
                for="banner"
                class="block text-sm font-medium text-gray-700"
                >Profile Banner URL</label
              >
              <input
                type="text"
                id="banner"
                name="banner"
                placeholder="Banner URL"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder:text-sm"
              />
            </div>

            <div>
              <label for="bio" class="block text-sm font-medium text-gray-700"
                >Description</label
              >
              <textarea
                id="bio"
                name="bio"
                rows="3"
                placeholder="Update your bio here"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder:text-sm"
              ></textarea>
            </div>
            <p class="text-xs">You can update your profile information here.</p>
            <button
              type="submit"
              class="w-full bg-primary text-white hover:bg-primary-hover rounded-md py-2 transition duration-200"
            >
              Edit
            </button>
            <div id="form-error-message">
            </div>
          </form>
        </div>
    </div>
`;

  formModal();
}

function formModal() {
  const openModalBtn = document.getElementById("open-modal-btn");
  const profileModal = document.getElementById("profile-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  // const cancelBtn = document.getElementById("cancelBtn");
  // const profileForm = document.getElementById("profileForm");

  // Open modal
  openModalBtn.addEventListener("click", () => {
    profileModal.classList.remove("hidden");
  });

  // Close modal
  function closeModal() {
    profileModal.classList.add("hidden");
    // profileForm.reset();
  }

  closeModalBtn.addEventListener("click", closeModal);
  // cancelBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside
  profileModal.addEventListener("click", (e) => {
    if (e.target === profileModal) {
      closeModal();
    }
  });
}
