import { Dia, FigSvg } from "./dia";
import { Label, NumLabel } from "./label";

const INNER =
  '<circle cx="260" cy="260" r="150" class="s-d"/>' +
  '<path d="M260 110 A150 150 0 0 1 410 260" class="s draw" style="--dd:150ms"/>' +
  '<path d="M410 260 A150 150 0 0 1 260 410" class="s draw" style="--dd:330ms"/>' +
  '<path d="M260 410 A150 150 0 0 1 110 260" class="s draw" style="--dd:510ms"/>' +
  '<path d="M110 260 A150 150 0 0 1 260 110" class="s-a draw" style="--dd:690ms"/>' +
  '<g class="pop" style="--dd:400ms"><circle cx="260" cy="110" r="7" class="dot"/></g>' +
  '<g class="pop" style="--dd:500ms"><circle cx="410" cy="260" r="7" class="dot"/></g>' +
  '<g class="pop" style="--dd:600ms"><circle cx="260" cy="410" r="7" class="dot"/></g>' +
  '<g class="pop" style="--dd:700ms"><circle cx="110" cy="260" r="7" class="dot-a"/></g>';

/** Ports build.py's fig_flywheel(). Used on home + platform. */
export function FigFlywheel() {
  return (
    <Dia
      labels={
        <>
          <Label x={50} y={9} title="01 Discover" sub="AI scores assets" mod="c" />
          <Label x={84} y={50} title="02 Acquire" sub="Rights secured" mod="m" />
          <Label x={50} y={87} title="03 Cash flow" sub="Royalties + SaaS" mod="c" />
          <Label x={16} y={50} title="04 Reinvest" sub="Larger positions" mod="rm" />
          <NumLabel x={50} y={50} value="$1B" caption="By 2030" />
        </>
      }
    >
      <FigSvg
        viewBox="0 0 520 520"
        label="A four-stage cycle: discover, acquire, cash flow, reinvest, returning to discover, with one billion dollars by 2030 at the centre."
        inner={INNER}
      />
    </Dia>
  );
}
