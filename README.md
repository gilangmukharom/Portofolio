# Portfolio - Gilang Mukharom

Personal portfolio built with **Vite + React 19 + TypeScript + Tailwind CSS**,
plus the admin panel for the CMS that feeds it.

Content lives in a separate service, [portofolio-cms](../portofolio-cms) -
Express, Prisma and PostgreSQL. This repository owns every user interface; that
one owns the API and the data.

## Getting started

Start the CMS API first, then:

```bash
npm install
cp .env.example .env
npm run dev            # http://localhost:5173
```

`npm run dev` proxies `/api` and `/uploads` to `CMS_PROXY_TARGET`
(`http://localhost:4000` by default), so requests stay same-origin and the
admin panel's refresh cookie behaves exactly as it will in production.

The admin panel is at [/admin](http://localhost:5173/admin). Sign in with the
credentials the CMS seed created.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Typecheck, then production build into `dist/` |
| `npm run preview` | Serve the built output |
| `npm run typecheck` | `tsc` with no emit |
| `npm run lint` | ESLint |

## Environment

| Variable | Where | Notes |
| --- | --- | --- |
| `VITE_API_URL` | Client | The CMS API's base URL in production, e.g. `https://cms.example.com/api/v1`. Leave empty in development. |
| `CMS_PROXY_TARGET` | Dev server | Where `npm run dev` proxies `/api` and `/uploads`. Defaults to `http://localhost:4000`. |

`.env` is gitignored - never commit it.

## Content and the fallback

`src/content/ContentProvider.tsx` fetches the whole site's content in one
request and hands it to the tree. `src/data/fallback.ts` holds a bundled copy of
that content, which renders immediately and is replaced when the API answers.

So there is no loading spinner and no layout shift, and if the CMS is
unreachable the site still renders - just with whatever was true at build time.
When content changes in the CMS, update the fallback too if you want the
offline copy to stay current.

## Structure

```
public/img/     Project previews, profile photo, tech logos
src/
  admin/        The CMS admin panel, lazily loaded at /admin
    config/     Field definitions that generate every list and form
    lib/        API client with token refresh, auth context, toasts
    pages/      Dashboard, collections, singletons, media, users, account
  components/   layout · ui · sections
  content/      ContentProvider and the hooks the pages read content through
  data/         fallback.ts - the bundled copy of the CMS content
  hooks/        useTheme, useReveal, useLazyMedia, useRotatingWord, useNews
  lib/          api.ts - the read-only client for the public API
  pages/        Home, About, Work, News, NotFound
```

Colours are CSS custom properties in `src/index.css`, mapped into Tailwind in
`tailwind.config.ts`, so one set of utility classes covers light and dark - the
admin panel included.

The admin panel is a lazy route, so a visitor reading the portfolio never
downloads it.

## Deploying

Vercel auto-detects Vite. `vercel.json` rewrites every path to `index.html` so
deep links and `/admin` survive a refresh. Set `VITE_API_URL` to the deployed
CMS API, and add this site's origin to the CMS's `CORS_ORIGINS`.
