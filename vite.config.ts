import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/program-rania/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "lucide-react": "/src/stubs/lucide-react.tsx",
      "recharts": "/src/stubs/recharts.tsx"
    }
  }
});
