import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx', // Correct way to apply the loader for JSX
    include: /src\/.*\.(js|jsx)$/, // Ensure we only apply it to .js and .jsx files
  },
});
