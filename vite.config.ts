import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/trip-itinerary-app/",
  plugins: [
    react(),
    imagetools({
      // Process all trip images (with or without query params) and convert to WebP
      include: /\/assets\/trips\/.*\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i,
      defaultDirectives: new URLSearchParams("format=webp&quality=80"),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: { port: 5173, open: true },
});
