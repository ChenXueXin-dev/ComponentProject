import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    vue(),
    tailwindcss(),
    // 使用vite-plugin-mock模拟后端
    viteMockServe({
      mockPath: "./mock",
      watchFiles: true,
    }),
  ],
  server: {
    open: true,
    port: 5179,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
