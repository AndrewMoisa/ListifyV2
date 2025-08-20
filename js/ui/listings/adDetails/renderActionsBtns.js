export function renderActionBtns(container, data) {
  container.innerHTML = `
    <a
              type="submit"
                id="edit-listing"
              class="mt-4 bg-accent text-white px-4 py-2 rounded hover:bg-primary-hover transition w-full text-center"
              data-set="${data.id}"
              href="/listings/form/edit.html?id=${data.id}"
            >
              Edit
            </a>
            <button
              type="button"
              id="delete-listing"
              class="mt-4 ml-2 bg-secondary text-white px-4 py-2 rounded hover:bg-primary-hover transition w-full text-center"
              
            >
              Delete
            </button>
            <div id="bid-message"></div>`;
}
