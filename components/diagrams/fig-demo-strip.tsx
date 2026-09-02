import { Dia, FigSvg } from "./dia";

const MINERAL_INNER =
  '<circle cx="36" cy="48" r="28" class="s-d"/>' +
  '<path d="M36 20 A28 28 0 1 1 12 62" class="s-a draw" style="--dd:200ms"/>' +
  '<line x1="86" y1="48" x2="300" y2="48" class="s-d draw" style="--dd:160ms"/>' +
  '<g class="pop" style="--dd:340ms">' +
  '<circle cx="86" cy="48" r="4" class="dot"/><circle cx="140" cy="48" r="4" class="dot"/>' +
  '<circle cx="194" cy="48" r="4" class="dot"/><circle cx="247" cy="48" r="4" class="dot"/>' +
  '<circle cx="300" cy="48" r="4" class="dot-a"/></g>';

const FILING_INNER =
  '<line x1="16" y1="48" x2="304" y2="48" class="s-d draw" style="--dd:160ms"/>' +
  '<g class="pop" style="--dd:300ms">' +
  '<rect x="8" y="40" width="16" height="16" rx="4" class="s"/><rect x="78" y="40" width="16" height="16" rx="4" class="s"/>' +
  '<rect x="148" y="40" width="16" height="16" rx="4" class="s"/><rect x="218" y="40" width="16" height="16" rx="4" class="s"/>' +
  '<rect x="288" y="40" width="16" height="16" rx="4" class="s-a"/></g>';

const WATER_INNER =
  '<line x1="8" y1="88" x2="312" y2="88" class="s-d draw" style="--dd:140ms"/>' +
  '<g class="pop" style="--dd:300ms">' +
  '<rect x="18" y="62" width="42" height="26" rx="4" class="s"/><rect x="90" y="46" width="42" height="42" rx="4" class="s"/>' +
  '<rect x="162" y="32" width="42" height="56" rx="4" class="s"/><rect x="234" y="16" width="42" height="72" rx="4" class="s-a"/></g>';

/** Ports build.py's fig_demo_strip(kind): the small hero glyph on each demos-index card. */
export function FigDemoStrip({ kind }: { kind: "mineral" | "filing" | "water" }) {
  if (kind === "mineral") {
    return (
      <Dia
        className="dia--score"
        labels={
          <div className="dia__l dia__l--cm dia__l--num" style={{ left: "11%", top: "50%" }}>
            <b data-count>94</b>
          </div>
        }
      >
        <FigSvg viewBox="0 0 320 96" inner={MINERAL_INNER} />
      </Dia>
    );
  }
  if (kind === "filing") {
    return (
      <Dia>
        <FigSvg viewBox="0 0 320 96" inner={FILING_INNER} />
      </Dia>
    );
  }
  return (
    <Dia>
      <FigSvg viewBox="0 0 320 96" inner={WATER_INNER} />
    </Dia>
  );
}
