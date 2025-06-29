import path from 'node:path'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import generateFile from 'vite-plugin-generate-file'
import figmaManifest from './figma.manifest.json'

export default defineConfig({
  plugins: [
    viteSingleFile(),
    generateFile({
      type: 'json',
      output: './manifest.json',
      data: figmaManifest,
    }),
  ],
  build: {
    minify: true,
    sourcemap: 'inline',
    emptyOutDir: false,
    target: 'es2017',
    outDir: path.resolve('dist'),
    rollupOptions: {
      input: path.resolve('src/plugin.ts'),
      output: {
        entryFileNames: 'plugin.js',
      },
    },
  },
  resolve: {
    alias: {
      '@':  path.resolve(__dirname, 'src'),
    },
  }
})
