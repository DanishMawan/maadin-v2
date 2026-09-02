import type { ReactNode } from "react";
import { Terrain } from "./terrain";

export function Hero({
  eyebrow,
  heading,
  dek,
  ctas,
  headingClassName = "h1",
  visual,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  dek: ReactNode;
  ctas: ReactNode;
  headingClassName?: string;
  visual?: ReactNode;
}) {
  return (
    <section className="sec band-hero">
      <Terrain />
      <div className="wrap" data-rv-group>
        <p className="eyebrow" data-rv>
          <span>{eyebrow}</span>
        </p>
        <h1
          className={headingClassName}
          data-rv
          style={{ marginTop: "var(--gap-3)", maxWidth: "19ch", marginInline: "auto" }}
        >
          {heading}
        </h1>
        <p className="lead" data-rv style={{ marginTop: "var(--gap-3)" }}>
          {dek}
        </p>
        <div className="hero-ctas" data-rv style={{ marginTop: "var(--gap-4)" }}>
          {ctas}
        </div>
        {visual}
      </div>
    </section>
  );
}

export function PageHeader({
  eyebrow,
  heading,
  dek,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  dek: ReactNode;
}) {
  return (
    <section className="sec band-head">
      <div className="wrap" data-rv-group>
        <p className="eyebrow" data-rv>
          <span>{eyebrow}</span>
        </p>
        <h1
          className="h2"
          data-rv
          style={{ marginTop: "var(--gap-3)", maxWidth: "22ch", marginInline: "auto" }}
        >
          {heading}
        </h1>
        <p className="lead" data-rv style={{ marginTop: "var(--gap-3)", marginInline: "auto" }}>
          {dek}
        </p>
      </div>
    </section>
  );
}
