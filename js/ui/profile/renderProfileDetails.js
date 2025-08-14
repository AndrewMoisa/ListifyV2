export function renderProfileDetails(profile) {
  const mainElement = document.querySelector("#profile-details");

  mainElement.innerHTML += `
    
    <div class="p-6 bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
  <img
    src="${profile.avatar.url}"
    alt="${profile.name}'s avatar"
    class="w-40 h-40 rounded-xl object-cover border border-gray-200"
  />
  <div class="text-gray-800 w-full ">
    <div class="space-y-1 text-sm md:text-base">
      <p class="text-2xl font-semibold">${profile.name}</p>
      <p><span class="font-medium">Email:</span> ${profile.email}</p>
      <p><span class="font-medium">Credits:</span> ${profile.credits || 0}</p>
      <p><span class="font-medium">Bio:</span> ${
        profile.bio || "No bio available"
      }</p>
      <p><span class="font-medium">Listings:</span> ${
        profile.listings.length || 0
      }</p>
      <p><span class="font-medium">Listings Won:</span> ${
        profile.wins.length || 0
      }</p>
    </div>
  </div>
</div>


    `;
}
