const ITEMS = [
  { k: "Directional", v: "Advisory retainer", h: 38, on: false },
  { k: "Embedded", v: "Fractional CRO / CAIO · most requested", h: 100, on: true },
  { k: "Focused", v: "GTM sprint · 90 days", h: 66, on: false },
] as const;

/** Ports build.py's fig_engagements(): three centred, height-encoded bars. */
export function EngagementDepth() {
  return (
    <div
      className="depth"
      data-rv-group
      role="img"
      aria-label="Three engagement models ordered by depth of involvement: directional, embedded, focused."
    >
      <p className="depth__axis">Depth of involvement</p>
      {ITEMS.map((item, i) => (
        <div className="depth__col" data-rv style={{ "--st": `${i * 100}ms` } as React.CSSProperties} key={item.k}>
          <div className="depth__barwrap">
            <span
              className={`depth__bar${item.on ? " depth__bar--on" : ""}`}
              style={{ height: `${item.h}%` }}
            />
          </div>
          <p className="gcard__k">{item.k}</p>
          <p className="gcard__n">{item.v}</p>
        </div>
      ))}
    </div>
  );
}
