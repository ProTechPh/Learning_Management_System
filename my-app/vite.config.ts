import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output build folder relative to root
    emptyOutDir: true,
  },
  server: {
    open: true, // optional: auto open browser on `npm run dev`
  }
});
