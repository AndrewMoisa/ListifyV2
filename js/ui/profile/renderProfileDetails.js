export function renderProfileDetails(profile, container) {
  container.innerHTML += `
      <div class="relative -z-10 ">
    <div
      id="banner"
      class="h-40 w-full bg-no-repeat bg-center bg-cover rounded-t-md md:h-60"
      role="img"
      aria-label="User's banner"
    ></div>
      </div>

    <div class="w-full p-4 rounded-b-xl shadow-lg flex flex-col md:p-10 bg-background">
      <img
      id="avatar"
      alt="User's avatar"
      class="w-30 h-30 rounded-full aspect-square object-cover border border-gray-200 -mt-15 md:w-40 md:h-40 md:-mt-25"
    />

  <div class="text-gray-800 w-full mt-5">
    <div class="space-y-1 text-sm md:text-base">
      <p class="text-2xl font-semibold underline">${profile.name}</p>
      <p><span class="font-medium">Email:</span> ${profile.email}</p>
      <p><span class="font-medium">Credits:</span> ${profile.credits || 0}</p>
      <p><span class="font-medium block">Description:</span> ${
        profile.bio || "No bio available"
      }</p>
      
    </div>
  </div>
  
</div>`;

  // Update banner background
  const banner = document.getElementById("banner");
  banner.style.backgroundImage = profile.banner?.url
    ? `url(${profile.banner.url})`
    : "url(/default-banner.jpg)";
  banner.setAttribute("aria-label", `${profile.name}'s banner`);

  // Update avatar
  const avatar = document.getElementById("avatar");
  avatar.src = profile.avatar?.url || "/default-avatar.jpg";
  avatar.alt = `${profile.name}'s avatar`;
}
