import { profilesUrl } from "../constants/constants.js";
import { bearerToken } from "../constants/constants.js";

export async function updateProfile(data, name) {
  const token = bearerToken;
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${profilesUrl}/${name}`, {
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
