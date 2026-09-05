import type { ReactNode } from "react";

/**
 * Ports build.py's sec()/sec_split(). The legacy GROUND dict (section id ->
 * ground class) is not reproduced as an indirection layer here — each page
 * passes its section's ground directly via `ground`, using the same values
 * GROUND held for that section id, since React call sites are already
 * per-page and explicit.
 */
type SectionProps = {
  id: string;
  eyebrow: ReactNode;
  heading: ReactNode;
  body?: ReactNode;
  ground?: string;
  headingClassName?: string;
  children?: ReactNode;
};

export function Section({
  id,
  eyebrow,
  heading,
  body,
  ground = "band",
  headingClassName = "h2",
  children,
}: SectionProps) {
  return (
    <section className={`sec ${ground}`} id={id} aria-labelledby={`${id}-h`}>
      <div className="wrap">
        <div className="shead" data-rv-group>
          <p className="eyebrow" data-rv>
            <span>{eyebrow}</span>
          </p>
          <h2 className={headingClassName} id={`${id}-h`} data-rv>
            {heading}
          </h2>
          {body ? (
            <p className="lead" data-rv style={{ marginTop: "var(--gap-3)" }}>
              {body}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

type SectionSplitProps = SectionProps & { aside: ReactNode };

export function SectionSplit({
  id,
  eyebrow,
  heading,
  body,
  aside,
  ground = "band",
  headingClassName = "h2",
  children,
}: SectionSplitProps) {
  return (
    <section className={`sec ${ground}`} id={id} aria-labelledby={`${id}-h`}>
      <div className="wrap">
        <div className="shead" data-rv-group>
          <p className="eyebrow" data-rv>
            <span>{eyebrow}</span>
          </p>
          <h2 className={headingClassName} id={`${id}-h`} data-rv>
            {heading}
          </h2>
          {body ? <p className="lead" data-rv>{body}</p> : null}
        </div>
        <div data-rv style={{ marginTop: "var(--gap-5)" }}>
          {aside}
        </div>
        {children}
      </div>
    </section>
  );
}
