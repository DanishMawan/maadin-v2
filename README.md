# Maadin.AI — light variant

Static marketing site for Maadin.AI. Light theme (the Coinest-referenced variant);
the dark, Forma VC-referenced build lives separately.

## Running it

There is no build step and no dependencies. `site/` is the deployable artefact and
runs from the filesystem or any static host.

    python3 -m http.server 4322 --directory site

Then open <http://localhost:4322/>.

## Regenerating

`build.py` is a generator, not a build step: it writes the 16 pages in `site/` from
one set of templates, so shared components stay in sync. Run it after editing:

    python3 build.py

It rewrites every page, so never hand-edit files under `site/` — the next run will
overwrite them. Edit `build.py`.

## Layout

    build.py                       page templates, figures and content
    site/                          generated output (deploy this folder)
      assets/css/tokens.css        design tokens — colours, radii, easing
      assets/css/site.css          layout and components
      assets/js/site.js            scroll reveals, count-ups, form behaviour
      assets/img/                  hero terrain mesh
    PLACEHOLDERS.md                every unresolved content gap
    maadin-light-variant-spec.md   the spec this build follows

## Before launch

`PLACEHOLDERS.md` tracks every piece of unconfirmed or stand-in content and is the
launch gate — nothing ships while it has open rows. Four items are **blocked** on
the client rather than on us: **A4**, **B5**, **D3**, **D7**.

All demo data is deliberately fictional (invented parcel IDs, basins and operators)
and labelled as such in the interface. No real company, parcel or client is named,
and no credential is claimed that has not been confirmed.

## Deploying

`site/` uses only relative paths, so it works at any URL or subpath. Drag the folder
onto any static host, or point the host's publish directory at `site/` with an empty
build command.
