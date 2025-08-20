import { baseUrl } from "../constants/constants.js";
import { fetchOptions } from "../utils/fetchOptions.js";

export async function updateProfile(data, name) {
  const url = `${baseUrl}profiles/${name}`;

  console.log("Updating profile with data:", data);

  const options = fetchOptions("PUT", data);

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Error updating profile: ${json.errors?.[0]?.message}`);
  }

  console.log("Profile updated successfully:", json);

  return json;
}
