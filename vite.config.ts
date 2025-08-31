import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { fileURLToPath } from 'url'; // Not needed

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": "/src" } },
  base: '/${REPO_NAME}/',
})
