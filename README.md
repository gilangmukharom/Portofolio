# Portfolio — Gilang Mukharom

Personal portfolio built with **Vite + React 19 + TypeScript + Tailwind CSS**.

## Getting started

```bash
npm install
cp .env.example .env   # then add your NewsAPI key
npm run dev            # http://localhost:5173
```

`npm run dev` also serves `api/news.js` as middleware, so the News page works
locally without `vercel dev`.

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
| `NEWS_API_KEY` | Server only | From [newsapi.org](https://newsapi.org/). `api/news.js` also accepts the legacy `VUE_APP_NEWS_API_KEY`. |

`.env` is gitignored — never commit it.

## Structure

```
api/            Vercel Serverless Functions (ESM)
public/img/     Project previews, profile photo, tech logos
src/
  components/   layout · ui · sections
  data/         profile, skills, projects — the single source of truth for content
  hooks/        useTheme, useReveal, useLazyMedia, useRotatingWord, useNews
  pages/        Home, About, Work, News, NotFound
```

Colours are CSS custom properties in `src/index.css`, mapped into Tailwind in
`tailwind.config.ts`, so one set of utility classes covers light and dark.

## Deploying

Vercel auto-detects Vite. `vercel.json` rewrites all non-`/api` paths to
`index.html` so deep links survive a refresh. Set `NEWS_API_KEY` in the project's
environment variables.
