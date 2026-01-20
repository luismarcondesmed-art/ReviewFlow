import { defineConfig, loadEnv } from 'vite'
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

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '')

  return {
    plugins: [
      react(),
      copyPwaFiles()
    ],

    // Garante que os assets sejam gerados com caminhos absolutos (ex: /assets/index.js)
    base: '/',

    // Robust replacement for Environment Variables
    define: {
      'import.meta.env.VITE_FIREBASE_API_KEY': JSON.stringify(env.VITE_FIREBASE_API_KEY),
      'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(env.VITE_FIREBASE_AUTH_DOMAIN),
      'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify(env.VITE_FIREBASE_PROJECT_ID),
      'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify(env.VITE_FIREBASE_STORAGE_BUCKET),
      'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(env.VITE_FIREBASE_MESSAGING_SENDER_ID),
      'import.meta.env.VITE_FIREBASE_APP_ID': JSON.stringify(env.VITE_FIREBASE_APP_ID),
      'import.meta.env.VITE_FIREBASE_MEASUREMENT_ID': JSON.stringify(env.VITE_FIREBASE_MEASUREMENT_ID),
    },

    build: {
      outDir: 'dist',
      emptyOutDir: true,

      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        },
        // Externalize dependencies to use the CDN versions defined in index.html importmap
        // This avoids "failed to resolve" errors for missing local packages and prevents "Dual React" issues
        external: [
          'react',
          'react-dom',
          'react-dom/client',
          '@vercel/analytics/react',
          '@vercel/speed-insights/react',
          'firebase/app',
          'firebase/auth',
          'firebase/firestore'
        ],
        output: {
          // Global variables map for UMD/IIFE builds (mostly unused in module builds, but good practice)
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-dom/client': 'ReactDOM'
          }
        }
      }
    },

    resolve: {
      alias: {
        '@': __dirname
      }
    }
  }
})