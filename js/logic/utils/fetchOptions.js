import { apiKey } from "../constants/constants.js";
import { bearerToken } from "../constants/constants.js";

export function fetchOptions(
  method = "GET",
  data,
  token = bearerToken,
  setContentType = true
) {
  if (!token) {
    console.log("No token, please log in");
    throw new Error("No token provided");
  }

  const options = {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(data),
  };

  if (setContentType) {
    options.headers["Content-Type"] = "application/json";
  }

  return options;
}
