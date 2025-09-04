import { deleteListing } from "../../api/deleteListing.js";
import { getQueryParam } from "../../../logic/utils/getQueryParam.js";
import {
  renderSuccessMessage,
  renderErrorMessage,
} from "../../../ui/shared/displayMessage.js";
import { renderActionBtns } from "../../../ui/listings/adDetails/renderActionsBtns.js";

export async function deleteListingHandler(data) {
  const container = document.querySelector("#action-buttons");

  try {
    // render UI
    renderActionBtns(container, data);

    const id = getQueryParam("id");

    const deleteBtn = document.querySelector("#delete-listing");

    const handler = async () => {
      if (!confirm("Are you sure you want to delete this listing?")) return;
      deleteBtn.disabled = true;
      try {
        const deleted = await deleteListing(id);
        if (deleted.success) {
          container.innerHTML = "";
          renderSuccessMessage(container, "Listing deleted successfully.");
          // Optionally, redirect or clear the details view
          setTimeout(() => {
            window.location.href = "/profile/";
          }, 1500);
        } else {
          renderErrorMessage(container, "Failed to delete listing.");
        }
      } catch (error) {
        console.error("Error deleting listing:", error);
        container.innerHTML = "";
        renderErrorMessage(container, error.message);
      } finally {
        deleteBtn.disabled = false;
      }
    };

    deleteBtn.removeEventListener("click", handler);
    deleteBtn.addEventListener("click", handler);
  } catch (error) {
    console.error("Error in deleteListingHandler:", error);
    container.innerHTML = "";
    renderErrorMessage(container, error.message);
  }
}
