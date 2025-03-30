import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

const manifestForPlugin: Partial<VitePWAOptions> = {
  injectRegister: "auto", // Ensure the service worker is registered automatically
  registerType: "autoUpdate", // Changed from "prompt" to "autoUpdate"
  includeAssets: [
    "favicon.ico",
    "android-chrome-512x512.png",
    "android-chrome-192x192.png",
  ],
  manifest: {
    name: "تـطـبــيــق شــؤون قـــوات الأمــن",
    short_name: "قـــوات الأمــن",
    description:
      "تطبيق شؤون المجندين لوزارة الداخلية يهدف الي تطوير البنية التحتية لوزارة الداخلية وزيادة كفاءة الخدمات المقدمة للشعب المصري وتسهيل الاجراءات الخاصة بالمجندين",
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
    scope: "/", // Ensure this matches the app's deployment path
    start_url: "/", // Ensure this matches the root path of your app
    orientation: "portrait",
  },
  devOptions: {
    enabled: true, // ✅ تأكد أن الخدمة تعمل أثناء التطوير
    type: "module",
  },
  workbox: {
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MiB
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.mode === "navigate",
        handler: "NetworkFirst",
        options: {
          cacheName: "pages",
        },
      },
      {
        urlPattern: /\/.*\.(?:js|css|html|png|jpg|jpeg|svg|gif|ico|webp)$/,
        handler: "CacheFirst",
        options: {
          cacheName: "assets",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
    ],
  },
};

export default defineConfig({
  plugins: [tailwindcss(), react(), VitePWA(manifestForPlugin)],
});
