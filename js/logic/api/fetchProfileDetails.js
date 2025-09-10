import { baseUrl } from "../constants/constants.js";

export async function fetchProfileDetails(url) {
  const token = localStorage.getItem("token");

  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`/.netlify/functions/api?endpoint=${url}`, {
    method: "GET",
    headers: headers,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Error creating listing: ${json.errors?.[0]?.message}`);
  }

  return json;
}
