import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { analyzer } from 'vite-bundle-analyzer'
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    analyzer({ 
      openAnalyzer: false,
      analyzerMode: "static",
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, "src") },
    ]
  }
})
