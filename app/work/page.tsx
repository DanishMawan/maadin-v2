import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/hero";
import { Section } from "@/components/section";
import { Closer } from "@/components/closer";
import { Figure } from "@/components/figure";
import { TrackBars } from "@/components/track-bars";
import { TRACK_THREADS } from "@/lib/content/track";

export const metadata: Metadata = {
  title: "Work, track record | Maadin.AI",
  description:
    "Fifteen years of AI leadership, enterprise business development, CTO architecture, company building and published work.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Track record"
        heading="Delivered where reliability isn’t optional."
        dek="Fifteen years of building and selling AI inside organisations where a wrong answer has consequences. Named references are available under NDA."
      />

      <section className="sec band band--tint">
        <div className="wrap">
          <div className="split">
            <div className="head" data-rv-group>
              <p className="eyebrow" data-rv>
                <span>Lead engagement</span>
              </p>
              <h2 className="h2" data-rv>
                US defense institution
              </h2>
              <p className="lead" data-rv>
                Mission-critical AI systems, delivered under constraints most commercial deployments never
                encounter.
              </p>
              <p className="body" data-rv style={{ marginTop: "var(--gap-3)" }}>
                The requirement was not accuracy in the abstract, it was reliability, security and precision
                under conditions where a wrong output is not a bad recommendation but an operational failure.
                That forced decisions in the architecture: deterministic guardrails around probabilistic
                components, full auditability of every inference, and a deployment model that assumed
                constrained connectivity rather than a cloud round-trip.
              </p>
              <p className="body" data-rv style={{ marginTop: "var(--gap-3)" }}>
                The same discipline is what Thimar applies to statutory filings today: a language model
                proposes, a rules engine verifies, and nothing reaches a regulator without a check that can be
                shown.
              </p>
            </div>
            <div data-rv>
              <div className="panel">
                <p className="eyebrow">
                  <span>Outcome</span>
                </p>
                <table className="dtable" style={{ marginTop: "var(--gap-3)" }}>
                  <tbody>
                    <tr>
                      <td>Engagement</td>
                      <td className="num bright">
                        <span className="ph">Withheld</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Scale</td>
                      <td className="num bright">
                        <span className="ph">Withheld</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Outcome</td>
                      <td className="num bright">
                        <span className="ph">Withheld</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="mono" style={{ marginTop: "var(--gap-3)" }}>
                  Client naming and outcome metrics pending permission. PLACEHOLDERS D4, D7. Named references
                  available under NDA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="threads"
        ground="band band--tint"
        eyebrow="The record"
        heading="Five threads, run in parallel."
        body="These are not sequential roles. They overlapped, which is the point, the commercial work funded the technical work and vice versa."
      >
        <div data-rv style={{ marginTop: "var(--gap-5)" }}>
          <Figure caption="Fig. 1. Five threads across fifteen years.">
            <TrackBars />
          </Figure>
        </div>
        <div className="grid g3" data-rv-group style={{ marginTop: "var(--gap-5)" }}>
          {TRACK_THREADS.map((t) => (
            <div className="card" data-rv key={t.title}>
              <p className="chip">{t.tag}</p>
              <div className="h3">{t.title}</div>
              <p className="body">{t.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Closer
        heading="Hire the record, not the résumé."
        ctas={
          <>
            <Link className="btn btn--primary" href="/advisory">
              Discuss an engagement <i aria-hidden="true">&rarr;</i>
            </Link>
            <Link className="btn btn--ghost" href="/about">
              Full founder story <i aria-hidden="true">&rarr;</i>
            </Link>
          </>
        }
      />
    </>
  );
}
