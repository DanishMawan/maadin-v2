# Maadin.AI — Light variant spec (v2)

## Reference

This build follows a different reference from the dark one.

| | Dark build (v1) | Light build (v2) — this spec |
|---|---|---|
| Reference | Forma VC — `formavc.framer.website` | **Coinest — `https://coinest-saas.framer.website/`** |
| Ground | Near-black `#09090B` | White and pale green |
| Accent | Electric blue glow | Deep forest and lime |
| Shape | Square corners, visible guide grid | Rounded cards, 18px radius |
| Runs on | port 4321 | port 4322 |

**Do not carry anything visual across from the dark build.** No near-black grounds, no electric blue, no square corners, no guide grid with registration marks, no huge light-weight display type. Those belong to Forma and stay in v1.

Two separate themes, two separate sites, one set of content. The dark build stays exactly as it is.

---

Same content, same pages, same copy. Colour system, card language and section rhythm come from Coinest; the client's own investor deck already uses this family, so this also brings the site back in line with their brand.

**Do not rebuild the content or the IA.** This is a re-skin plus the section-rhythm changes described in §4.

---

## 1. Tokens

```css
/* grounds */
--bg-base:        #FFFFFF;   /* default section ground */
--bg-tint:        #E9F2E5;   /* alternating pale-green section */
--bg-card:        #FFFFFF;   /* card on tinted ground */
--bg-card-tint:   #E4EFDF;   /* filled card, FAQ rows, info panels */
--bg-inverse:     #1B3E33;   /* deep forest — hero base, CTA panel, footer */

/* text */
--text-heading:   #143A2E;   /* 12.5:1 on white, 10.9:1 on tint */
--text-body:      #4A5A55;   /* 7.3:1 on white, 6.3:1 on tint */
--text-muted:     #5B6B66;   /* 5.6:1 on white — captions only */
--text-on-dark:   #FFFFFF;   /* 11.8:1 on forest */
--text-on-dark-2: #B9CFC6;   /*  7.2:1 on forest */
--text-on-lime:   #13291F;   /* 10.2:1 on lime */

/* accent */
--lime:           #A9E27C;   /* FILL ONLY — 1.5:1 on white, never text */
--lime-hover:     #97D467;
--forest:         #1B3E33;   /* icon chips, dark panels */
--forest-deep:    #13291F;

/* lines & shape */
--border:         #E2E8E0;
--border-strong:  #CBD8C6;
--focus-ring:     #143A2E;   /* 2px solid, 3px offset */

--radius-card:    18px;
--radius-panel:   24px;
--radius-pill:    999px;
--shadow-card:    0 1px 2px rgba(19,41,31,.04), 0 8px 24px rgba(19,41,31,.06);
```

**The lime is a fill, never a text colour.** At 1.5:1 on white it fails everything. It carries buttons, stat cards and highlight panels, always with `--text-on-lime` on top. Every green *word* on the site uses `--text-heading`. This is the exact mistake the old mint site made — do not repeat it.

---

## 2. The hero gradient

The blend is a soft vertical wash, not a glow:

```css
background: linear-gradient(180deg, #FFFFFF 0%, #F2F8EF 46%, #E4EFDF 100%);
```

White at the top so the nav floats clean, deepening to pale green at the bottom where the hero visual sits. The visual overlaps the boundary into the next section rather than stopping at it — that overlap is what makes it read as blended rather than banded.

Optional deep variant for the homepage only: the same wash sitting over a `--bg-inverse` band, with the terrain mesh at low opacity at the very bottom.

---

## 3. Signature patterns — match these

1. **Pill eyebrow on every section.** A rounded two-tone pill above the heading: a dot, the brand word, then the section label. Small, centred.
2. **Centred section headers.** Heading in `--text-heading`, then one line of `--text-body` beneath it, both centred, generous space before the content. This is the strongest rhythm signal in the reference — every section opens the same way.
3. **Rounded cards, 18px, white on tint / tint on white.** Hairline border plus the soft shadow. Never square corners.
4. **Lime pill buttons with dark green text.** Primary CTA everywhere. Secondary is a ghost pill with a `--border-strong` outline.
5. **Deep-forest rounded-square icon chips**, lime or white glyph inside. Use these where the dark build currently has bare SVG marks.
6. **Full-width deep-forest CTA panel**, `--radius-panel`, with the visual bleeding off one edge. Use for the closing CTA on every page.
7. **A lime stat card** for the metrics band — dark text on lime, three or four figures.
8. **Floating nav.** A rounded pill container with a border, inset from the page edges — not a full-bleed bar.

---

## 4. Section rhythm

Per page, in order:

1. Hero — gradient wash (§2)
2. White
3. Tint `--bg-tint`
4. White, containing one deep-forest inset panel
5. Tint
6. Deep-forest CTA panel
7. Footer — deep forest

Rule: never more than two consecutive sections on the same ground, and never more than three ground changes between the hero and the CTA. The dark inset panel in §4 is what stops the middle of the page going flat.

---

## 5. Diagrams

All existing figures carry over, recoloured, not redrawn:

- Strokes: `--text-heading` at 100% for primary paths, `--border-strong` for secondary
- Nodes and highlights: `--forest` fill, or lime fill where something is the active/scored state
- Fills inside diagrams: `--bg-card-tint`
- Figure captions stay, in `--text-muted`

The line-art language does not change. Only the palette does.

---

## 6. Carry over from the dark build — unchanged

- All content, copy and page structure
- Motion spec: 0.4/0.5/0.6s, 0.1s stagger, `cubic-bezier(0.44,0,0.56,1)` for reveals, `cubic-bezier(0.33,1,0.68,1)` for hover, nav does not animate on scroll
- Full `prefers-reduced-motion` support
- Real visible focus states — `--focus-ring`, never `outline: none`
- Every section has a visual
- One type scale governs diagram labels and page text alike (labels as HTML, not SVG `<text>`)

---

## 7. Build order

1. Token layer and layout primitives.
2. Homepage only. Screenshot at 1440px and stop for review.
3. Remaining pages after sign-off.

Keep the dark build intact at its current path and port. This ships alongside it, not over it.

## 8. Self-check before you present the homepage

Confirm each of these:

- No green text anywhere. Every heading is `#143A2E`; lime appears only as a fill with dark text on it.
- No `#09090B`, no `#3B8BFF`, no square-cornered cards, no guide grid — nothing carried over from the dark build's palette or shape language.
- Every section opens with pill eyebrow → centred heading → one line of body → content.
- No three consecutive sections share a ground colour.
- Every diagram label is HTML using the page type scale, not SVG `<text>`.
- Every animated path completes; nothing renders stuck part-drawn.
- Both sites run simultaneously: dark on 4321, light on 4322.
