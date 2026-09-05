import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/hero";
import { Section } from "@/components/section";
import { Closer } from "@/components/closer";
import { Figure } from "@/components/figure";
import { TableCard } from "@/components/table-card";
import { AccordionRows } from "@/components/accordion-rows";
import { CycleCards } from "@/components/cycle-cards";
import { FigArchitecture } from "@/components/diagrams/fig-architecture";
import { FigAssets } from "@/components/diagrams/fig-assets";
import { FigFlywheel } from "@/components/diagrams/fig-flywheel";

export const metadata: Metadata = {
  title: "Thimar Intelligence Platform, architecture | Maadin.AI",
  description:
    "The three-layer intelligence stack: automated ingestion, multi-modal scoring, and continuous monitoring across USGS, BLM, Texas RRC and TWDB.",
};

const ASSET_ROWS = [
  {
    title: "Critical minerals",
    body: "AI-driven mineral rights acquisition across lithium, cobalt and rare earths, aligned with US Inflation Reduction Act and EU Critical Raw Materials Act tailwinds.",
  },
  {
    title: "Oil & gas royalties",
    body: "Permian Basin and Eagle Ford royalty streams identified through well-performance modelling on Texas RRC public data.",
  },
  {
    title: "Water rights",
    body: "Texas groundwater district monitoring, permit filings, usage trends and transfer activity across conservation districts.",
  },
  {
    title: "Carbon markets",
    body: "Credit origination and portfolio intelligence for voluntary and compliance markets, modelled alongside subsurface rights on the same parcels.",
  },
];

export default function PlatformPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform architecture"
        heading="The natural resource intelligence engine."
        dek="Thimar reads USGS MRDS, BLM MLRS/LR2000, Texas RRC & GAU, Rule 37/38 filings and satellite imagery, then discovers, scores and monitors natural assets before the market reprices them."
      />

      <section className="sec band" id="architecture" aria-labelledby="architecture-h">
        <div className="wrap">
          <div className="shead" data-rv-group>
            <p className="eyebrow" data-rv>
              <span>System architecture</span>
            </p>
            <h2 className="h2" id="architecture-h" data-rv>
              Three layers, from commodity data to a defensible position.
            </h2>
            <p className="lead" data-rv>
              Anyone can download the registries. The advantage is what happens after.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "56px minmax(0,1fr)", gap: "var(--gap-4)", marginTop: "var(--gap-5)" }}>
            <div data-rv>
              <FigArchitecture />
            </div>
            <div className="grid" data-rv-group>
              <div className="panel" data-rv>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--gap-3)", flexWrap: "wrap" }}>
                  <p className="mono">Layer 01</p>
                  <p className="mono">Commodity</p>
                </div>
                <h3 className="h3" style={{ marginTop: "var(--gap-2)" }}>
                  Automated ingestion & vector geocoding
                </h3>
                <p className="body" style={{ marginTop: "var(--gap-2)", maxWidth: "70ch" }}>
                  Connects to federal, state and county repositories through automated ETL. Normalises
                  unstructured legal deeds, GIS shapefiles and geochemical assays into a single geospatial
                  vector database.
                </p>
              </div>
              <div className="panel" data-rv>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--gap-3)", flexWrap: "wrap" }}>
                  <p className="mono">Layer 02</p>
                  <p className="mono">Proprietary</p>
                </div>
                <h3 className="h3" style={{ marginTop: "var(--gap-2)" }}>
                  Multi-modal scoring
                </h3>
                <p className="body" style={{ marginTop: "var(--gap-2)", maxWidth: "70ch" }}>
                  Satellite imagery, production history and title records are evaluated together rather than
                  in isolation, spatial cross-correlation, title curative validation and yield projection in
                  one pass.
                </p>
              </div>
              <div className="panel" data-rv>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--gap-3)", flexWrap: "wrap" }}>
                  <p className="mono">Layer 03</p>
                  <p className="mono" style={{ color: "var(--forest)" }}>
                    Defensible
                  </p>
                </div>
                <h3 className="h3" style={{ marginTop: "var(--gap-2)" }}>
                  Continuous monitoring & alerting
                </h3>
                <p className="body" style={{ marginTop: "var(--gap-2)", maxWidth: "70ch" }}>
                  New filings, permits and surface activity arrive as alerts against watched parcels, so a
                  position is re-priced when the record changes rather than on a quarterly cycle.
                </p>
              </div>
            </div>
          </div>
          <p className="figcap" data-rv style={{ marginTop: "var(--gap-3)" }}>
            Fig. 1. Three-layer stack; depth marks specialisation.
          </p>
        </div>
      </section>

      <Section
        id="sources"
        ground="band band--tint"
        eyebrow="Data sources"
        heading="Public registries, read properly."
        body="Five feeds, normalised into one queryable geospatial space."
      >
        <div data-rv style={{ marginTop: "var(--gap-4)" }}>
          <TableCard>
            <table className="dtable">
              <thead>
                <tr>
                  <th>Source</th>
                  <th>What it yields</th>
                  <th className="num">Cadence</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>USGS MRDS</td>
                  <td>Geochemical surveys & core drill logs</td>
                  <td className="num">QUARTERLY</td>
                </tr>
                <tr>
                  <td>BLM MLRS / LR2000</td>
                  <td>Federal mineral claim registries</td>
                  <td className="num">DAILY</td>
                </tr>
                <tr>
                  <td>Texas RRC & GAU</td>
                  <td>Well production, spacing, Rule 37/38</td>
                  <td className="num">DAILY</td>
                </tr>
                <tr>
                  <td>TWDB & Texas GCDs</td>
                  <td>Groundwater levels & transfer filings</td>
                  <td className="num">MONTHLY</td>
                </tr>
                <tr>
                  <td>Satellite imagery</td>
                  <td>Surface activity & change detection</td>
                  <td className="num">WEEKLY</td>
                </tr>
              </tbody>
            </table>
          </TableCard>
        </div>
        <div className="split" style={{ marginTop: "var(--gap-5)" }}>
          <div data-rv>
            <div className="codeblock">
              <pre>
                <span className="k">GET</span> <span className="v">/api/v1/parcels/VN-TR-4417/valuation</span>
                {"\n\n"}
                {"{\n  "}
                <span className="k">&quot;parcel_id&quot;</span>:             <span className="v">&quot;VN-TR-4417&quot;</span>,
                {"\n  "}
                <span className="k">&quot;basin&quot;</span>:                 <span className="v">&quot;Vantrel Basin&quot;</span>,
                {"\n  "}
                <span className="k">&quot;target_commodity&quot;</span>:      <span className="v">&quot;Lithium Brine&quot;</span>,
                {"\n  "}
                <span className="k">&quot;geochem_score&quot;</span>:         <span className="v">0.96</span>,
                {"\n  "}
                <span className="k">&quot;assessor_baseline_usd&quot;</span>: <span className="v">2580.00</span>,
                {"\n  "}
                <span className="k">&quot;maadin_fair_value_usd&quot;</span>: <span className="v">4200.00</span>,
                {"\n  "}
                <span className="k">&quot;alpha_pct&quot;</span>:             <span className="v">62.8</span>,
                {"\n  "}
                <span className="k">&quot;title_status&quot;</span>:          <span className="v">&quot;UNENCUMBERED_FEE_SIMPLE&quot;</span>
                {"\n}"}
              </pre>
            </div>
            <p className="illus" style={{ marginTop: "var(--gap-3)" }}>
              Illustrative data. Not a real asset.
            </p>
          </div>
          <div className="head" data-rv>
            <p className="eyebrow">
              <span>Developer surface</span>
            </p>
            <h3 className="h3" style={{ marginTop: "var(--gap-2)" }}>
              Every valuation is addressable.
            </h3>
            <p className="body" style={{ marginTop: "var(--gap-3)" }}>
              Parcel-level scores, title status and fair-value estimates are exposed as REST and GraphQL
              endpoints for integration into existing land and ERP systems.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="classes"
        ground="band"
        eyebrow="Asset classes"
        heading="Four classes. One engine."
        body="Each class is scored by the same pipeline, with models specialised to its data."
      >
        <div data-rv style={{ marginTop: "var(--gap-5)" }}>
          <Figure caption="Fig. 2. Sources to engine to classes.">
            <FigAssets />
          </Figure>
        </div>
        <div data-rv style={{ marginTop: "var(--gap-5)" }}>
          <AccordionRows items={ASSET_ROWS} />
        </div>
      </Section>

      <Section
        id="flywheel"
        ground="band band--tint"
        eyebrow="The model"
        heading="Royalties fund the next position."
        body="Cash generated by acquired rights is reinvested. Platform subscriptions run alongside it."
      >
        <div className="split" style={{ marginTop: "var(--gap-5)", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}>
          <div data-rv>
            <Figure caption="Fig. 3. The compounding cycle.">
              <FigFlywheel />
            </Figure>
          </div>
          <div className="grid" data-rv-group>
            <CycleCards />
          </div>
        </div>
      </Section>

      <Closer
        heading="See it run, or read the thesis."
        ctas={
          <>
            <Link className="btn btn--primary" href="/demos">
              Open the demos <i aria-hidden="true">&rarr;</i>
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
