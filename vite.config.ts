import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: [
    "favicon.ico",
    "android-chrome-512x512.png",
    "android-chrome-192x192.png",
  ],
  manifest: {
    name: "Ajwaa | أجواء",
    short_name: "Ajwaa",
    description:
      "أجواء لحجز رحلات طيران و فنادق و سيارات باسهل الطرق الممكنة مع اقل التكاليف",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/maskable_icon.png",
        sizes: "225x225",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#e8ebf2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
  workbox: {
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MiB
  },
};

export default defineConfig({
  plugins: [tailwindcss(), react(), VitePWA(manifestForPlugin)],
});
