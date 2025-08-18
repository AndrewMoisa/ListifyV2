import { baseUrl } from "../../logic/constants/constants.js";
import { fetchOptions } from "../../logic/utils/fetchOptions.js";

export async function placeBid(id, data) {
  const url = `${baseUrl}listings/${id}/bids`;

  const options = fetchOptions("POST", data);

  const response = await fetch(url, options);
  const json = await response.json();

  return json;
}
