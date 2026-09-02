# Maadin.AI

Next.js (App Router) + Tailwind rebuild of the Maadin.AI marketing site.

## Running it

    npm install
    npm run dev

Then open <http://localhost:3000/>.

    npm run build   # production build, all 16 routes are statically generated
    npm run start   # serve the production build

## Layout

    app/                    routes (one folder per page, App Router conventions)
      globals.css           design tokens (ported from the legacy tokens.css) +
                             Tailwind theme + component classes (@layer components)
      fonts.ts               next/font/local setup for Satoshi, Inter, IBM Plex Mono
    components/             shared UI: nav, footer, section wrappers, cards, forms,
      diagrams/              the 15 hand-drawn SVG figures + the label-positioning system
    lib/content/            typed content arrays: articles, demos, nav, track record

## Design system

Colors, spacing, the fluid type scale and motion timings live as CSS custom
properties in `app/globals.css`, ported from the legacy build. Component
classes (`.card`, `.btn`, `.gcard`, `.ctapanel`, etc.) are reimplemented as
Tailwind `@layer components` against those tokens, so the visual system runs
through Tailwind's build while staying pixel-faithful to the original.

Scroll reveals, SVG stroke-draw animation, count-up numbers, the mobile nav,
and the footer clock are ported from the legacy `site.js` into
`components/client-effects.tsx`, a single client component mounted in the
root layout — kept close to the original imperative implementation
(including its `prefers-reduced-motion` and hidden-tab handling) rather than
rewritten as bespoke per-component React state, since that logic was already
carefully tuned.

## Legacy static build

`legacy-static-site/` holds the original Python static-site generator
(`build.py`) and its output (`site/`) that this app replaces. It still runs
standalone if needed:

    python legacy-static-site/build.py
    python -m http.server 4322 --directory legacy-static-site/site

`legacy-static-site/PLACEHOLDERS.md` tracks unresolved content gaps and is
unaffected by the framework migration — it still gates launch.

## Deploying

Standard Next.js app — importing this repo into Vercel needs no project
configuration.
