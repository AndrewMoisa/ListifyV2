import { baseUrl } from "../../logic/constants/constants.js";
import { fetchOptions } from "../../logic/utils/fetchOptions.js";

export async function createListing(data) {
  const url = `${baseUrl}listings`;

  const options = fetchOptions("POST", data);

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Error creating listing: ${json.message}`);
  }

  console.log("Listing created successfully:", json);

  return json;
}
