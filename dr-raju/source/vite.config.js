import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Assets resolve relative to this file so the build works both from the repo
// root and from the dr-raju/ subdirectory, with no `../` prefixes.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});