import { listingsUrl } from "../../logic/constants/constants.js";

export async function deleteListing(id) {
  const token =
    typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${listingsUrl}/${id}`, {
    method: "DELETE",
    headers: headers,
  });

  return { success: true };
}
