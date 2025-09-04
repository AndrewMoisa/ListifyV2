/**
 * Validates a form by checking if any input has a value
 * @param {NodeList|Array} inputs - Collection of input elements
 * @param {HTMLElement} submitButton - The form's submit button
 * @returns {boolean} - True if form has any values
 */
export function validateFormHasValues(inputs, submitButton) {
  const hasValue = Array.from(inputs).some(
    (input) => input.value.trim() !== ""
  );

  // Update button state
  submitButton.disabled = !hasValue;

  // Update visual feedback
  if (hasValue) {
    submitButton.classList.remove("opacity-50", "cursor-not-allowed");
  } else {
    submitButton.classList.add("opacity-50", "cursor-not-allowed");
  }

  return hasValue;
}

/**
 * Sets up form validation that enables submit button only when form has values
 * @param {HTMLFormElement} form - The form element
 * @param {string} submitSelector - Selector for the submit button
 * @param {string} inputsSelector - Selector for input elements
 */
export function setupFormValidation(
  form,
  submitSelector = 'button[type="submit"]',
  inputsSelector = "input, textarea"
) {
  if (!form) return;

  const submitButton = form.querySelector(submitSelector);
  const inputs = form.querySelectorAll(inputsSelector);

  if (!submitButton || !inputs.length) return;

  // Initial validation
  validateFormHasValues(inputs, submitButton);

  // Add input listeners
  inputs.forEach((input) => {
    input.addEventListener("input", () =>
      validateFormHasValues(inputs, submitButton)
    );
  });

  return { form, submitButton, inputs };
}

/**
 * Transforms profile form data to match API requirements
 * @param {Object} data - Form data object
 * @returns {Object} - Transformed data for API
 */
export function transformProfileData(data) {
  const transformedData = {
    bio: data.bio || "",
  };

  if (data.title && data.title.trim() !== "") {
    transformedData.title = data.title;
  }

  // Handle avatar data
  if (data.avatar && data.avatar.trim() !== "") {
    transformedData.avatar = {
      url: data.avatar.trim(),
      alt: data.avatarAlt?.trim() || "",
    };
  }

  // Handle banner data
  if (data.banner && data.banner.trim() !== "") {
    transformedData.banner = {
      url: data.banner.trim(),
      alt: data.bannerAlt?.trim() || "",
    };
  }

  return transformedData;
}
