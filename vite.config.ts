import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Plugin para copiar arquivos PWA para o dist
const copyPwaFiles = () => {
  return {
    name: 'copy-pwa-files',
    closeBundle() {
      const files = ['sw.js', 'manifest.json', 'icon.svg', 'icon-192.png', 'icon-512.png']

      files.forEach((file) => {
        if (fs.existsSync(file)) {
          fs.copyFileSync(file, resolve(__dirname, 'dist', file))
          console.log(`✔ Copied ${file} to dist/`)
        } else {
          console.warn(`⚠️ Warning: ${file} missing, PWA might not work correctly.`)
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    copyPwaFiles()
  ],

  // Garante que os assets sejam gerados com caminhos absolutos (ex: /assets/index.js)
  base: '/',

  build: {
    outDir: 'dist',
    emptyOutDir: true,

    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },

  resolve: {
    alias: {
      '@': __dirname
    }
  }
})