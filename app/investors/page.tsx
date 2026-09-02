import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/hero";
import { Closer } from "@/components/closer";
import { Figure } from "@/components/figure";
import { ContactForm } from "@/components/contact-form";
import { FigProceeds } from "@/components/diagrams/fig-proceeds";
import { FigRoadmap } from "@/components/diagrams/fig-roadmap";
import { IllusParcelgrid } from "@/components/diagrams/illus-parcelgrid";

export const metadata: Metadata = {
  title: "Investors, thesis, raise and data room | Maadin.AI",
  description:
    "The investment thesis, Phase 1 Seed use of proceeds, current status, and a gated data-room request.",
};

export default function InvestorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Seed round · Phase 1"
        heading="The thesis. The opportunity. The raise."
        dek="An uncrowded vertical, policy-backed demand, and an operator with the AI depth and commercial record to execute."
      />

      <section className="sec band">
        <div className="wrap">
          <div id="thesis" style={{ scrollMarginTop: "calc(var(--nav-h) + 40px)" }}>
            <div className="shead" data-rv-group>
              <p className="eyebrow" data-rv>
                <span>Investment thesis</span>
              </p>
              <h2 className="h2" data-rv>
                Four structural advantages.
              </h2>
            </div>
            <div className="grid g2" data-rv-group style={{ marginTop: "var(--gap-5)" }}>
              <div className="card" data-rv>
                <p className="mono">01</p>
                <div className="h3">Why now</div>
                <p className="body">
                  Policy-backed demand meets an underpenetrated AI vertical. The US Inflation Reduction Act
                  and EU Critical Raw Materials Act tie capital and statutory deadlines to domestic mineral
                  supply.
                </p>
                <p className="mono" style={{ marginTop: "auto" }}>
                  US IRA · EU CRMA
                </p>
              </div>
              <div className="card" data-rv>
                <p className="mono">02</p>
                <div className="h3">Why Maadin.AI</div>
                <p className="body">
                  Fifteen years of AI/ML execution plus enterprise commercial relationships, combined with
                  natural-resource domain positioning that generalist AI teams do not have.
                </p>
                <p className="mono" style={{ marginTop: "auto" }}>
                  EXECUTION · RELATIONSHIPS · DOMAIN
                </p>
              </div>
              <div className="card" data-rv>
                <p className="mono">03</p>
                <div className="h3">The moat</div>
                <p className="body">
                  Proprietary pipelines and models trained on natural-resource signals. The registries are
                  public; the normalisation, scoring and monitoring built on top of them are not.
                </p>
                <p className="mono" style={{ marginTop: "auto" }}>
                  USGS · BLM · TEXAS RRC
                </p>
              </div>
              <div className="card" data-rv>
                <p className="mono">04</p>
                <div className="h3">The model</div>
                <p className="body">
                  Asset compounding, platform SaaS revenue and non-dilutive grant funding, three
                  value-creation levers running in parallel rather than a single software bet.
                </p>
                <p className="mono" style={{ marginTop: "auto" }}>
                  DOE · ARPA-E · SBIR
                </p>
              </div>
            </div>
            <p className="body" data-rv style={{ marginTop: "var(--gap-4)", maxWidth: "60ch" }}>
              <span className="ph">The &ldquo;uncrowded vertical&rdquo; claim is asserted, not yet evidenced. PLACEHOLDERS B3.</span>
            </p>
          </div>

          <div id="raise" style={{ marginTop: "var(--band)", scrollMarginTop: "calc(var(--nav-h) + 40px)" }}>
            <div className="shead" data-rv-group>
              <p className="eyebrow" data-rv>
                <span>Current raise</span>
              </p>
              <h2 className="h2" data-rv>
                Phase 1 Seed.
              </h2>
              <p className="lead" data-rv>
                Capital is structured for direct deployment into platform scale and the first
                revenue-yielding asset position.
              </p>
            </div>
            <div data-rv style={{ marginTop: "var(--gap-5)" }}>
              <Figure caption="Fig. 2. Use of proceeds, single allocation.">
                <FigProceeds />
              </Figure>
            </div>
            <p className="body" data-rv style={{ marginTop: "var(--gap-3)" }}>
              <span className="ph">Target raise amount withheld. PLACEHOLDERS B4. Percentages are of an undisclosed total.</span>
            </p>
          </div>

          <div id="status" style={{ marginTop: "var(--band)", scrollMarginTop: "calc(var(--nav-h) + 40px)" }}>
            <div className="shead" data-rv-group>
              <p className="eyebrow" data-rv>
                <span>Status</span>
              </p>
              <h2 className="h2" data-rv>
                No asset has been acquired to date.
              </h2>
              <p className="lead" data-rv>
                Stated plainly, because it is the first thing a diligent reader will want to establish. The
                platform is built and the prototypes run; the portfolio does not exist yet.
              </p>
            </div>
            <div className="split" style={{ marginTop: "var(--gap-5)", alignItems: "center" }}>
              <div data-rv>
                <Figure caption="Fig. 3. Phase 02 is current.">
                  <FigRoadmap />
                </Figure>
              </div>
              <IllusParcelgrid />
            </div>
            <p className="body" data-rv style={{ marginTop: "var(--gap-3)" }}>
              <span className="ph">Phase status unconfirmed. PLACEHOLDERS B5.</span>
            </p>
          </div>

          <div id="dataroom" style={{ marginTop: "var(--band)", scrollMarginTop: "calc(var(--nav-h) + 40px)" }}>
            <div className="shead" data-rv-group>
              <p className="eyebrow" data-rv>
                Confidential access
              </p>
              <h2 className="h2" data-rv>
                Request the seed data room.
              </h2>
              <p className="lead" data-rv>
                Investor materials are available under NDA.
              </p>
            </div>
            <ContactForm variant="dataroom" />
          </div>
        </div>
      </section>

      <Closer
        heading="Read the platform first, if you prefer."
        ctas={
          <>
            <Link className="btn btn--primary" href="/platform">
              Platform architecture <i aria-hidden="true">&rarr;</i>
            </Link>
            <Link className="btn btn--ghost" href="/demos">
              Open the demos <i aria-hidden="true">&rarr;</i>
            </Link>
          </>
        }
      />
    </>
  );
}
