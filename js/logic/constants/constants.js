import { getToken } from "../utils/storage.js";

export const bearerToken = getToken();
export const baseUrl = "/.netlify/functions/api?endpoint=";
export const listingsUrl = `${baseUrl}listings`;
export const profilesUrl = `${baseUrl}profiles`;
export const searchUrl = `${baseUrl}listings/search`;
export const loginUrl = `https://v2.api.noroff.dev/auth/local`;
export const registerUrl = `https://v2.api.noroff.dev/auth/local/register`;
