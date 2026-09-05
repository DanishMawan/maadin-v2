import { GLYPH, type GlyphKind } from "@/lib/content/glyphs";

export function IconChip({ kind, on }: { kind: GlyphKind; on?: boolean }) {
  return (
    <span className={`icochip${on ? " icochip--on" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: GLYPH[kind] }} />
    </span>
  );
}

export function Ichip({ children, lime }: { children: React.ReactNode; lime?: boolean }) {
  return <span className={`ichip${lime ? " ichip--lime" : ""}`}>{children}</span>;
}
