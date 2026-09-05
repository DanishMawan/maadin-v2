import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/hero";
import { Closer } from "@/components/closer";
import { Figure } from "@/components/figure";
import { FigDemoStrip } from "@/components/diagrams/fig-demo-strip";

export const metadata: Metadata = {
  title: "AI Regulatory Filing Agent, demo | Maadin.AI",
  description:
    "An agentic workflow assembling Texas RRC Form W-1 drilling permits with auditable spacing and density validation. Illustrative data.",
};

export default function FilingAgentDemoPage() {
  return (
    <>
      <PageHeader
        eyebrow="O&G regulatory automation"
        heading="AI Regulatory Filing Agent"
        dek="An autonomous compliance workflow that assembles Texas Railroad Commission Form W-1 drilling permits, spacing validation, density checks and packet assembly, with every step auditable."
      />

      <section className="sec band" style={{ paddingBlock: "var(--gap-5)" }}>
        <div className="wrap">
          <p className="illus" data-rv>
            Illustrative data. Not a real asset.
          </p>
        </div>
      </section>

      <section className="sec band">
        <div className="wrap">
          <div className="split">
            <div className="head" data-rv-group>
              <p className="eyebrow" data-rv>
                <span>Run log</span>
              </p>
              <h2 className="h2" data-rv>
                Six steps, each one checkable.
              </h2>
              <p className="lead" data-rv>
                The agent does not guess spacing rules. It executes geometric checks against shapefiles and
                depth databases, then assembles the filing packet.
              </p>
              <div data-rv style={{ marginTop: "var(--gap-4)" }}>
                <Figure caption="Fig. 1. Raw information to filed packet.">
                  <FigDemoStrip kind="filing" />
                </Figure>
              </div>
            </div>
            <div data-rv>
              <div className="codeblock">
                <pre>
                  <span className="k">$</span> <span className="v">rrc_agent_runner</span> --operator ORD-4471
                  --district 08{"\n\n"}
                  <span className="k">[0.1s]</span> Initialising RRC agentic pipeline…{"\n"}
                  <span className="k">[0.4s]</span> Querying groundwater depth limits{"\n"}
                  {"        "}fresh water base at <span className="v">1,650 ft</span>
                  {"\n"}
                  <span className="k">[0.8s]</span> Rule 37 spacing vs neighbouring lease lines{"\n"}
                  {"        "}distance = <span className="v">467 ft</span> (compliant)
                  {"\n"}
                  <span className="k">[1.1s]</span> Rule 38 density standard{"\n"}
                  {"        "}
                  <span className="v">640-acre</span> unit confirmed
                  {"\n"}
                  <span className="k">[1.5s]</span> Compiling Form W-1 payload + plat layer{"\n"}
                  <span className="k">[1.8s]</span> <span className="v">COMPLETE</span>, packet ready for
                  review
                </pre>
              </div>
              <div className="panel" style={{ marginTop: "var(--gap-3)" }}>
                <p className="eyebrow">
                  <span>Form W-1 · assembled</span>
                </p>
                <table className="dtable" style={{ marginTop: "var(--gap-3)" }}>
                  <tbody>
                    <tr>
                      <td>Operator</td>
                      <td className="num bright">Ordway Resources LLC</td>
                    </tr>
                    <tr>
                      <td>District & county</td>
                      <td className="num bright">08 · Menark</td>
                    </tr>
                    <tr>
                      <td>Lease / well no.</td>
                      <td className="num bright">Dorvale Unit #14H</td>
                    </tr>
                    <tr>
                      <td>Surface casing depth</td>
                      <td className="num bright">1,650 ft</td>
                    </tr>
                    <tr>
                      <td>Rule 37 distance</td>
                      <td className="num bright">467 ft</td>
                    </tr>
                    <tr>
                      <td>Rule 38 acreage unit</td>
                      <td className="num bright">640.00 acres</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mono" style={{ marginTop: "var(--gap-3)" }}>
                  Operator and lease names are invented. Rule 37/38 and Form W-1 are genuine public regulatory
                  references.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Closer
        heading="See the same engine on minerals."
        ctas={
          <>
            <Link className="btn btn--primary" href="/demos/mineral-rights">
              Mineral demo <i aria-hidden="true">&rarr;</i>
            </Link>
            <Link className="btn btn--ghost" href="/demos/water-monitor">
              Water demo <i aria-hidden="true">&rarr;</i>
            </Link>
          </>
        }
      />
    </>
  );
}
