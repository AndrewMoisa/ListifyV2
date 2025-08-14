export function renderSuccessMessage(container) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(
    "success-message",
    "p-4",
    "bg-green-100",
    "text-green-800",
    "rounded",
    "shadow"
  );
  messageElement.textContent = "User registered successfully!";

  container.appendChild(messageElement);
}
