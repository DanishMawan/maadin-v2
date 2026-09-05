import { Dia, FigSvg } from "./dia";
import { Label } from "./label";

const INNER =
  '<line x1="60" y1="70" x2="940" y2="70" class="s-d draw" style="--dd:80ms"/>' +
  '<line x1="60" y1="70" x2="646" y2="70" class="s draw" style="--dd:260ms"/>' +
  '<g class="pop" style="--dd:220ms"><circle cx="60" cy="70" r="7" class="dot"/><circle cx="60" cy="70" r="16" class="s"/></g>' +
  '<g class="pop" style="--dd:320ms"><circle cx="353" cy="70" r="7" class="dot"/><circle cx="353" cy="70" r="16" class="s"/></g>' +
  '<g class="pop" style="--dd:420ms"><circle cx="646" cy="70" r="7" class="dot"/><circle cx="646" cy="70" r="16" class="s"/></g>' +
  '<g class="pop" style="--dd:520ms"><circle cx="940" cy="70" r="7" class="dot-a"/><circle cx="940" cy="70" r="16" class="s-a"/></g>';

/** Ports build.py's fig_founder(). Used on about. */
export function FigFounder() {
  return (
    <Dia
      padPx={64}
      padTop={40}
      labels={
        <>
          <Label x={0} y={0} title="15 years · software → subsurface" mod="nw" above={26} />
          <Label x={0} y={0} title="NLP / CV" mod="nw" below={14} />
          <Label x={35.3} y={0} title="Deep learning" mod="c nw" below={14} />
          <Label x={64.6} y={0} title="LLM / agentic" mod="c nw" below={14} />
          <Label x={100} y={0} title="Physical world" mod="r nw" below={14} />
        </>
      }
    >
      <FigSvg
        viewBox="0 0 1000 150"
        label="Fifteen years of AI moving from early NLP through deep learning and agentic systems to the physical world."
        inner={INNER}
      />
    </Dia>
  );
}
