import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Section, SectionSplit } from "@/components/section";
import { Closer } from "@/components/closer";
import { Figure } from "@/components/figure";
import { FactCards } from "@/components/fact-cards";
import { CycleCards } from "@/components/cycle-cards";
import { ContactForm } from "@/components/contact-form";
import { ContactRoutes } from "@/components/contact-routes";
import { TableCard } from "@/components/table-card";
import { FigPipeline } from "@/components/diagrams/fig-pipeline";
import { FigAssets } from "@/components/diagrams/fig-assets";
import { FigFlywheel } from "@/components/diagrams/fig-flywheel";
import { FigRoadmap } from "@/components/diagrams/fig-roadmap";
import { FigTwoEngines } from "@/components/diagrams/fig-two-engines";
import { FigFounder } from "@/components/diagrams/fig-founder";
import { FigProceeds } from "@/components/diagrams/fig-proceeds";
import { FigDemoStrip } from "@/components/diagrams/fig-demo-strip";
import { ARTICLES } from "@/lib/content/articles";

export const metadata: Metadata = {
  title: "Maadin.AI, Natural resource intelligence",
  description:
    "Public data in. Undervalued mineral, energy, water and carbon assets out. Found, valued, and compounded by AI.",
};

const HOME_DEMOS: { slug: string; title: string; blurb: string; metric: string; kind: "mineral" | "filing" | "water" }[] = [
  {
    slug: "mineral-rights",
    title: "Mineral Rights Intelligence",
    blurb: "Discovery, scoring and valuation across claim registries and county deed records.",
    metric: "5 BASINS SCORED · AI SCORE 83–96",
    kind: "mineral",
  },
  {
    slug: "filing-agent",
    title: "AI Regulatory Filing Agent",
    blurb: "Agentic AI preparing Texas RRC W-1 well permits end to end.",
    metric: "6 AUTOMATED STEPS · 100% VALIDATED",
    kind: "filing",
  },
  {
    slug: "water-monitor",
    title: "Texas Water Rights Monitor",
    blurb: "Groundwater district tracking: permits, usage trends, acquisition windows.",
    metric: "4 DISTRICTS TRACKED · +15.4% 5-YR CAGR",
    kind: "water",
  },
];

const SECTORS: { glyph: "shield" | "drill" | "parcel" | "globe"; k: string; v: string; on?: boolean }[] = [
  { glyph: "shield", k: "Defence / federal", v: "Mission systems and federal programme delivery.", on: true },
  { glyph: "drill", k: "Fortune 50 industrial", v: "Heavy industry and large-scale operations." },
  { glyph: "parcel", k: "Enterprise data platform", v: "Platform architecture and data infrastructure." },
  { glyph: "globe", k: "Education", v: "Teaching, curriculum and technical authorship." },
];

const THESIS: { glyph: "compass" | "core" | "crystal" | "growth"; k: string; v: string; note?: string; on?: boolean }[] = [
  { glyph: "compass", k: "01 Why now", v: "Policy-backed demand", note: "IRA & EU CRMA" },
  { glyph: "core", k: "02 Why Maadin.AI", v: "Fifteen years of execution", note: "AI × enterprise" },
  { glyph: "crystal", k: "03 The moat", v: "Proprietary pipelines", note: "Normalised public record" },
  { glyph: "growth", k: "04 The model", v: "Assets + SaaS + grants", note: "Three revenue lines", on: true },
];

const INSIGHTS_CARDS: { glyph: "crystal" | "core" | "drill" | "globe"; k: string; v: string; note?: string; on?: boolean }[] = [
  { glyph: "crystal", k: "Market thesis", v: "Critical minerals", note: "Why the convergence matters", on: true },
  { glyph: "core", k: "Founder journal", v: "Building in public", note: "Thesis to platform" },
  { glyph: "drill", k: "Technical depth", v: "O&G automation", note: "What operators get wrong" },
  { glyph: "globe", k: "Policy", v: "Carbon markets", note: "Credits as a data problem" },
];

function HeroVisual() {
  return (
    <div className="hero-visual" data-rv>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--gap-3)", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--gap-2)" }}>
          <span className="ichip" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2.5 21 12l-9 9.5L3 12Z" stroke="#A9E27C" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M7 12h10" stroke="#A9E27C" strokeWidth="1.2" opacity=".7" />
            </svg>
          </span>
          <div>
            <p className="h4">Thimar, scored positions</p>
            <p className="mono" style={{ marginTop: 2 }}>
              Illustrative data. Not a real asset.
            </p>
          </div>
        </div>
        <span className="chip">5 basins scored</span>
      </div>
      <div style={{ marginTop: "var(--gap-4)" }}>
        <TableCard>
        <table className="dtable">
          <thead>
            <tr>
              <th>Parcel</th>
              <th>Basin</th>
              <th className="num">AI valuation</th>
              <th className="num">Alpha</th>
              <th className="num">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>VN-TR-4417</td>
              <td>Vantrel Basin</td>
              <td className="num">$4,200</td>
              <td className="num">+$1.03M</td>
              <td className="num">
                <b>94</b>
              </td>
            </tr>
            <tr>
              <td>QD-LM-3044</td>
              <td>Lomaris Flat</td>
              <td className="num">$8,900</td>
              <td className="num">+$5.24M</td>
              <td className="num">
                <b>96</b>
              </td>
            </tr>
            <tr>
              <td>HR-BK-4102</td>
              <td>Brakewell Rise</td>
              <td className="num">$2,850</td>
              <td className="num">+$864k</td>
              <td className="num">
                <b>89</b>
              </td>
            </tr>
          </tbody>
        </table>
        </TableCard>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="AI × Natural Resources"
        heading={
          <>
            Earth&rsquo;s treasure.
            <br />
            AI is the finder.
          </>
        }
        dek="Public data in. Undervalued mineral, energy, water & carbon assets out. Found, valued, and compounded by AI."
        headingClassName="display"
        visual={<HeroVisual />}
        ctas={
          <>
            <Link className="btn btn--primary" href="/investors">
              Invest in Maadin.AI <i aria-hidden="true">&rarr;</i>
            </Link>
            <Link className="btn btn--ghost" href="/advisory">
              Partner with me <i aria-hidden="true">&rarr;</i>
            </Link>
          </>
        }
      />

      <section className="sec band" id="metrics" aria-labelledby="metrics-h">
        <div className="wrap">
          <div className="shead" data-rv-group style={{ marginBottom: "var(--gap-5)" }}>
            <p className="eyebrow" data-rv>
              <span>By the numbers</span>
            </p>
            <h2 className="h2" id="metrics-h" data-rv>
              Fifteen years, four asset classes, one target.
            </h2>
            <p className="lead" data-rv>
              The record behind the platform, and the number it is being built toward.
            </p>
          </div>
          <div className="statcard" data-rv-group>
            <div data-rv>
              <div className="stat">
                <span className="ph" data-count>
                  15
                </span>
                + yrs
              </div>
              <div className="mono">AI / ML</div>
            </div>
            <div data-rv>
              <div className="stat">
                <span className="ph" data-count>
                  3
                </span>
              </div>
              <div className="mono">Companies founded</div>
            </div>
            <div data-rv>
              <div className="stat" data-count>
                4
              </div>
              <div className="mono">Asset classes</div>
            </div>
            <div data-rv>
              <div className="stat">$1B</div>
              <div className="mono">Goal by 2030</div>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="pipeline"
        ground="band band--tint"
        eyebrow="How it works"
        heading="Public record in. Priced assets out."
        body="Thimar reads the same public registries everyone can access, and prices what the market has not."
      >
        <div data-rv style={{ marginTop: "var(--gap-5)" }}>
          <Figure caption="Fig. 1. Thimar ingestion pipeline, public record to compounding position.">
            <FigPipeline />
          </Figure>
        </div>
        <div className="tlink--end" data-rv>
          <Link className="tlink" href="/platform">
            See the full architecture
          </Link>
        </div>
      </Section>

      <SectionSplit
        id="engines"
        ground="band"
        eyebrow="What Maadin.AI is"
        heading={
          <>
            Two engines.
            <br />
            One compounding mission.
          </>
        }
        body="A venture that acquires natural assets with AI, and an executive practice that helps industry leaders build their own AI capability."
        aside={
          <div className="panel--dark">
            <Figure caption="Fig. 2. Venture and practice, one mission.">
              <FigTwoEngines />
            </Figure>
          </div>
        }
      >
        <div style={{ marginTop: "var(--gap-5)" }}>
          <div className="grid g2" data-rv-group style={{ gap: "var(--gap-3)" }}>
            <div className="panel" data-rv>
              <p className="eyebrow">
                <span>The Platform · Venture</span>
              </p>
              <p className="h3" style={{ marginTop: "var(--gap-2)" }}>
                Thimar
              </p>
              <p className="body" style={{ marginTop: "var(--gap-2)" }}>
                Acquires and compounds critical mineral rights, O&G royalties and water assets, powered by a
                proprietary AI stack.
              </p>
              <p style={{ marginTop: "var(--gap-3)" }}>
                <Link className="tlink" href="/platform">
                  Explore the platform
                </Link>
              </p>
            </div>
            <div className="panel" data-rv>
              <p className="eyebrow">
                <span>The Practice · Advisory</span>
              </p>
              <p className="h3" style={{ marginTop: "var(--gap-2)" }}>
                Fractional CAIO / CRO
              </p>
              <p className="body" style={{ marginTop: "var(--gap-2)" }}>
                Arshad Khan embeds as a fractional AI or revenue executive, bridging AI architecture with
                enterprise commercial execution.
              </p>
              <p style={{ marginTop: "var(--gap-3)" }}>
                <Link className="tlink" href="/advisory">
                  View engagements
                </Link>
              </p>
            </div>
          </div>
        </div>
      </SectionSplit>

      <Section
        id="founder"
        ground="band"
        eyebrow="The founder"
        heading={
          <>
            15 years in AI.
            <br />
            Built for the physical world.
          </>
        }
        body="A rare mix: technical enough to architect the system, commercial enough to close enterprise deals. Now applied to the hardest problems in the physical world."
      >
        <div data-rv style={{ marginTop: "var(--gap-5)" }}>
          <Figure caption="Fig. 3. Fifteen years of AI, redirected at the subsurface.">
            <FigFounder />
          </Figure>
        </div>
        <div className="tlink--end" data-rv>
          <Link className="tlink" href="/about">
            Read the full story
          </Link>
        </div>
      </Section>

      <Section
        id="assets"
        ground="band band--tint"
        eyebrow="What the engine covers"
        heading="Four asset classes. One engine."
        body="Each class is scored by the same pipeline, with models specialised to its data."
      >
        <div data-rv style={{ marginTop: "var(--gap-5)" }}>
          <Figure caption="Fig. 4. Public sources fan into one engine, out to four asset classes.">
            <FigAssets />
          </Figure>
        </div>
      </Section>

      <Section
        id="flywheel"
        ground="band band--tint"
        eyebrow="The model"
        heading="Royalties fund the next position."
        body="Cash generated by acquired rights is reinvested. Platform subscriptions run alongside, so portfolio and software compound together."
      >
        <div className="split split--even" style={{ marginTop: "var(--gap-5)" }}>
          <div data-rv>
            <Figure caption="Fig. 5. The compounding cycle.">
              <FigFlywheel />
            </Figure>
          </div>
          <div className="grid" data-rv-group>
            <CycleCards />
          </div>
        </div>
      </Section>

      <Section
        id="roadmap"
        ground="band"
        eyebrow="Roadmap"
        heading="Where the company actually is."
        body={<span className="ph">Phase status is unconfirmed. PLACEHOLDERS B5. No asset has been acquired to date.</span>}
      >
        <div className="split split--lead" style={{ marginTop: "var(--gap-5)" }}>
          <div data-rv>
            <Figure caption="Fig. 6. Four phases, read top down. Phase 02 is current.">
              <FigRoadmap />
            </Figure>
          </div>
          <div className="panel" data-rv>
            <p className="eyebrow">
              <span>Status today</span>
            </p>
            <div className="ctacard__row">
              <b>Entity & platform</b>
              <span>Complete</span>
            </div>
            <div className="ctacard__row">
              <b>Working prototypes</b>
              <span>3 live</span>
            </div>
            <div className="ctacard__row">
              <b>Assets acquired</b>
              <span>None to date</span>
            </div>
            <div className="ctacard__row">
              <b>Current phase</b>
              <span>02 · In progress</span>
            </div>
            <p className="body" style={{ marginTop: "var(--gap-3)" }}>
              The platform is built and the prototypes run. The portfolio does not exist yet, and the roadmap
              says so rather than implying otherwise.
            </p>
            <div style={{ marginTop: "var(--gap-3)" }}>
              <Link className="tlink" href="/investors">
                Read the thesis
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="demos"
        ground="band"
        eyebrow="Proof of capability"
        heading="Three working systems. Not slides."
        body="Built on public data. Together they demonstrate the full path: discover, validate, monitor."
      >
        <div className="grid g3" data-rv-group style={{ marginTop: "var(--gap-5)" }}>
          {HOME_DEMOS.map((d) => (
            <Link className="card" href={`/demos/${d.slug}`} data-rv key={d.slug}>
              <FigDemoStrip kind={d.kind} />
              <div>
                <div className="h4">{d.title}</div>
                <p className="body" style={{ marginTop: 8 }}>
                  {d.blurb}
                </p>
              </div>
              <p className="mono bright" style={{ marginTop: "auto" }}>
                {d.metric}
              </p>
            </Link>
          ))}
        </div>
        <div className="tlink--end" data-rv>
          <Link className="tlink" href="/demos">
            Open the demos
          </Link>
        </div>
      </Section>

      <Section
        id="work"
        ground="band band--tint"
        eyebrow="Delivered for"
        heading="Built where a wrong answer has consequences."
        body="Fifteen years of shipping AI inside organisations that audit it."
      >
        <div data-rv style={{ marginTop: "var(--gap-5)" }}>
          <Figure caption="Fig. 6. Four delivery sectors on one track.">
            <FactCards items={SECTORS} />
          </Figure>
        </div>
        <div className="shead" data-rv style={{ marginTop: "var(--gap-4)" }}>
          <p className="mono">
            <span className="ph">Client names withheld pending permission. PLACEHOLDERS D7.</span>
          </p>
          <div className="tlink--end">
            <Link className="tlink" href="/work">
              See the work
            </Link>
          </div>
        </div>
      </Section>

      <Section
        id="investors"
        ground="band band--tint"
        eyebrow="Investors"
        heading="The thesis. The opportunity. The raise."
        body="An uncrowded vertical, policy-backed demand, and an operator with AI depth and a business-development record."
      >
        <div style={{ marginTop: "var(--gap-5)" }} data-rv>
          <Figure caption="Fig. 7. Four blocks of the investment case.">
            <FactCards items={THESIS} />
          </Figure>
        </div>
        <div style={{ marginTop: "var(--gap-5)" }} data-rv>
          <Figure caption="Fig. 8. Phase 1 Seed, use of proceeds.">
            <FigProceeds />
          </Figure>
        </div>
        <div data-rv style={{ marginTop: "var(--gap-4)" }}>
          <Link className="btn btn--primary" href="/investors">
            Request Seed Data Room (NDA) <i aria-hidden="true">&rarr;</i>
          </Link>
        </div>
      </Section>

      <Section
        id="insights"
        ground="band"
        eyebrow="Thinking in public"
        heading="Market theses, in the open."
        body="Four threads, one argument: the public record is mispriced and AI is what reads it."
      >
        <div data-rv style={{ marginTop: "var(--gap-5)" }}>
          <Figure caption="Fig. 9. Four threads, one thesis.">
            <FactCards items={INSIGHTS_CARDS} />
          </Figure>
        </div>
        <div className="grid g4" data-rv-group style={{ marginTop: "var(--gap-5)" }}>
          {ARTICLES.map((a) => (
            <Link className="card" href={`/insights/${a.slug}`} data-rv key={a.slug}>
              <span className="chip">{a.category}</span>
              <div className="h3">{a.title}</div>
              <p className="mono" style={{ marginTop: "auto" }}>
                {a.meta}
              </p>
            </Link>
          ))}
        </div>
        <div className="tlink--end" data-rv>
          <Link className="tlink" href="/insights">
            All insights
          </Link>
        </div>
      </Section>

      <section className="sec band band--tint" id="contact" aria-labelledby="contact-h" style={{ overflow: "hidden" }}>
        <div className="wrap">
          <div className="shead" data-rv-group>
            <p className="eyebrow" data-rv>
              <span>Contact</span>
            </p>
            <h2 className="h2" id="contact-h" data-rv>
              Let&rsquo;s talk.
            </h2>
            <p className="lead" data-rv>
              Investor, consulting client, or founder in natural-resource AI, it reaches Arshad directly.
            </p>
          </div>
          <div className="split" style={{ marginTop: "var(--gap-5)", alignItems: "start" }}>
            <div data-rv>
              <Figure caption="Fig. 9. Three routes, one inbox.">
                <ContactRoutes />
              </Figure>
            </div>
            <div data-rv>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Closer
        heading="Two ways in."
        ctas={
          <>
            <Link className="btn btn--primary" href="/investors">
              Request the data room <i aria-hidden="true">&rarr;</i>
            </Link>
            <Link className="btn btn--ghost" href="/advisory">
              Work with Arshad <i aria-hidden="true">&rarr;</i>
            </Link>
          </>
        }
      />
    </>
  );
}
