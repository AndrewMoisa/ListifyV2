import { loginUrl } from "../constants/constants.js";

export async function loginUser(user) {
  const url = loginUrl;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Login failed");
  }
  return json;
}
