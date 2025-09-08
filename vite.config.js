import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        listings: resolve(__dirname, "listings/index.html"),
        ad: resolve(__dirname, "listings/ad.html"),
        formCreate: resolve(__dirname, "listings/form/create.html"),
        formEdit: resolve(__dirname, "listings/form/edit.html"),
        login: resolve(__dirname, "login/index.html"),
        register: resolve(__dirname, "register/index.html"),
        profile: resolve(__dirname, "profile/index.html"),
      },
    },
  },
});
