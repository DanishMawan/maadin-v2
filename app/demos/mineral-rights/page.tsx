import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/hero";
import { Closer } from "@/components/closer";
import { Figure } from "@/components/figure";
import { TableCard } from "@/components/table-card";
import { FigPipeline } from "@/components/diagrams/fig-pipeline";
import { MINERAL_ROWS } from "@/lib/content/demos";

export const metadata: Metadata = {
  title: "Mineral Rights Intelligence, demo | Maadin.AI",
  description:
    "A live prototype scoring and valuing mineral rights across public claim registries and county deed records. Illustrative data.",
};

export default function MineralRightsDemoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Live technology prototype"
        heading="Mineral Rights Intelligence Engine"
        dek="Cross-references geochemical anomalies, federal claim registries and county deed valuations to surface mispriced mineral tracts."
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
          <div className="shead" data-rv-group>
            <p className="eyebrow" data-rv>
              <span>Scored opportunities</span>
            </p>
            <h2 className="h2" data-rv>
              Five tracts, ranked by model score.
            </h2>
          </div>
          <div data-rv style={{ marginTop: "var(--gap-4)" }}>
            <TableCard>
              <table className="dtable">
                <thead>
                  <tr>
                    <th>Parcel</th>
                    <th>Commodity</th>
                    <th>Location</th>
                    <th className="num">Size</th>
                    <th className="num">AI valuation</th>
                    <th className="num">Projected alpha</th>
                    <th className="num">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {MINERAL_ROWS.map((row) => (
                    <tr key={row.parcel}>
                      <td>{row.parcel}</td>
                      <td>{row.commodity}</td>
                      <td>{row.loc}</td>
                      <td className="num">{row.size}</td>
                      <td className="num">{row.valuation}</td>
                      <td className="num">{row.alpha}</td>
                      <td className="num bright">{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableCard>
          </div>
          <p className="mono" data-rv style={{ marginTop: "var(--gap-3)" }}>
            All identifiers and place names are invented.
          </p>
        </div>
      </section>

      <section className="sec band band--tint">
        <div className="wrap">
          <div className="split">
            <div className="head" data-rv-group>
              <p className="eyebrow" data-rv>
                <span>Top prospect</span>
              </p>
              <h2 className="h2" data-rv>
                VN-TR-4417
              </h2>
              <p className="lead" data-rv>
                Vantrel Basin · Corran County. Highest composite score in the current sweep.
              </p>
              <div data-rv style={{ marginTop: "var(--gap-4)" }}>
                <Figure caption="Fig. 1. Scoring path for a single parcel.">
                  <FigPipeline />
                </Figure>
              </div>
            </div>
            <div className="grid" data-rv-group style={{ gap: "var(--gap-3)" }}>
              <div className="panel" data-rv>
                <p className="eyebrow">
                  <span>Decomposition</span>
                </p>
                <table className="dtable" style={{ marginTop: "var(--gap-3)" }}>
                  <tbody>
                    <tr>
                      <td>Geochem radiometric anomaly</td>
                      <td className="num bright">96%</td>
                    </tr>
                    <tr>
                      <td>Unencumbered title ratio</td>
                      <td className="num bright">92%</td>
                    </tr>
                    <tr>
                      <td>Infrastructure & water access</td>
                      <td className="num bright">88%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="panel" data-rv>
                <p className="eyebrow">
                  <span>Valuation model</span>
                </p>
                <table className="dtable" style={{ marginTop: "var(--gap-3)" }}>
                  <tbody>
                    <tr>
                      <td>Assessor baseline</td>
                      <td className="num bright">$2,580 / acre</td>
                    </tr>
                    <tr>
                      <td>Model fair value</td>
                      <td className="num bright">$4,200 / acre</td>
                    </tr>
                    <tr>
                      <td>Gross tract</td>
                      <td className="num bright">640 net mineral acres</td>
                    </tr>
                    <tr>
                      <td>Estimated tract alpha</td>
                      <td className="num bright">+$1.03M (+62.8%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Closer
        heading="How the score is computed."
        ctas={
          <>
            <Link className="btn btn--primary" href="/contact">
              Request the methodology <i aria-hidden="true">&rarr;</i>
            </Link>
            <Link className="btn btn--ghost" href="/demos/filing-agent">
              Next demo <i aria-hidden="true">&rarr;</i>
            </Link>
          </>
        }
      />
    </>
  );
}
