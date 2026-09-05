import { Dia, FigSvg } from "./dia";
import { Label } from "./label";

const INNER =
  '<g class="draw" style="--dd:240ms">' +
  '<path d="M250 56 C340 56 350 190 430 206" class="s-d"/>' +
  '<path d="M250 126 C340 126 350 192 430 208" class="s-d"/>' +
  '<path d="M250 196 C340 196 360 204 430 210" class="s-d"/>' +
  '<path d="M250 266 C340 266 350 226 430 212" class="s-d"/>' +
  '<path d="M250 336 C340 336 350 232 430 214" class="s-d"/></g>' +
  '<g class="pop" style="--dd:120ms">' +
  '<circle cx="240" cy="56" r="4" class="dot"/><circle cx="240" cy="126" r="4" class="dot"/>' +
  '<circle cx="240" cy="196" r="4" class="dot"/><circle cx="240" cy="266" r="4" class="dot"/>' +
  '<circle cx="240" cy="336" r="4" class="dot"/></g>' +
  '<g class="pop" style="--dd:520ms"><rect x="430" y="172" width="150" height="76" rx="12" class="s"/>' +
  '<circle cx="430" cy="210" r="5" class="dot-a"/></g>' +
  '<g class="draw" style="--dd:660ms">' +
  '<path d="M580 210 C660 210 680 74 760 74" class="s"/>' +
  '<path d="M580 210 C660 210 680 164 760 164" class="s"/>' +
  '<path d="M580 210 C660 210 680 254 760 254" class="s"/>' +
  '<path d="M580 210 C660 210 680 344 760 344" class="s"/></g>' +
  '<g class="pop" style="--dd:840ms">' +
  '<circle cx="760" cy="74" r="5" class="dot"/><circle cx="760" cy="164" r="5" class="dot"/>' +
  '<circle cx="760" cy="254" r="5" class="dot"/><circle cx="760" cy="344" r="5" class="dot"/></g>';

/** Ports build.py's fig_assets(). Used on home + platform. */
export function FigAssets() {
  return (
    <Dia
      labels={
        <>
          <Label x={0} y={13.3} title="USGS MRDS" mod="m" />
          <Label x={0} y={30} title="BLM LR2000" mod="m" />
          <Label x={0} y={46.7} title="Texas RRC" mod="m" />
          <Label x={0} y={63.3} title="TWDB / GCD" mod="m" />
          <Label x={0} y={80} title="Satellite" mod="m" />
          <Label x={50.5} y={50} title="Thimar" sub="Scoring engine" mod="cm" />
          <Label x={78} y={17.6} title="Critical minerals" sub="Lithium · cobalt · REE" mod="m" />
          <Label x={78} y={39} title="Oil & gas royalties" sub="Permian · Eagle Ford" mod="m" />
          <Label x={78} y={60.5} title="Water rights" sub="TX groundwater districts" mod="m" />
          <Label x={78} y={82} title="Carbon markets" sub="Voluntary + compliance" mod="m" />
        </>
      }
    >
      <FigSvg
        viewBox="0 0 1000 420"
        label="Five public data sources converge on the Thimar scoring engine and fan out to four asset classes."
        inner={INNER}
      />
    </Dia>
  );
}
