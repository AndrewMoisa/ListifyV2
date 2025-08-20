import { deleteListing } from "../../api/deleteListing.js";
import { getQueryParam } from "../../../logic/utils/getQueryParam.js";
import { renderSuccessMessage } from "../../../ui/shared/displayMessage.js";
import { getUsername } from "../../utils/storage.js";
import { renderActionBtns } from "../../../ui/listings/adDetails/renderActionsBtns.js";

export async function deleteListingHandler(data) {
  try {
    // render UI
    const container = document.querySelector("#action-buttons");
    renderActionBtns(container, data);

    const id = getQueryParam("id");

    const deleteBtn = document.querySelector("#delete-listing");

    deleteBtn.addEventListener("click", async () => {
      const deleted = await deleteListing(id);

      console.log("Delete response:", deleted);
      if (deleted.success) {
        container.innerHTML = "";
        renderSuccessMessage(container, "Listing deleted successfully.");
        // Optionally, redirect or clear the details view
        setTimeout(() => {
          window.location.href = "/profile/";
        }, 2000);
      }
    });
  } catch (error) {
    console.error("Error deleting listing:", error);
  }
}
