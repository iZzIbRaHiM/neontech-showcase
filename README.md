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

## Deploy to Cloudflare Pages (recommended)

Use these exact settings in **Cloudflare Pages → Create project → Build settings**:

- **Framework preset:** `Vite`
- **Production branch:** your deploy branch (`main`/`master`)
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (repo root)

In **Settings → Environment variables**, add:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `NODE_VERSION=20`

### Important: Pages does not need a deploy command

If you are using **Cloudflare Pages Git integration**, do **not** run `wrangler deploy` in the build command.
Only build the app (`npm run build`) and let Pages publish the `dist` output.

## If you deploy with Wrangler CLI instead

Your log error came from running a Wrangler deploy command without Worker entry/asset settings.
`wrangler.toml` now includes an `[assets]` section, so this static app can be deployed with Wrangler as assets.

Use one of these commands:

```bash
npm run build
npx wrangler pages deploy dist
```

or

```bash
npm run build
npx wrangler deploy
```

## SPA routing on Cloudflare

- `public/_redirects` handles SPA fallback when deployed on Cloudflare Pages.
- `wrangler.toml` uses `not_found_handling = "single-page-application"` for Wrangler asset deployments.

## Project scripts

- `npm run dev` — start dev server
- `npm run lint` — lint source code
- `npm run test` — run tests once
- `npm run test:watch` — run tests in watch mode
- `npm run build` — production build
- `npm run preview` — preview production build locally
