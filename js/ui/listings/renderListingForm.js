export function renderListingForm(action) {
  const aside = document.createElement("section");
  aside.className = "flex flex-col max-w-7xl mx-auto p-4";
  aside.id = "form-container";

  const errorDiv = document.createElement("div");
  errorDiv.id = "error-message";
  errorDiv.className = "text-red-500 text-sm";

  const form = document.createElement("form");
  form.id = "listing-form";
  form.className = "space-y-4";

  // Helper for creating input groups
  function createField(
    labelText,
    inputType,
    id,
    name,
    required = false,
    extra = {}
  ) {
    const wrapper = document.createElement("div");

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.className = "block text-sm font-medium text-gray-700";
    label.textContent = labelText;

    let input;
    if (inputType === "textarea") {
      input = document.createElement("textarea");
      input.rows = extra.rows || 4;
    } else {
      input = document.createElement("input");
      input.type = inputType;
    }

    input.id = id;
    input.name = name;
    if (required) input.required = true;
    input.className =
      "mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder:text-gray-400 placeholder:text-xs md:placeholder:text-sm";

    if (extra.placeholder) input.placeholder = extra.placeholder;

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    return wrapper;
  }

  // Add fields
  form.appendChild(
    createField("Title", "text", "title", "title", true, {
      placeholder: "e.g., Vintage Clock",
    })
  );
  form.appendChild(
    createField("Description", "textarea", "description", "description", true, {
      rows: 4,
      placeholder: "e.g., A beautiful vintage clock in working condition.",
    })
  );
  form.appendChild(
    createField("Tags", "text", "tags", "tags", false, {
      placeholder: "Comma-separated tags",
    })
  );
  form.appendChild(createField("URL", "url", "mediaUrl", "mediaUrl", true));
  form.appendChild(
    createField("Describe Media", "text", "mediaAlt", "mediaAlt", true)
  );
  form.appendChild(
    createField("Ends At", "datetime-local", "endsAt", "endsAt")
  );

  // Button
  const button = document.createElement("button");
  button.id = "create-button";
  button.type = "submit";
  button.className =
    "w-full text-sm bg-primary text-white hover:bg-primary-hover rounded-md py-2 transition duration-200";
  button.textContent = action;

  form.appendChild(button);
  aside.appendChild(form);
  aside.appendChild(errorDiv);

  const main = document.querySelector("main");
  main.appendChild(aside);
}
