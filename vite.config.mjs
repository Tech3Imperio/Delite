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
  // define: {
  //   DEV: `${process.env.NODE_ENV === 'development' ? true : false}`,
  //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  // },
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
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // loader: {
  //   '.js': 'jsx',
  // },
  server: {
    port: 3000,
  },
});