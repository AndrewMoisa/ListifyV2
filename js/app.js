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

// Define routes in one place
const routes = {
  "/": () => {
    mobileMenuToggle();
    authUser();
    changeReview();
    listingsHandler();
  },
  "/listings": () => {
    mobileMenuToggle();
    authUser();
    listingsHandler(20);
    searchHandler();
  },
  "/listings/ad": () => {
    mobileMenuToggle();
    authUser();
    adDetailsHandler();
  },
  "/register": () => {
    mobileMenuToggle();
    authUser();
    registerHandler();
  },
  "/login": () => {
    mobileMenuToggle();
    authUser();
    loginHandler();
  },
  "/profile": () => {
    mobileMenuToggle();
    authUser();
    profileDetailsHandler();
    updateProfileHandler();
    profileListingsHandler();
    profileWinsHandler();
  },
  "/listings/form/create": () => {
    mobileMenuToggle();
    authUser();
    createListingsHandler();
  },
  "/listings/form/edit": () => {
    mobileMenuToggle();
    authUser();
    editListingsHandler();
  },
};

// Router function
function router() {
  const path = window.location.pathname.replace(/\/+$/, ""); // strip trailing /
  const route = routes[path] || routes["/"]; // fallback to home
  route();
}

router();

// Handle back/forward
window.addEventListener("popstate", router);

// Optional: intercept clicks on links (to avoid reloads)
document.addEventListener("click", (e) => {
  if (e.target.matches("a[data-link]")) {
    e.preventDefault();
    history.pushState(null, null, e.target.href);
    router();
  }
});
