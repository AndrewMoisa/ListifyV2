import { baseUrl } from "../../logic/constants/constants.js";

export async function deleteListing(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `/.netlify/functions/api?endpoint=listings/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Error deleting listing: ${json.errors?.[0]?.message}`);
  }

  return { success: true };
}
