import { Label } from "./label";

const ROWS = [
  { ph: "Phase 01", title: "Incorporate & build Thimar", meta: "Entity · pipelines · three prototypes", state: "done" as const },
  { ph: "Phase 02", title: "First asset acquisition", meta: "Mineral rights or royalty · DOE / SBIR", state: "now" as const },
  { ph: "Phase 03", title: "Platform + portfolio scale", meta: "Thimar as SaaS · 5–10 positions", state: "next" as const },
  { ph: "Phase 04", title: "$1B valuation", meta: "Compounding · platform revenue", state: "next" as const },
];
const BADGE = { done: "Complete", now: "In progress", next: "Target" };
const DOT_MOD = { done: " rail__dot--done", now: " rail__dot--now", next: "" };

/** Ports build.py's fig_roadmap(): drawn in CSS (rail__dot/rail__line), not SVG —
 *  a full-height column stretched a small viewBox non-uniformly. Used on home + investors. */
export function FigRoadmap() {
  const n = ROWS.length - 1;
  return (
    <div className="dia-scroll">
      <div
        className="dia dia--rail"
        role="img"
        aria-label="Vertical roadmap of four phases read top to bottom; phase one complete, phase two in progress, phases three and four are targets."
      >
        <span className="rail" aria-hidden="true">
          <span className="rail__line" />
          <span className="rail__line rail__line--on" style={{ bottom: `${10 + (80 / n) * (n - 1)}%` }} />
          {ROWS.map((row, i) => (
            <span key={row.ph} className={`rail__dot${DOT_MOD[row.state]}`} style={{ top: `${10 + i * (80 / n)}%` }} />
          ))}
        </span>
        {ROWS.map((row, i) => (
          <Label
            key={row.ph}
            x={0}
            y={10 + i * (80 / n)}
            title={row.title}
            sub={`${row.ph} · ${BADGE[row.state]} · ${row.meta}`}
            mod="m"
          />
        ))}
      </div>
    </div>
  );
}
