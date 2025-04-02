import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    allowedHosts: [
      "rvideo.pro",
      ".rvideo.pro",
    ],
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, "src") },
    ]
  }
})
