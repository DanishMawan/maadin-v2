/** Ports build.py's fig_architecture(): same CSS rail technique as FigRoadmap. Used on platform. */
export function FigArchitecture() {
  return (
    <div
      className="dia dia--rail"
      style={{ minHeight: "100%" }}
      role="img"
      aria-label="Depth indicator running from commodity data at the top to a defensible position at the bottom."
    >
      <span className="rail" aria-hidden="true">
        <span className="rail__line" />
        <span className="rail__line rail__line--on" style={{ bottom: "50%" }} />
        <span className="rail__dot rail__dot--done" style={{ top: "10%" }} />
        <span className="rail__dot rail__dot--done" style={{ top: "50%" }} />
        <span className="rail__dot rail__dot--now" style={{ top: "90%" }} />
      </span>
    </div>
  );
}
