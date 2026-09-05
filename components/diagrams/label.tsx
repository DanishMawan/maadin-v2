import type { CSSProperties, ReactNode } from "react";

type LabelProps = {
  x: number;
  y?: number;
  title: ReactNode;
  sub?: ReactNode;
  /**
   * The exact modifier string build.py's L() received, e.g. "c", "m", "cm", "rm",
   * "r", "c nw", "r nw", or the bare "nw" (no positioning transform, just
   * nowrap + no max-width — used for a label pinned at the left/right edge that
   * must not be centered, or it clips past the diagram's edge). Passed through
   * verbatim rather than split into a separate boolean, since "nw" alone and
   * "c nw" produce different CSS class combinations (see .dia__l--c.nw /
   * .dia__l--nw in globals.css) and conflating them mis-centered a label.
   */
  mod?: string;
  below?: number;
  above?: number;
  /** Extra class appended after the mod class, for a label that needs a
   * one-off layout tweak (e.g. fitting inside a drawn SVG box) beyond what
   * the mod variants cover. */
  className?: string;
};

/** Ports build.py's L(): one HTML label pinned over a diagram's SVG box. */
export function Label({ x, y, title, sub, mod = "c", below, above, className }: LabelProps) {
  let top: string;
  if (below !== undefined) top = `calc(100% + ${below}px)`;
  else if (above !== undefined) top = `-${above}px`;
  else top = `${y ?? 0}%`;

  const style: CSSProperties = { left: `${x}%`, top };
  return (
    <div className={`dia__l dia__l--${mod}${className ? ` ${className}` : ""}`} style={style}>
      <b>{title}</b>
      {sub ? <i>{sub}</i> : null}
    </div>
  );
}

/** The "$1B by 2030"-style centred number-label variant used inline in a few figures. */
export function NumLabel({ x, y, value, caption }: { x: number; y: number; value: ReactNode; caption: ReactNode }) {
  return (
    <div className="dia__l dia__l--cm dia__l--num" style={{ left: `${x}%`, top: `${y}%` }}>
      <b>{value}</b>
      <i>{caption}</i>
    </div>
  );
}
