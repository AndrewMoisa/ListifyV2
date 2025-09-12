export function renderProfileDetails(profile, container) {
  // Create outer container for banner
  const bannerContainer = document.createElement("div");
  bannerContainer.className = "relative -z-10";

  // Create banner element
  const banner = document.createElement("div");
  banner.id = "banner";
  banner.className =
    "h-40 w-full bg-no-repeat bg-center bg-cover rounded-t-md md:h-60";
  banner.role = "img";
  banner.setAttribute("aria-label", `${profile.name}'s banner`);
  banner.style.backgroundImage = profile.banner?.url
    ? `url(${profile.banner.url})`
    : "url(/default-banner.jpg)";

  bannerContainer.appendChild(banner);

  // Create profile content container
  const contentContainer = document.createElement("div");
  contentContainer.className =
    "w-full p-4 rounded-b-xl shadow-lg flex flex-col md:p-10 bg-background";

  // Create avatar image
  const avatar = document.createElement("img");
  avatar.id = "avatar";
  avatar.alt = `${profile.name}'s avatar`;
  avatar.className =
    "w-30 h-30 rounded-full aspect-square object-cover border border-gray-200 -mt-15 md:w-40 md:h-40 md:-mt-25";
  avatar.src = profile.avatar?.url || "/default-avatar.jpg";

  // Create profile details container
  const detailsContainer = document.createElement("div");
  detailsContainer.className = "text-gray-800 w-full mt-5";

  // Create user info container
  const userInfo = document.createElement("div");
  userInfo.className = "space-y-1 text-sm md:text-base";

  // Create and add username
  const username = document.createElement("h1");
  username.className = "text-2xl font-semibold underline";
  username.textContent = profile.name;

  // Create and add email
  const email = document.createElement("p");
  const emailLabel = document.createElement("span");
  emailLabel.className = "font-medium";
  emailLabel.textContent = "Email: ";
  email.appendChild(emailLabel);
  email.appendChild(document.createTextNode(profile.email));

  // Create and add credits
  const credits = document.createElement("p");
  const creditsLabel = document.createElement("span");
  creditsLabel.className = "font-medium";
  creditsLabel.textContent = "Credits: ";
  credits.appendChild(creditsLabel);
  credits.appendChild(document.createTextNode(profile.credits || 0));

  // Create and add bio
  const bio = document.createElement("p");
  const bioLabel = document.createElement("span");
  bioLabel.className = "font-medium block";
  bioLabel.textContent = "Description: ";
  bio.appendChild(bioLabel);
  bio.appendChild(document.createTextNode(profile.bio || "No bio available"));

  // Assemble the user info
  userInfo.appendChild(username);
  userInfo.appendChild(email);
  userInfo.appendChild(credits);
  userInfo.appendChild(bio);

  // Add user info to details container
  detailsContainer.appendChild(userInfo);

  // Add all elements to content container
  contentContainer.appendChild(avatar);
  contentContainer.appendChild(detailsContainer);

  // Add both major sections to the main container
  container.appendChild(bannerContainer);
  container.appendChild(contentContainer);
}
