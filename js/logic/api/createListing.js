export async function createListing(data) {
  const token = localStorage.getItem("token");
  if (!token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch("/.netlify/functions/api?endpoint=listings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Error creating listing: ${json.errors?.[0]?.message}`);
  }

  return json;
}
