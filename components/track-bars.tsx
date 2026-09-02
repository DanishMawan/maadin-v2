import { TRACK_BARS } from "@/lib/content/track";

/** Ports build.py's fig_track(): five HTML progress bars, reused on work + advisory. */
export function TrackBars() {
  return (
    <div
      className="trk"
      data-rv-group
      role="img"
      aria-label="Five track-record threads running in parallel between 2010 and 2026."
    >
      <div className="trk__scale">
        <span>2010</span>
        <span>2026</span>
      </div>
      {TRACK_BARS.map((row, i) => (
        <div className="trk__row" data-rv style={{ "--st": `${i * 90}ms` } as React.CSSProperties} key={row.name}>
          <p className="trk__k">{row.name}</p>
          <div className="trk__track">
            <span
              className={`trk__bar${row.on ? " trk__bar--on" : ""}`}
              style={{ left: `${row.a}%`, right: `${100 - row.b}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
