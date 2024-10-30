import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// TODO LATER - this is showing as incorrect syntax but doesn't seem to affect the test functionaltiy
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest-setup.js",
  },
});
