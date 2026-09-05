import { Dia, FigSvg } from "./dia";
import { Label, NumLabel } from "./label";

const INNER =
  '<g class="pop" style="--dd:120ms"><rect x="4" y="34" width="300" height="90" rx="14" class="s"/></g>' +
  '<g class="pop" style="--dd:220ms"><rect x="4" y="176" width="300" height="90" rx="14" class="s"/></g>' +
  '<g class="draw" style="--dd:340ms">' +
  '<path d="M304 79 H400 V140" class="s-d"/>' +
  '<path d="M304 221 H400 V160" class="s-d"/>' +
  '<path d="M400 150 H500" class="s"/></g>' +
  '<g class="pop" style="--dd:560ms"><circle cx="640" cy="150" r="92" class="s-d"/>' +
  '<circle cx="640" cy="58" r="6" class="dot-a"/></g>' +
  '<path d="M640 58 A92 92 0 0 1 732 150" class="s-a draw" style="--dd:640ms"/>';

/** Ports build.py's fig_two_engines(). Used on about. */
export function FigTwoEngines() {
  return (
    <Dia
      floor="wide"
      labels={
        <>
          <Label x={4.5} y={26.3} title="The platform · Venture" sub="Thimar, acquires & compounds assets" mod="m" className="dia__l--boxfit" />
          <Label x={4.5} y={73.7} title="The practice · Advisory" sub="Fractional CAIO / CRO" mod="m" className="dia__l--boxfit" />
          <NumLabel x={86.5} y={50} value="$1B" caption="One mission · 2030" />
        </>
      }
    >
      <FigSvg
        viewBox="0 0 740 300"
        label="The platform venture and the advisory practice both feed one compounding mission."
        inner={INNER}
      />
    </Dia>
  );
}
