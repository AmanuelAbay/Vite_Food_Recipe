import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import graphql from "@rollup/plugin-graphql";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), graphql()],
  resolve:{
    alias:{
      "@": path.resolve(__dirname, "./src")
    }
  },
  optimizeDeps: {
    include: ["@apollo/client/core", "@apollo/client/cache"],
  },
  rollupInputOptions: {
    external: ["react"],
  },
});
