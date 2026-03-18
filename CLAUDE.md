# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm dev        # Dev server at localhost:4321
pnpm build      # Build to ./dist/
pnpm preview    # Preview production build
```

No test suite is configured.

## Architecture

Static site built with **Astro 6** for a quinceañera digital invitation (Spanish-language, single page).

- **Astro** handles static rendering and routing — pages go in `src/pages/`
- **Preact** is integrated for any interactive components (`@astrojs/preact`); use `.tsx` files for Preact components
- **Tailwind CSS v4** is loaded via the `@tailwindcss/vite` plugin (not the old PostCSS plugin) — no `tailwind.config.*` file; configuration goes in CSS using `@theme`
- **Prettier** with `prettier-plugin-astro` and `prettier-plugin-tailwindcss` for formatting

## Path aliases

Astro resolves these automatically:
- `@layouts/` → `src/layouts/`
- `@styles/` → `src/styles/`

## Key files

- `src/layouts/Layout.astro` — base HTML shell used by all pages; imports `global.css`
- `src/styles/global.css` — only contains `@import "tailwindcss"`; add Tailwind `@theme` customizations here
- `astro.config.mjs` — registers the Tailwind Vite plugin and Preact integration
