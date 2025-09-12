import { getUsername } from "../utils/storage.js";

// Routes that require user to be logged in
const protectedRoutes = ["/profile", "/profile/", "/profile/index.html"];

// Routes that should NOT be accessible if user is already logged in
const authExclusiveRoutes = [
  "/login",
  "/login/",
  "/login/index.html",
  "/register",
  "/register/",
  "/register/index.html",
];

// Run all auth guards. Return false if routing should stop.
export function authGuards(path) {
  const user = getUsername();

  // If route requires auth and user missing -> redirect to login
  if (protectedRoutes.includes(path) && !user) {
    window.location.replace("/login/");
    return false;
  }

  // If user is logged in and visits login/register -> redirect to listings
  if (user && authExclusiveRoutes.includes(path)) {
    window.location.replace("/listings/");
    return false;
  }

  return true;
}
