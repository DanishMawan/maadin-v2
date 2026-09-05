import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/hero";
import { Closer } from "@/components/closer";
import { Figure } from "@/components/figure";
import { TrackBars } from "@/components/track-bars";
import { EngagementDepth } from "@/components/engagement-depth";
import { IllusStrata } from "@/components/diagrams/illus-strata";
import { FactCards } from "@/components/fact-cards";
import { TRACK_THREADS } from "@/lib/content/track";

export const metadata: Metadata = {
  title: "Advisory, fractional CAIO & CRO | Maadin.AI",
  description:
    "Fractional executive and GTM leadership for companies building at the intersection of AI and natural resources. Two concurrent client slots.",
};

const ROLES: { glyph: "compass" | "growth" | "crystal" | "shield"; k: string; v: string; on?: boolean }[] = [
  { glyph: "compass", k: "01 Enterprise BD", v: "Partnerships and channel development." },
  { glyph: "growth", k: "02 Revenue leadership", v: "Fractional CRO ownership of the number.", on: true },
  { glyph: "crystal", k: "03 Chief AI Officer", v: "Capability, architecture and roadmap." },
  { glyph: "shield", k: "04 Industry principal", v: "Domain authority in front of the client." },
];

export default function AdvisoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Advisory"
        heading={
          <>
            Work with Arshad.
            <br />
            Fractional executive & GTM lead.
          </>
        }
        dek="Hands-on AI strategy, enterprise business development and revenue leadership for companies building at the intersection of AI and natural resources. Two concurrent client slots."
      />

      <section className="sec band">
        <div className="wrap">
          <div id="credibility" style={{ scrollMarginTop: "calc(var(--nav-h) + 40px)" }}>
            <div className="shead" data-rv-group>
              <p className="eyebrow" data-rv>
                <span>Why Arshad</span>
              </p>
              <h2 className="h2" data-rv>
                You are hiring a person, not a tier.
              </h2>
              <p className="lead" data-rv>
                Fifteen years across the full span: writing production ML, and closing enterprise deals with
                the executives who sign for them. Both halves, in the same person.
              </p>
            </div>
            <div data-rv style={{ marginTop: "var(--gap-5)" }}>
              <Figure caption="Fig. 1. Overlapping threads, not a sequence of jobs.">
                <TrackBars />
              </Figure>
            </div>
            <div className="grid g2" data-rv-group style={{ marginTop: "var(--gap-5)" }}>
              {TRACK_THREADS.slice(0, 4).map((t) => (
                <div className="card" data-rv key={t.title}>
                  <p className="chip">{t.tag}</p>
                  <div className="h4">{t.title}</div>
                  <p className="body">{t.body}</p>
                </div>
              ))}
            </div>
            <div className="panel" data-rv style={{ marginTop: "var(--gap-4)" }}>
              <div className="split" style={{ alignItems: "center", gap: "var(--gap-4)" }}>
                <div>
                  <p className="eyebrow">
                    <span>Domain depth</span>
                  </p>
                  <p className="body" style={{ marginTop: "var(--gap-2)" }}>
                    Natural resources is not an adjacent market picked from a slide. Thimar reads Texas RRC
                    filings, BLM claim registries and groundwater district transfers daily. That is the same
                    vocabulary an operator, landman or royalty buyer uses, which is why the sales conversation
                    starts a level deeper than a generalist can reach.
                  </p>
                </div>
                <IllusStrata />
              </div>
            </div>
          </div>

          <div id="roles" style={{ marginTop: "var(--band)", scrollMarginTop: "calc(var(--nav-h) + 40px)" }}>
            <div className="shead" data-rv-group>
              <p className="eyebrow" data-rv>
                <span>Role types</span>
              </p>
              <h2 className="h2" data-rv>
                Four ways the work lands.
              </h2>
            </div>
            <div data-rv style={{ marginTop: "var(--gap-5)" }}>
              <Figure caption="Fig. 2. Four roles from one operator.">
                <FactCards items={ROLES} />
              </Figure>
            </div>
            <div className="grid g2" data-rv-group style={{ marginTop: "var(--gap-5)" }}>
              <div className="card" data-rv>
                <p className="mono">01</p>
                <div className="h4">Enterprise BD & partnerships</div>
                <p className="body">
                  C-suite relationships with operators, majors and royalty companies. Direct outreach and
                  relationship-led closing.
                </p>
              </div>
              <div className="card" data-rv>
                <p className="mono">02</p>
                <div className="h4">Revenue leadership (CRO)</div>
                <p className="body">
                  Quota ownership, team building and forecast accountability, what a full-time CRO delivers,
                  fractionally.
                </p>
              </div>
              <div className="card" data-rv>
                <p className="mono">03</p>
                <div className="h4">Chief AI Officer (CAIO)</div>
                <p className="body">
                  AI strategy, roadmap and architecture leadership, positioning the product to domain-expert
                  buyers.
                </p>
              </div>
              <div className="card" data-rv>
                <p className="mono">04</p>
                <div className="h4">Industry principal</div>
                <p className="body">
                  Technical credibility for sales engineering, RFP responses and product positioning in
                  mining, O&G and carbon.
                </p>
              </div>
            </div>
          </div>

          <div id="models" style={{ marginTop: "var(--band)", scrollMarginTop: "calc(var(--nav-h) + 40px)" }}>
            <div className="shead" data-rv-group>
              <p className="eyebrow" data-rv>
                <span>Engagement models</span>
              </p>
              <h2 className="h2" data-rv>
                Three levels of involvement.
              </h2>
            </div>
            <div data-rv style={{ marginTop: "var(--gap-5)" }}>
              <Figure caption="Fig. 3. Depth of involvement by model.">
                <EngagementDepth />
              </Figure>
            </div>
            <div className="grid g3" data-rv-group style={{ marginTop: "var(--gap-5)" }}>
              <div className="card" data-rv>
                <p className="chip">Directional</p>
                <div className="h3">Strategic advisory retainer</div>
                <p className="body">Executive-level guidance for companies that already have internal teams.</p>
                <p className="mono" style={{ marginTop: "auto" }}>
                  GTM STRATEGY · DEAL REVIEW · EXEC INTRODUCTIONS · DIRECTION
                </p>
              </div>
              <div className="card" data-rv style={{ borderColor: "var(--border-strong)" }}>
                <p className="chip">Embedded · Most requested</p>
                <div className="h3">Fractional CRO / CAIO</div>
                <p className="body">
                  Two to three days a week, embedded. Full revenue or AI leadership, performance-aligned.
                </p>
                <p className="mono" style={{ marginTop: "auto" }}>
                  REVENUE OWNERSHIP · PIPELINE · TEAM · FORECASTING · AI ROADMAP
                </p>
              </div>
              <div className="card" data-rv>
                <p className="chip">Focused</p>
                <div className="h3">GTM sprint, 90 days</div>
                <p className="body">Fixed-scope, deliverable-based execution rather than open-ended advice.</p>
                <p className="mono" style={{ marginTop: "auto" }}>
                  ICP · POSITIONING · SALES PLAYBOOK · OUTREACH · FIRST RELATIONSHIPS
                </p>
              </div>
            </div>
            <p className="body" data-rv style={{ marginTop: "var(--gap-4)" }}>
              <strong className="bright">Two concurrent client slots.</strong>{" "}
              <span className="ph">Slot count unconfirmed. PLACEHOLDERS A5.</span>
            </p>
          </div>
        </div>
      </section>

      <Closer
        heading="Two slots. One conversation."
        ctas={
          <Link className="btn btn--primary" href="/contact">
            Discuss an engagement <i aria-hidden="true">&rarr;</i>
          </Link>
        }
      />
    </>
  );
}
