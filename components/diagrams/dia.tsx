import type { CSSProperties, ReactNode } from "react";

type DiaProps = {
  children: ReactNode; // the <svg class="fig">
  labels?: ReactNode; // <Label>/<NumLabel> elements
  padBottom?: number; // percent
  padPx?: number; // px, negative margin-bottom trick from the legacy build
  padTop?: number; // px
  className?: string;
};

/**
 * Ports build.py's dia(): wraps a figure SVG with its absolutely-positioned HTML labels.
 *
 * The outer `.dia-scroll` wrapper is a fix beyond the legacy build: percentage-positioned
 * text labels are a fixed font-size overlaid on an SVG that shrinks fluidly with the
 * viewport, so below a certain width the labels inevitably overlap or clip — the legacy
 * site's 1199px/809px breakpoints reduced label size but never enough for 320–375px
 * phones. Rather than guess at bespoke per-diagram repositioning, below 420px the
 * diagram gets a width floor and scrolls horizontally instead of compressing illegibly —
 * the same fix already applied to wide data tables.
 */
export function Dia({ children, labels, padBottom, padPx, padTop, className }: DiaProps) {
  const style: CSSProperties = {};
  if (padBottom) style.paddingBottom = `${padBottom}%`;
  if (padPx) style.marginBottom = `${padPx}px`;
  if (padTop) style.marginTop = `${padTop}px`;
  return (
    <div className="dia-scroll">
      <div className={`dia${className ? ` ${className}` : ""}`} style={style}>
        {children}
        {labels}
      </div>
    </div>
  );
}

/** Raw, trusted static SVG markup (paths/circles/groups) for one figure's inner content.
 *  Kept as strings (mirroring the legacy Python templates almost verbatim) rather than
 *  hand-converted JSX, since every attribute is static and this avoids transcription
 *  bugs across dozens of kebab-case SVG attributes. The outer <svg> stays real JSX so
 *  `.dia > svg` styling still matches. */
export function FigSvg({
  viewBox,
  label,
  inner,
  preserveAspectRatio,
}: {
  viewBox: string;
  label?: string;
  inner: string;
  preserveAspectRatio?: string;
}) {
  return (
    <svg
      className="fig"
      viewBox={viewBox}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      preserveAspectRatio={preserveAspectRatio}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
