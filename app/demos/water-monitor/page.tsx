import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/hero";
import { Closer } from "@/components/closer";
import { Figure } from "@/components/figure";
import { FigDemoStrip } from "@/components/diagrams/fig-demo-strip";
import { WATER_ROWS } from "@/lib/content/demos";

export const metadata: Metadata = {
  title: "Texas Water Rights Monitor, demo | Maadin.AI",
  description:
    "A groundwater district tracker covering permit filings, usage trends and acquisition windows across Texas GCDs. Illustrative data.",
};

export default function WaterMonitorDemoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Groundwater intelligence"
        heading="Texas Water Rights Monitor"
        dek="Tracks spot pricing, permit transfers and drawdown across groundwater conservation districts, the fastest-appreciating natural asset class in the American Southwest."
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
              <span>Monitored districts</span>
            </p>
            <h2 className="h2" data-rv>
              Four districts, priced per acre-foot.
            </h2>
          </div>
          <div data-rv style={{ marginTop: "var(--gap-4)", overflowX: "auto" }}>
            <table className="dtable">
              <thead>
                <tr>
                  <th>District</th>
                  <th>Aquifer</th>
                  <th className="num">Price / AF</th>
                  <th className="num">Depletion risk</th>
                  <th className="num">Rating</th>
                </tr>
              </thead>
              <tbody>
                {WATER_ROWS.map((row) => (
                  <tr key={row.district}>
                    <td>{row.district}</td>
                    <td>{row.aquifer}</td>
                    <td className="num">{row.price}</td>
                    <td className="num">{row.risk}</td>
                    <td className="num bright">{row.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div data-rv style={{ marginTop: "var(--gap-5)", maxWidth: 640 }}>
            <Figure caption="Fig. 1. Composite $/AF index, five-year trend.">
              <FigDemoStrip kind="water" />
            </Figure>
          </div>
          <p className="mono" data-rv style={{ marginTop: "var(--gap-3)" }}>
            All district and aquifer names are invented.
          </p>
        </div>
      </section>

      <Closer
        heading="The same engine, three domains."
        ctas={
          <>
            <Link className="btn btn--primary" href="/demos">
              All demos <i aria-hidden="true">&rarr;</i>
            </Link>
            <Link className="btn btn--ghost" href="/platform">
              See the architecture <i aria-hidden="true">&rarr;</i>
            </Link>
          </>
        }
      />
    </>
  );
}
