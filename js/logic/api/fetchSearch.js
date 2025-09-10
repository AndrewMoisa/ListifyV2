import { searchUrl } from "../constants/constants.js";
import { bearerToken } from "../constants/constants.js";

export async function fetchSearch(query, limit = 10, pageId = 1) {
  const token = bearerToken;

  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${searchUrl}?q=${query}&limit=${limit}&page=${pageId}`,
    {
      method: "GET",
      headers: headers,
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Error fetching ad details: ${json.errors?.[0]?.message}`);
  }

  return json;
}
