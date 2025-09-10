export async function handler(event) {
  const apiKey = process.env.API_KEY; // secret
  const baseUrl = process.env.BASE_URL;

  const endpoint = event.queryStringParameters.endpoint;
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

  const response = await fetch(`${baseUrl}${endpoint}`, {
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
