import type { ReactNode } from "react";

/**
 * Ports .tablecard. Fix: the legacy CSS clipped wide tables on narrow
 * viewports (`.tablecard{overflow:hidden}`, no scroll) — some call sites
 * patched this ad hoc with an inline `overflow-x:auto`, others didn't. This
 * wrapper always scrolls its table horizontally instead of clipping it.
 */
export function TableCard({ children }: { children: ReactNode }) {
  return (
    <div className="tablecard">
      <div className="tablecard__scroll">{children}</div>
    </div>
  );
}
