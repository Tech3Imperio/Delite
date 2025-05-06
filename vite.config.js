import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const extensions = [
  ".web.tsx",
  ".tsx",
  ".web.ts",
  ".ts",
  ".web.jsx",
  ".jsx",
  ".web.js",
  ".js",
  ".css",
  ".json",
];

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
    },
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
});