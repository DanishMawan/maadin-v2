import { Dia, FigSvg } from "./dia";
import { Label } from "./label";

const SEGS: [string, number, number][] = [
  ["Thimar platform build", 45, 0],
  ["First asset acquisition", 30, 45],
  ["Team & operations", 15, 75],
  ["Data & infrastructure", 10, 90],
];
const W = 1000;

function inner() {
  let p =
    '<g class="grow" style="--dd:150ms"><rect x="0" y="26" width="1000" height="48" rx="10" class="s"/>' +
    '<rect x="2" y="28" width="446" height="44" rx="8" fill="var(--lime)" opacity=".55"/></g>';
  SEGS.forEach(([, pct, off], i) => {
    const x = (off * W) / 100;
    const w = (pct * W) / 100;
    if (i > 0) {
      p += `<line x1="${x}" y1="26" x2="${x}" y2="74" class="s pop" style="--dd:${380 + i * 90}ms"/>`;
    }
    p += `<line x1="${x + w / 2}" y1="74" x2="${x + w / 2}" y2="92" class="s-d pop" style="--dd:${460 + i * 90}ms"/>`;
  });
  return p;
}

/** Ports build.py's fig_proceeds(). Used on investors. */
export function FigProceeds() {
  return (
    <Dia
      padPx={76}
      labels={SEGS.map(([label, pct, off]) => (
        <Label key={label} x={off + pct / 2} y={0} title={`${pct}%`} sub={label} mod="c" below={10} />
      ))}
    >
      <FigSvg
        viewBox="0 0 1000 110"
        label="Use of proceeds as one stacked bar: 45 percent platform build, 30 percent first asset acquisition, 15 percent team and operations, 10 percent data and infrastructure."
        inner={inner()}
      />
    </Dia>
  );
}
