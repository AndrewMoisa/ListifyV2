export async function handler(event) {
  const apiKey = process.env.API_KEY; // secret
  const baseUrl = process.env.BASE_URL;

  // Extract the endpoint from query params
  const { endpoint, ...otherParams } = event.queryStringParameters || {};

  if (!endpoint) {
    return { statusCode: 400, body: "Missing endpoint" };
  }

  const body = event.body ? JSON.parse(event.body) : null;

  // Forward Authorization header from the frontend if present
  const clientAuth = event.headers.authorization || null;

  const headers = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": apiKey,
  };

  if (clientAuth) {
    headers["Authorization"] = clientAuth; // Bearer token from frontend
  }

  // Build URL with additional query parameters
  let url = `${baseUrl}${endpoint}`;

  // Add other query parameters if they exist
  if (Object.keys(otherParams).length > 0) {
    const queryString = new URLSearchParams(otherParams).toString();
    url += (url.includes("?") ? "&" : "?") + queryString;
  }

  const response = await fetch(url, {
    method: event.httpMethod,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  return {
    statusCode: response.status,
    body: JSON.stringify(data),
  };
}
