import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/hero";
import { Section } from "@/components/section";
import { Closer } from "@/components/closer";
import { Figure } from "@/components/figure";
import { FactCards, type FactCardItem } from "@/components/fact-cards";
import { FigFounder } from "@/components/diagrams/fig-founder";

export const metadata: Metadata = {
  title: "About, company and founder | Maadin.AI",
  description:
    "Maadin.AI is a venture builder and an executive practice. Founder Arshad Khan, fifteen years in AI, now applied to natural resources.",
};

const WHY: FactCardItem[] = [
  { glyph: "doc", k: "Data-rich", v: "Petabytes of public record", note: "Registries, filings, assays" },
  { glyph: "seismic", k: "High complexity", v: "Legal + geological + regulatory", note: "Three literacies at once" },
  { glyph: "basin", k: "Untouched", v: "No AI-native competitor", note: "An uncrowded vertical" },
  { glyph: "shield", k: "Policy-backed", v: "IRA & EU CRMA", note: "Statutory demand", on: true },
];

const EXPERTISE: FactCardItem[] = [
  {
    glyph: "crystal",
    on: true,
    k: "AI & technology",
    v: null,
    list: ["AI / ML strategy", "Deep learning & NLP", "Generative AI & LLMs", "Agentic systems"],
  },
  {
    glyph: "growth",
    k: "Enterprise & commercial",
    v: null,
    list: ["Enterprise architecture", "Revenue leadership", "Go-to-market"],
  },
  {
    glyph: "basin",
    k: "Natural resources",
    v: null,
    list: ["Natural resources AI", "Geospatial & regulatory data"],
  },
  {
    glyph: "compass",
    k: "Leadership & venture",
    v: null,
    list: ["Startup to scale", "Board & investor relations", "Fractional CxO"],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        heading={
          <>
            Two engines.
            <br />
            One compounding mission.
          </>
        }
        dek="Maadin.AI is both a venture builder and an executive practice, deploying AI to acquire natural assets, while helping industry leaders build their own AI capability."
      />

      <section className="sec band band--tint" id="founder" aria-labelledby="founder-h">
        <div className="wrap">
          <div className="split">
            <div className="head" data-rv-group>
              <p className="eyebrow" data-rv>
                <span>Founder</span>
              </p>
              <h2 className="h2" id="founder-h" data-rv>
                Arshad Khan
              </h2>
              <p className="mono" data-rv>
                FOUNDER & PRINCIPAL · MAADIN.AI
              </p>
              <p className="lead" data-rv style={{ marginTop: "var(--gap-3)" }}>
                A rare mix: technical enough to architect the system, commercial enough to close the
                enterprise deal. Fifteen years at that intersection, now pointed at the physical world.
              </p>
              <div data-rv style={{ marginTop: "var(--gap-4)" }}>
                <Figure caption="Fig. 2. Fifteen years of AI, redirected at the subsurface.">
                  <FigFounder />
                </Figure>
              </div>
            </div>
            <div>
              <div className="statband" data-rv-group>
                <div data-rv>
                  <div className="stat">
                    <span className="ph" data-count>
                      15
                    </span>
                    +
                  </div>
                  <div className="mono">YEARS AI / ML</div>
                </div>
                <div data-rv>
                  <div className="stat">
                    <span className="ph" data-count>
                      3
                    </span>
                  </div>
                  <div className="mono">COMPANIES FOUNDED</div>
                </div>
                <div data-rv>
                  <div className="stat" data-count>
                    2
                  </div>
                  <div className="mono">PUBLISHED BOOKS</div>
                </div>
              </div>
              <div className="panel" data-rv style={{ marginTop: "var(--gap-4)" }}>
                <p className="eyebrow">
                  <span>Detail</span>
                </p>
                <table className="dtable" style={{ marginTop: "var(--gap-3)" }}>
                  <tbody>
                    <tr>
                      <td>Location</td>
                      <td className="num bright">United States · Global advisory</td>
                    </tr>
                    <tr>
                      <td>Focus</td>
                      <td className="num bright">AI × natural resources</td>
                    </tr>
                    <tr>
                      <td>Member</td>
                      <td className="num bright">
                        <span className="ph">SPE, unverified</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="mono" style={{ marginTop: "var(--gap-3)" }}>
                  <span className="ph">
                    Education is omitted deliberately, the two existing sites give conflicting claims and
                    nothing is invented here. PLACEHOLDERS A1.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="why"
        ground="band"
        eyebrow="Why natural resources"
        heading="A deliberate bet on an untouched domain."
        body="After fifteen years in AI, the choice was to go where AI fluency is rare and the asymmetry is largest."
      >
        <div className="grid g2" data-rv-group style={{ marginTop: "var(--gap-5)" }}>
          <div data-rv>
            <p className="body" style={{ fontSize: "var(--lead)", lineHeight: "var(--lead-lh)" }}>
              Critical minerals, oil & gas, water and carbon are data-rich, high-complexity and largely
              untouched by AI-native competitors. The registries are public and enormous; almost nobody has
              read them at scale.
            </p>
          </div>
          <div data-rv>
            <p className="body" style={{ fontSize: "var(--lead)", lineHeight: "var(--lead-lh)" }}>
              The US Inflation Reduction Act and the EU Critical Raw Materials Act now back that bet with
              policy-driven demand and statutory deadlines. Maadin.AI sits at the intersection of that demand
              and a fifteen-year AI foundation.
            </p>
          </div>
        </div>
        <div data-rv style={{ marginTop: "var(--gap-5)" }}>
          <Figure caption="Fig. 4. Four conditions, one asymmetry.">
            <FactCards items={WHY} />
          </Figure>
        </div>
      </Section>

      <Section
        id="expertise"
        ground="band band--tint"
        eyebrow="Core expertise"
        heading="Four groups, one operator."
      >
        <div data-rv style={{ marginTop: "var(--gap-5)" }}>
          <Figure caption="Fig. 3. Core expertise groups.">
            <FactCards items={EXPERTISE} />
          </Figure>
        </div>
      </Section>

      <Closer
        heading="Talk to the founder directly."
        ctas={
          <>
            <Link className="btn btn--primary" href="/contact">
              Get in touch <i aria-hidden="true">&rarr;</i>
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
