import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      registerType: "autoUpdate",
      injectRegister: "inline",
      includeAssets: [
        "./public/favicon-16x16.png",
        "./public/apple-touch-icon.png",
        "./public/public/favicon-32x32.png",
      ],
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png}"],
      },
      manifest: {
        name: "CheckCheckPWA",
        short_name: "CheckCheckPWA",
        start_url: ".",
        display: "standalone",
        background_color: "#18181b",
        theme_color: "#18181b",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "apple-touch-icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
