/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      "/legacy/api": {
        target: "http://3.35.68.147:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  publicDir: "static",
  build: {
    // JavaScript 최소화 설정
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // console.log 제거
        drop_debugger: true, // debugger 제거
        pure_funcs: ["console.log", "console.info"],
      },
      format: {
        comments: false, // 주석 제거
      },
    },
    // 코드 스플리팅 설정
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["styled-components", "swiper"],
          utils: ["axios", "usehooks-ts"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
