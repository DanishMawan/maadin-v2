import type { ReactNode } from "react";

const DEFAULT_CARD: [string, string][] = [
  ["Request the seed data room", "NDA required"],
  ["Open the live demos", "3 prototypes"],
  ["Work with Arshad", "2 slots"],
];

/** Ports build.py's closer(): the full-width deep-forest CTA panel used on every page. */
export function Closer({
  heading,
  ctas,
  card = DEFAULT_CARD,
}: {
  heading: ReactNode;
  ctas: ReactNode;
  card?: [ReactNode, ReactNode][];
}) {
  return (
    <section className="sec band">
      <div className="wrap">
        <div className="ctapanel" data-rv>
          <div>
            <p className="eyebrow">
              <span>Next step</span>
            </p>
            <h2 className="h1" style={{ marginTop: "var(--gap-3)", maxWidth: "15ch" }}>
              {heading}
            </h2>
            <div className="hero-ctas" style={{ marginTop: "var(--gap-4)", justifyContent: "flex-start" }}>
              {ctas}
            </div>
          </div>
          <div className="ctacard">
            {card.map(([a, b], i) => (
              <div className="ctacard__row" key={i}>
                <b>{a}</b>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
