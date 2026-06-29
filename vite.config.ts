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
      // Process all trip images (with or without query params): convert to WebP
      // and cap width at 1200px. imagetools downscales but never upscales, so
      // smaller sources are untouched. 1200px covers the full-width desktop day
      // hero; mobile columns are ~360px. Multi-width srcset is deferred to the
      // per-image migration task (needs component + TS-declaration changes).
      include: /\/assets\/trips\/.*\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i,
      defaultDirectives: new URLSearchParams("format=webp&quality=80&w=1200"),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: { port: 5173, open: true },
});
