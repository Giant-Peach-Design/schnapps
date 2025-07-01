import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "./src/main.js",
        style: "./src/main.css",
      },
    },
    emptyOutDir: true,
    assetsDir: "",
  },
});
