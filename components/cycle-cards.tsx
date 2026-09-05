const ITEMS: [string, string][] = [
  ["01 Discover", "The engine scores undervalued tracts and rights against the public record."],
  ["02 Acquire", "Rights and royalty streams secured at assessed-value baselines."],
  ["03 Cash flow", "Royalty distributions and platform subscriptions generate recurring revenue."],
  ["04 Reinvest", "Proceeds fund larger positions, the loop that compounds the portfolio."],
];

/** Ports build.py's CYCLE_CARDS: the four-step list beside FigFlywheel. Used on home + platform. */
export function CycleCards() {
  return (
    <>
      {ITEMS.map(([title, body]) => (
        <div className="panel" data-rv key={title}>
          <p className="mono">{title}</p>
          <p className="body" style={{ marginTop: 8 }}>
            {body}
          </p>
        </div>
      ))}
    </>
  );
}
