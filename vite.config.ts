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
});
