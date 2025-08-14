import { baseUrl } from "../constants/constants.js";
import { fetchOptions } from "../utils/fetchOptions.js";

export async function fetchProfileDetails(url) {
  const options = fetchOptions("GET");

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Registration failed");
  }
  return json;
}
