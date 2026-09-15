import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

/**
 * Vite inlines `import.meta.env` values at build time, so a production bundle
 * built without VITE_API_URL sends every request to its own origin instead of
 * the CMS. The SPA rewrite then answers with HTML and the failure looks like a
 * parsing bug. Failing the build turns that into an obvious error at the point
 * the mistake is made.
 */
function assertApiUrl(mode: string, apiUrl: string | undefined) {
  if (mode !== 'production') return

  if (!apiUrl?.trim()) {
    throw new Error(
      'VITE_API_URL is not set.\n\n' +
        'A production build needs the CMS API URL baked into it, for example\n' +
        '  VITE_API_URL=https://your-service.onrender.com/api/v1\n\n' +
        'On Vercel: Settings, Environment Variables, add it for Production,\n' +
        'then redeploy. Setting it without redeploying changes nothing, because\n' +
        'the value is compiled into the bundle.',
    )
  }

  if (!/^https?:\/\//.test(apiUrl)) {
    throw new Error(
      `VITE_API_URL must be an absolute URL, got "${apiUrl}".\n` +
        'A relative value sends requests to the site\'s own origin.',
    )
  }
}

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')

  if (command === 'build') assertApiUrl(mode, env.VITE_API_URL)

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
