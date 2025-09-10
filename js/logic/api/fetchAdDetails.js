import { listingsUrl } from "../constants/constants.js";
import { bearerToken } from "../constants/constants.js";

export async function fetchAdDetails(id) {
  const token = bearerToken;

  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${listingsUrl}/${id}?_seller=true&_bids=true`, {
    method: "GET",
    headers: headers,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Error fetching ad details: ${json.errors?.[0]?.message}`);
  }

  return json;
}
