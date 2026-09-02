import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import type { Connect, Plugin } from 'vite'
import { defineConfig, loadEnv } from 'vite'

/**
 * `vite dev` doesn't execute the `api/` folder the way Vercel does in production,
 * so mount the serverless handlers as dev middleware. This keeps `npm run dev`
 * self-contained — no `vercel dev` required.
 */
function vercelApiDevServer(): Plugin {
  return {
    name: 'vercel-api-dev-server',
    apply: 'serve',
    configureServer(server) {
      // Vite only exposes VITE_-prefixed vars, and only to client code. The
      // handler reads process.env like it does on Vercel, so load the whole
      // .env file into the dev process without clobbering real shell vars.
      const fileEnv = loadEnv(server.config.mode, process.cwd(), '')
      for (const [key, value] of Object.entries(fileEnv)) {
        process.env[key] ??= value
      }

      server.middlewares.use('/api/news', (async (req, res) => {
        // The handler expects Vercel's Express-ish `req.query` / `res.status().json()`.
        const url = new URL(req.url ?? '/', 'http://localhost')
        const query = Object.fromEntries(url.searchParams)

        const shimmed = Object.assign(res, {
          status(code: number) {
            res.statusCode = code
            return shimmed
          },
          json(body: unknown) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(body))
            return shimmed
          },
        })

        try {
          // Vite bundles this config to a temp file, so a relative specifier would
          // resolve from the wrong directory — build an absolute URL instead. The
          // changing query busts Node's ESM cache so edits are picked up live.
          const handlerUrl = new URL('./api/news.js', import.meta.url)
          const module_ = await import(
            /* @vite-ignore */ `${handlerUrl.href}?t=${Date.now()}`
          )
          await module_.default(Object.assign(req, { query }), shimmed)
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          server.config.logger.error(`[api/news] ${message}`)
          shimmed.status(500).json({ error: `Dev middleware failed: ${message}` })
        }
      }) as Connect.NextHandleFunction)
    },
  }
}

export default defineConfig({
  plugins: [react(), vercelApiDevServer()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
