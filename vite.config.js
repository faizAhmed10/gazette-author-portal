import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://gazette-backend-production.up.railway.app",
        changeOrigin: true,  // This helps with SSL issues
        secure: false,  
      },
    },
  },
});
