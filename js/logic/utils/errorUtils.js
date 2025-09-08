// Map common API errors to user-friendly messages
export function getUserFriendlyErrorMessage(error) {
  // Handle specific error codes or messages
  if (error.status === 401) {
    return "Invalid email or password. Please try again.";
  }

  if (error.status === 429) {
    return "Too many login attempts. Please try again later.";
  }

  if (error.message?.includes("email")) {
    return "Please enter a valid email address.";
  }

  // Default fallback message
  return "Unable to log in. Please check your credentials and try again.";
}
