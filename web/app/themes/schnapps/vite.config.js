import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import laravel from "laravel-vite-plugin";
import { wordpressPlugin, wordpressThemeJson } from "@roots/vite-plugin";
import { resolve } from "path";

export default defineConfig({
  server: {
    cors: {
      origin: "*",
    },
  },
  base: "/app/themes/schnapps/public/build/",
  envDir: resolve(__dirname, "../../../../"),
  plugins: [
    tailwindcss(),
    laravel({
      input: [
        "resources/css/app.css",
        "resources/js/app.js",
        "resources/css/editor.css",
        "resources/js/editor.js",
      ],
      refresh: true,
      assets: ['resources/images/**', 'resources/fonts/**'],
      url: process.env.APP_URL || "http://localhost",
    }),

    wordpressPlugin(),

    // Generate the theme.json file in the public/build/assets directory
    // based on the Tailwind config and the theme.json file from base theme folder
    wordpressThemeJson({
      disableTailwindColors: false,
      disableTailwindFonts: false,
      disableTailwindFontSizes: false,
    }),
  ],
  resolve: {
    alias: {
      "@scripts": "/resources/js",
      "@styles": "/resources/css",
      "@fonts": "/resources/fonts",
      "@images": "/resources/images",
    },
  },
});
