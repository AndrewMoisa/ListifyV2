import { getToken } from "../utils/storage.js";

export const bearerToken = getToken();
export const apiKey = import.meta.env.API_KEY;
export const baseUrl = "https://v2.api.noroff.dev/auction/";
export const registerUrl = `https://v2.api.noroff.dev/auth/register`;
export const loginUrl = `https://v2.api.noroff.dev/auth/login`;
export const searchUrl = `${baseUrl}listings/search`;
