// Mineral / geological glyph set used inside deep-forest icon chips. Ported
// verbatim from legacy-static-site/build.py's GLYPH dict — raw SVG path
// markup (not JSX), injected via dangerouslySetInnerHTML by <IconChip>.
export const GLYPH = {
  strata: '<path d="M2 7h20M2 12h20M2 17h20" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
  crystal:
    '<path d="M12 2 21 8v8l-9 6-9-6V8z" stroke-width="1.6" fill="none" stroke-linejoin="round"/>' +
    '<path d="M12 2v20M3 8l9 6 9-6" stroke-width="1.2" fill="none"/>',
  parcel:
    '<path d="M3 3h18v18H3z" stroke-width="1.6" fill="none"/>' +
    '<path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke-width="1.1" fill="none"/>',
  core:
    '<path d="M8 3h8v18H8z" stroke-width="1.6" fill="none" stroke-linejoin="round"/>' +
    '<path d="M8 9h8M8 14h8" stroke-width="1.2" fill="none"/>',
  basin:
    '<path d="M2 8c4 0 5 9 10 9s6-9 10-9" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M2 14c4 0 5 6 10 6s6-6 10-6" stroke-width="1.1" fill="none" stroke-linecap="round"/>',
  seismic:
    '<path d="M2 12h4l2-6 3 13 3-9 2 4h6" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  drill:
    '<path d="M12 2v13M7 21h10M12 15l-4 6M12 15l4 6" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  doc:
    '<path d="M6 2h8l4 4v16H6z" stroke-width="1.6" fill="none" stroke-linejoin="round"/>' +
    '<path d="M14 2v4h4M9 12h6M9 16h6" stroke-width="1.2" fill="none" stroke-linecap="round"/>',
  globe:
    '<circle cx="12" cy="12" r="9" stroke-width="1.6" fill="none"/>' +
    '<path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke-width="1.1" fill="none"/>',
  shield:
    '<path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5z" stroke-width="1.6" fill="none" stroke-linejoin="round"/>' +
    '<path d="M9 12l2.5 2.5L16 10" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  growth:
    '<path d="M3 20h18" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M6 16v-3M11 16V8M16 16v-6M21 16V4" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
  compass:
    '<circle cx="12" cy="12" r="9" stroke-width="1.6" fill="none"/>' +
    '<path d="M15.5 8.5l-2 5-5 2 2-5z" stroke-width="1.4" fill="none" stroke-linejoin="round"/>',
} as const;

export type GlyphKind = keyof typeof GLYPH;
