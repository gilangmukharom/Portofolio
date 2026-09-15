import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Everything dynamic on this site — content, media and the news feed — comes
  // from the CMS API. In development it runs on localhost:4000.
  const apiTarget = env.CMS_PROXY_TARGET || 'http://localhost:4000'

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      // Proxying keeps requests same-origin in development, so the CMS refresh
      // cookie behaves exactly as it will in production.
      proxy: {
        '/api': { target: apiTarget, changeOrigin: true },
        '/uploads': { target: apiTarget, changeOrigin: true },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  }
})
