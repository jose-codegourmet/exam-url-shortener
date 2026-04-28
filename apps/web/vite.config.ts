import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  preview: {
    host: "0.0.0.0",
    allowedHosts: [
      "appsweb-production-a31e.up.railway.app",
      ".up.railway.app"
    ]
  }
});
