import { baseUrl } from "../../logic/constants/constants.js";

export async function editListing(data, id) {
  const url = `${baseUrl}listings/${id}`;

  const options = fetchOptions("PUT", data);

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Error updating listing: ${json.errors?.[0]?.message}`);
  }

  return json;
}
