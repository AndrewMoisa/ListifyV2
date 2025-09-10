export async function fetchListings(limit = 10, pageId = 1) {
  const token = localStorage.getItem("token");

  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `/.netlify/functions/api?endpoint=listings?limit=${limit}&_bids=true&page=${pageId}&_active=true`,
    {
      method: "GET",
      headers: headers,
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Error creating listing: ${json.errors?.[0]?.message}`);
  }

  return json;
}
