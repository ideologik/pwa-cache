import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./", // Usa una ruta base relativa
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "PWA Cache",
        short_name: "PWA Cache",
        start_url: "./", // Asegura que el inicio sea relativo
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "./icon-192x192.png", // Ruta relativa para el ícono
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./icon-512x512.png", // Ruta relativa para el ícono
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,mp4}"], // Asegúrate de incluir los archivos necesarios
        runtimeCaching: [
          {
            urlPattern: /\/v1_udla_12_d23_Dialogo_m\.mp4$/,
            handler: "CacheFirst",
            options: {
              cacheName: "video-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
});
