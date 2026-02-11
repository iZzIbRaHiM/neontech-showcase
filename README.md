# NeonTech Showcase Store

A production-ready React + Vite storefront with Supabase-backed authentication, products, cart, checkout, and order history pages.

## Features

- Product listing and product detail pages
- Cart and checkout flow
- User authentication (Supabase Auth)
- Orders list and order detail views
- Responsive UI with Tailwind + shadcn/ui components

## Tech stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS + shadcn/ui
- Supabase (`@supabase/supabase-js`)
- React Router + React Query

## Local development

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:8080`.

## Required environment variables

Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_ANON_KEY
```

## Build and test

```bash
npm run lint
npm run test
npm run build
```

> `npm run build` now generates both `dist/index.html` and `dist/404.html` (copy of index) for safe SPA fallback.

## Deploy to Cloudflare Pages (recommended)

Use these settings in **Cloudflare Pages → Create project → Build settings**:

- **Framework preset:** `Vite`
- **Production branch:** your deploy branch (`main`/`master`)
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (repo root)

In **Settings → Environment variables**, add:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `NODE_VERSION=20` (or rely on `.nvmrc`)

### Important

For Pages Git integration, do **not** run `wrangler deploy` inside the build command. Build only (`npm run build`) and let Pages publish `dist`.

## Deploy with Wrangler CLI

Your previous failure came from `_redirects` containing `/* /index.html 200`, which Wrangler asset validation rejects as an infinite redirect loop.

This repo now uses Wrangler-native SPA handling via `wrangler.toml`:

- `main = "worker/index.ts"` (worker entrypoint that serves static assets)
- `[assets].binding = "ASSETS"`
- `[assets].directory = "./dist"`
- `[assets].not_found_handling = "single-page-application"`

Deploy commands:

```bash
npm run build
npx wrangler deploy
```

or

```bash
npm run build
npx wrangler pages deploy dist
```

## Project scripts

- `npm run dev` — start dev server
- `npm run lint` — lint source code
- `npm run test` — run tests once
- `npm run test:watch` — run tests in watch mode
- `npm run build` — production build + SPA 404 fallback
- `npm run preview` — preview production build locally


### If you still see "Hello World"

That means a default Worker script is still being served. Deploy this repo with `npx wrangler deploy` so the `worker/index.ts` + `ASSETS` config replaces it.
