import { mobileMenuToggle, changeReview } from "./logic/shared/homepage.js";
import { listingsHandler } from "./logic/handlers/listings/listingsHandler.js";
import { adDetailsHandler } from "./logic/handlers/listings/ad/adDetailsHandler.js";
import { registerHandler } from "./logic/handlers/registerUserHandler.js";
import { loginHandler } from "./logic/handlers/loginUserHandler.js";
import { searchHandler } from "./logic/handlers/listings/searchHandler.js";
import { profileDetailsHandler } from "./logic/handlers/profile/profileDetailsHandler.js";
import { profileListingsHandler } from "./logic/handlers/profile/profileListingsHandler.js";
import { profileWinsHandler } from "./logic/handlers/profile/profileWinsListings.js";
import { authUser } from "./logic/auth/auth.js";
import { createListingsHandler } from "./logic/handlers/listings/createListingHandler.js";
import { editListingsHandler } from "./logic/handlers/listings/editListingHandler.js";
import { updateProfileHandler } from "./logic/handlers/profile/updateProfileHandler.js";

// Common handlers that run on every page
function runCommonHandlers() {
  try {
    mobileMenuToggle();
    authUser();
  } catch (error) {
    console.error("Error in common handlers:", error);
  }
}

// Routes configuration
const routes = [
  {
    paths: ["/", "/index.html"],
    handlers: [() => changeReview(), () => listingsHandler()],
  },
  {
    paths: ["/listings/", "/listings/index.html"],
    handlers: [() => listingsHandler(20), () => searchHandler()],
  },
  {
    paths: ["/listings/ad.html"],
    handlers: [() => adDetailsHandler()],
  },
  {
    paths: ["/register/", "/register/index.html"],
    handlers: [() => registerHandler()],
  },
  {
    paths: ["/login/", "/login/index.html"],
    handlers: [() => loginHandler()],
  },
  {
    paths: ["/profile/", "/profile/index.html"],
    handlers: [
      () => profileDetailsHandler(),
      () => updateProfileHandler(),
      () => profileListingsHandler(),
      () => profileWinsHandler(),
    ],
  },
  {
    paths: ["/form/"],
    handlers: [() => createListingsHandler()],
  },
  {
    paths: ["/form/edit.html"],
    handlers: [() => editListingsHandler()],
  },
];

function router() {
  const pathname = window.location.pathname;

  // Always run common handlers
  runCommonHandlers();

  // Find exact matching route
  const route = routes.find((route) => route.paths.includes(pathname));

  if (route) {
    // Execute handlers for the matched route
    route.handlers.forEach((handler) => {
      try {
        handler();
      } catch (error) {
        console.error(`Error executing handler for ${pathname}:`, error);
      }
    });
  } else {
    console.warn(`No route found for path: ${pathname}`);
  }
}

// Initialize router when DOM is ready
document.addEventListener("DOMContentLoaded", router);
