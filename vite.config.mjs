import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { tamaguiPlugin } from '@tamagui/vite-plugin'
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
  plugins: [react(),
  tamaguiPlugin({
    config: 'src/tamagui.config.ts',
    components: ['tamagui', '@tamagui/lucide-icons'],
    optimize: true,
  }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
    },
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      "@env": path.resolve(__dirname, "src/utils/auth/env.web.ts")
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '4173'),
    allowedHosts: ['delite-onc2.onrender.com'],
  },
});