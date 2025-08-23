import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  resolve: {
    alias: {
      'yggjs_rlayout/tech': path.resolve(__dirname, '../src/tech/index.ts'),
      'yggjs_rlayout': path.resolve(__dirname, '../src/index.ts'),
    }
  },
  optimizeDeps: {
    exclude: ['yggjs_rlayout', 'yggjs_rlayout/tech']
  }
});

