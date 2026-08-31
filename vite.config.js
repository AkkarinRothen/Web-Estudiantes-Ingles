import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Web-Estudiantes-Ingles/',
  build: {
    outDir: 'docs', // Allows deploying via GitHub Pages directly from /docs or GitHub Actions
  },
});
