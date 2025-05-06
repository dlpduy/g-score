import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: 'named',
        namedExport: 'ReactComponent',
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://3.24.218.139:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
