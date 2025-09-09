export function renderActionBtns(container, data) {
  // Clear the container
  container.innerHTML = "";

  // Create Edit button (anchor)
  const editButton = document.createElement("a");
  editButton.id = "edit-listing";
  editButton.className =
    "mt-4 bg-accent text-white px-4 py-2 rounded hover:bg-primary-hover transition w-full text-center";
  editButton.dataset.set = data.id;
  editButton.href = `/form/edit.html?id=${data.id}`;
  editButton.textContent = "Edit";

  // Create Delete button
  const deleteButton = document.createElement("button");
  deleteButton.id = "delete-listing";
  deleteButton.type = "button";
  deleteButton.className =
    "mt-4 ml-2 bg-secondary text-white px-4 py-2 rounded hover:bg-primary-hover transition w-full text-center";
  deleteButton.textContent = "Delete";

  // Create message container for bid messages
  const bidMessage = document.createElement("div");
  bidMessage.id = "bid-message";

  // Append all elements to the container
  container.appendChild(editButton);
  container.appendChild(deleteButton);
  container.appendChild(bidMessage);
}
