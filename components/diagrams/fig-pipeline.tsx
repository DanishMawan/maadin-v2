import { Dia, FigSvg } from "./dia";
import { Label } from "./label";

const XS = [150, 450, 750, 1050];
const STEPS: [string, string][] = [
  ["01 Ingest", "USGS · BLM · RRC · TWDB"],
  ["02 Analyse", "Discovery & valuation"],
  ["03 Classify", "Four asset classes"],
  ["04 Compound", "Toward $1B by 2030"],
];

function inner() {
  let p =
    '<line x1="150" y1="60" x2="1050" y2="60" class="s-d draw" style="--dd:60ms"/>' +
    '<line x1="150" y1="60" x2="450" y2="60" class="s draw" style="--dd:260ms"/>' +
    '<line x1="300" y1="18" x2="300" y2="102" class="s-a draw" style="--dd:520ms" stroke-dasharray="3 4"/>';
  XS.forEach((x, i) => {
    const last = i === XS.length - 1;
    p +=
      `<g class="pop" style="--dd:${200 + i * 100}ms"><circle cx="${x}" cy="60" r="${last ? 7 : 6}" class="${last ? "dot-a" : "dot"}"/>` +
      `<circle cx="${x}" cy="60" r="15" class="${last ? "s-a" : "s"}"/></g>`;
  });
  return p;
}

/** Ports build.py's fig_pipeline(). Used on home, platform, demos index, mineral demo. */
export function FigPipeline() {
  return (
    <Dia
      padPx={96}
      padTop={40}
      labels={
        <>
          <Label x={25} y={0} title="Public record →← Proprietary" mod="c nw" above={26} />
          {XS.map((x, i) => (
            <Label key={x} x={(x / 1200) * 100} y={0} title={STEPS[i][0]} sub={STEPS[i][1]} mod="c" below={14} />
          ))}
        </>
      }
    >
      <FigSvg
        viewBox="0 0 1200 120"
        label="Four-station pipeline: ingest, analyse, classify, compound. A dashed divider separates the public record from proprietary processing."
        inner={inner()}
      />
    </Dia>
  );
}
