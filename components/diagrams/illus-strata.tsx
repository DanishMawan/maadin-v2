const INNER =
  '<path d="M0 74 C90 56 150 92 230 78 C300 66 360 86 420 74" class="s-d draw" style="--dd:80ms"/>' +
  '<path d="M0 118 C90 100 150 136 230 122 C300 110 360 130 420 118" class="s-d draw" style="--dd:180ms"/>' +
  '<path d="M0 162 C90 144 150 180 230 166 C300 154 360 174 420 162" class="s-d draw" style="--dd:280ms"/>' +
  '<path d="M0 206 C90 188 150 224 230 210 C300 198 360 218 420 206" class="s-d draw" style="--dd:380ms"/>' +
  '<path d="M0 30 C90 12 150 48 230 34 C300 22 360 42 420 30" class="s draw" style="--dd:40ms"/>' +
  '<g class="pop" style="--dd:560ms">' +
  '<rect x="196" y="26" width="52" height="196" rx="8" class="s-a" fill="none"/>' +
  '<circle cx="222" cy="122" r="9" class="dot-a"/></g>' +
  '<g class="pop" style="--dd:660ms">' +
  '<line x1="222" y1="240" x2="222" y2="228" class="s"/></g>';

/** Ports build.py's illus_strata(): a layered basin cross-section with one scored parcel. */
export function IllusStrata() {
  return (
    <div className="illus" data-rv>
      <svg
        className="fig"
        viewBox="0 0 420 260"
        role="img"
        aria-label="Cross-section of layered rock strata with one parcel column identified and scored."
        dangerouslySetInnerHTML={{ __html: INNER }}
      />
    </div>
  );
}
