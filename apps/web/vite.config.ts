import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: [
      "appsweb-production-a31e.up.railway.app",
      ".up.railway.app"
    ]
  }
});
