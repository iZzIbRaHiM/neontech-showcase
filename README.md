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

## Deploy to Cloudflare Pages (recommended settings)

Use these exact settings in **Cloudflare Pages → Create project → Build settings**:

- **Framework preset:** `Vite`
- **Production branch:** your main branch (`main` or `master`)
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (repo root)

In **Settings → Environment variables**, add:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `NODE_VERSION=20`

### Why the previous Cloudflare build likely failed

If Cloudflare detects a `bun.lockb`, it can choose Bun during install/build. This repo is set up for npm (`package-lock.json` + npm scripts). The Bun lockfile has been removed to avoid that mismatch.

### SPA routing on Cloudflare Pages

`public/_redirects` is included so deep links (for example `/product/123`, `/checkout`, `/orders`) resolve to `index.html`.

## Optional Wrangler deploy

A `wrangler.toml` file is included with `pages_build_output_dir = "./dist"` so you can deploy via CLI:

```bash
npm run build
npx wrangler pages deploy dist
```

## Project scripts

- `npm run dev` — start dev server
- `npm run lint` — lint source code
- `npm run test` — run tests once
- `npm run test:watch` — run tests in watch mode
- `npm run build` — production build
- `npm run preview` — preview production build locally
