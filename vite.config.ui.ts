import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile(), tailwindcss()],
  root: path.resolve('src/ui'),
  build: {
    minify: true,
    cssMinify: true,
    sourcemap: 'inline',
    emptyOutDir: false,
    outDir: path.resolve('dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }
})
