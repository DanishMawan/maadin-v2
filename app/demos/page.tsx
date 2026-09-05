import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/hero";
import { Closer } from "@/components/closer";
import { Figure } from "@/components/figure";
import { FigPipeline } from "@/components/diagrams/fig-pipeline";
import { FigDemoStrip } from "@/components/diagrams/fig-demo-strip";
import { DEMOS } from "@/lib/content/demos";

export const metadata: Metadata = {
  title: "Live demos, three working prototypes | Maadin.AI",
  description:
    "Three proprietary AI prototypes built on public natural-resource data: mineral rights intelligence, a regulatory filing agent, and a Texas water rights monitor.",
};

export default function DemosIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Proof of capability"
        heading="Three working systems. Not slides."
        dek="Three proprietary prototypes built on public natural-resource data, live demonstrations of the intelligence layer behind Thimar, not concepts."
      />

      <section className="sec band">
        <div className="wrap">
          <div data-rv style={{ marginBottom: "var(--gap-5)" }}>
            <Figure caption="Fig. 1. All three prototypes exercise the same pipeline.">
              <FigPipeline />
            </Figure>
          </div>
          <div className="grid g3" data-rv-group>
            {DEMOS.map((d) => (
              <Link className="card" href={`/demos/${d.slug}`} data-rv key={d.slug}>
                <FigDemoStrip kind={d.kind} />
                <div>
                  <div className="h3">{d.title}</div>
                  <p className="body" style={{ marginTop: 10 }}>
                    {d.blurb}
                  </p>
                </div>
                <div style={{ marginTop: "auto" }}>
                  <p className="mono bright">{d.m1}</p>
                  <p className="mono">{d.m2}</p>
                  <p className="mono" style={{ marginTop: 8 }}>
                    {d.src}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <p className="illus" data-rv style={{ marginTop: "var(--gap-5)" }}>
            Illustrative data. Not a real asset.
          </p>
          <p className="body" data-rv style={{ marginTop: "var(--gap-3)", maxWidth: "60ch" }}>
            Every identifier, place name and operator on these pages is invented. No real company, parcel or
            district is represented.
          </p>
        </div>
      </section>

      <Closer
        heading="Want the methodology?"
        ctas={
          <>
            <Link className="btn btn--primary" href="/contact">
              Request the methodology <i aria-hidden="true">&rarr;</i>
            </Link>
            <Link className="btn btn--ghost" href="/investors">
              Request the data room <i aria-hidden="true">&rarr;</i>
            </Link>
          </>
        }
      />
    </>
  );
}
