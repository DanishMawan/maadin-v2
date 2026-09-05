import type { ReactNode } from "react";

/** Ports build.py's asset_rows(): the expandable row list. Expand/collapse is
 *  driven by ClientEffects (`[data-row-btn]`), matching the legacy site.js. */
export function AccordionRows({ items }: { items: { title: ReactNode; body: ReactNode }[] }) {
  return (
    <div className="rows">
      {items.map((item, i) => (
        <div className="row" key={i}>
          <button
            className="row__btn"
            data-row-btn
            type="button"
            aria-expanded="false"
            aria-controls={`ac${i}`}
          >
            <span className="h3">{item.title}</span>
            <span className="row__sign" aria-hidden="true" />
          </button>
          <div className="row__panel" id={`ac${i}`} style={{ height: 0 }}>
            <div className="row__panel-in body">{item.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
