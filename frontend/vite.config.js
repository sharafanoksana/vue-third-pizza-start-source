import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import { createHtmlPlugin } from "vite-plugin-html";
// import vueDevTools from "vite-plugin-vue-devtools";
// import pugPlugin from "vite-plugin-pug";

// const options = { pretty: true };
// const locals = { name: "My Pug" };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    // vueDevTools(),
    // createHtmlPlugin({}),
    // pugPlugin(options, locals)
  ],
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        rewrite : (path) => path.replace(/^\/api/, ""),
      },
    },
    hmr: { overlay: false },
  },
});


