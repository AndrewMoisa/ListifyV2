import { fetchOptions } from "../utils/fetchOptions.js";
import { baseUrl } from "../constants/constants.js";

export async function fetchAdDetails(id) {
  const options = fetchOptions("GET");

  const url = `${baseUrl}listings/${id}?_bids=true&_seller=true`;

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Registration failed");
  }
  return json;
}
