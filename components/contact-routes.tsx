import { IconChip } from "./icon-chip";
import type { GlyphKind } from "@/lib/content/glyphs";

const ROUTES: { glyph: GlyphKind; k: string; v: string }[] = [
  { glyph: "growth", k: "Invest", v: "Seed round · data room under NDA" },
  { glyph: "compass", k: "Partner / build", v: "Platform and data partnerships" },
  { glyph: "shield", k: "Advisory", v: "Fractional CRO / CAIO engagements" },
];

/** Ports build.py's fig_contact(): three enquiry routes as a list, not a graph. */
export function ContactRoutes() {
  return (
    <div
      className="routes"
      data-rv-group
      role="img"
      aria-label="Three enquiry routes, all reaching Arshad directly rather than a support queue."
    >
      {ROUTES.map((r, i) => (
        <div className="route" data-rv style={{ "--st": `${i * 90}ms` } as React.CSSProperties} key={r.k}>
          <IconChip kind={r.glyph} />
          <div>
            <p className="gcard__k">{r.k}</p>
            <p className="gcard__n">{r.v}</p>
          </div>
        </div>
      ))}
      <p className="routes__foot">All three reach Arshad directly, not a support queue.</p>
    </div>
  );
}
