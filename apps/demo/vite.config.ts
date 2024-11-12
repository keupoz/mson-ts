import { resolve } from 'node:path'
import react from '@vitejs/plugin-react-swc'
import markdown from 'unplugin-react-markdown/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), markdown()],
  resolve: {
    alias: {
      '@demo': resolve(__dirname, './src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
