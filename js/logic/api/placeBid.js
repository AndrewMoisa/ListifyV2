import { listingsUrl } from "../../logic/constants/constants.js";
import { bearerToken } from "../../logic/constants/constants.js";

export async function placeBid(id, data) {
  const token = bearerToken;

  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${listingsUrl}/${id}/bids`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (response.status === 401) {
    throw new Error("Unauthorized: Please log in to place a bid.");
  }

  if (!response.ok) {
    throw new Error(`Error placing bid: ${json.errors?.[0]?.message}`);
  }

  return json;
}
