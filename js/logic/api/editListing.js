import { listingsUrl } from "../constants/constants.js";
import { bearerToken } from "../constants/constants.js";

export async function editListing(data, id) {
  console.log(data);
  const token = bearerToken;
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${listingsUrl}/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Error updating listing: ${json.errors?.[0]?.message}`);
  }

  return json;
}
