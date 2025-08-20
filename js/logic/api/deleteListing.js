import { baseUrl } from "../../logic/constants/constants.js";
import { fetchOptions } from "../../logic/utils/fetchOptions.js";

export async function deleteListing(id) {
  const url = `${baseUrl}listings/${id}`;

  const options = fetchOptions("DELETE");

  const response = await fetch(url, options);

  return { success: true };
}
