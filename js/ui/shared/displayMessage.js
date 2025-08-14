export function displayMessage(container, message, type = "success") {
  const messageElement = document.createElement("div");
  messageElement.classList.add(
    type === "success" ? "success-message" : "error-message",
    "p-4",
    type === "success" ? "bg-green-100" : "bg-red-100",
    "w-full",
    "border",
    type === "success" ? "text-green-800" : "text-red-800",
    "rounded",
    "shadow"
  );

  messageElement.textContent = message;

  container.appendChild(messageElement);
}
export function renderSuccessMessage(
  container,
  message = "Operation successful!"
) {
  displayMessage(container, message, "success");
}

export function renderErrorMessage(container, message = "Operation failed.") {
  displayMessage(container, message, "error");
}
export function clearMessages(container) {
  const messages = container.querySelectorAll(
    ".success-message, .error-message"
  );
  messages.forEach((msg) => msg.remove());
}
