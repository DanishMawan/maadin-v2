import type { ReactNode } from "react";
import { IconChip } from "./icon-chip";
import type { GlyphKind } from "@/lib/content/glyphs";

export type FactCardItem = {
  glyph: GlyphKind;
  on?: boolean;
  k: ReactNode;
  v: ReactNode;
  note?: ReactNode;
  /** Bulleted list instead of a body paragraph (fig_expertise variant). */
  list?: ReactNode[];
};

/** Ports build.py's cards(): the fact-card grid (.gcards). */
export function FactCards({ items, className }: { items: FactCardItem[]; className?: string }) {
  const cols = items.length === 3 ? " gcards--3" : "";
  return (
    <div className={`gcards${cols}${className ? ` ${className}` : ""}`} data-rv-group>
      {items.map((item, i) => (
        <div className="gcard" data-rv style={{ "--st": `${i * 90}ms` } as React.CSSProperties} key={i}>
          <IconChip kind={item.glyph} on={item.on} />
          <p className="gcard__k">{item.k}</p>
          {item.list ? (
            <ul className="gcard__list">
              {item.list.map((li, j) => (
                <li key={j}>{li}</li>
              ))}
            </ul>
          ) : (
            <>
              <p className="gcard__v">{item.v}</p>
              {item.note ? <p className="gcard__n">{item.note}</p> : null}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
