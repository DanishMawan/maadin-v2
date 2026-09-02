export type Article = {
  slug: string;
  category: string;
  title: string;
  meta: string;
  /** Clean lead sentence for the index/page-header excerpt. Replaces the
   *  legacy build's `secs[1][1][:170].split("<br>")[0] + "…"` truncation
   *  hack, which frequently cut mid-word. */
  excerpt: string;
  quote: string;
  sections: { heading: string; body: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "critical-minerals",
    category: "Market thesis",
    title: "Why AI × critical minerals is the most important convergence of the decade",
    meta: "MARKET THESIS · 8 MIN",
    excerpt: "Every industrial epoch is defined by two inputs: energy and material substrate.",
    quote:
      "“By 2030, global demand for lithium is projected to exceed supply. The bottleneck isn’t geological scarcity. It’s the intelligence friction in identifying, titling and valuing unexploited deposits.”",
    sections: [
      {
        heading: "1. The policy tailwind",
        body: "Every industrial epoch is defined by two inputs: energy and material substrate. In the 19th century, coal and steel. In the 20th, hydrocarbons and silicon. In the 21st, clean energy and AI compute rest on an unprecedented basket of critical minerals, including lithium, cobalt, nickel, neodymium, dysprosium and copper.\n\nYet while software moves in two-week sprints, mining runs on an analog timeline: bringing a discovery from exploration to production averages more than sixteen years. Governments have recognised that these supply chains are a national security exposure. The US IRA ties tax incentives directly to domestic and allied sourcing; the EU Critical Raw Materials Act sets statutory extraction and processing targets by 2030. This is policy-enforced capital deployment with deadlines attached.",
      },
      {
        heading: "2. Why incumbents are blind",
        body: "Legacy conglomerates are built around slow, capital-intensive physical exploration: seismic shoots, core drilling, disjointed county-level record searches.\n\nMeanwhile petabytes of unstructured public data sit unindexed, including USGS surveys, BLM registries, hyperspectral satellite imagery and historical borehole archives. An AI-native platform can synthesise those across millions of acres in minutes. The constraint was never the data. It was that nobody had read it at scale.",
      },
      {
        heading: "3. Compound assets, not just code",
        body: "Selling software alone into slow-moving extractive industries leaves most of the economic value on the table. The winning model is dual-engine: an intelligence platform that identifies mispriced acreage and automates administrative bottlenecks, and a compounding asset engine that acquires rights and royalty streams directly.\n\nWhen intelligence powers balance-sheet acquisition, the cash flows reinvest into more positions. That is the flywheel.",
      },
    ],
  },
  {
    slug: "ninety-days",
    category: "Founder journal",
    title: "Building Maadin.AI: from thesis to platform in 90 days",
    meta: "FOUNDER JOURNAL · 7 MIN",
    excerpt: "After fifteen years building AI systems, I watched the generative wave arrive with a mix of excitement and concern.",
    quote: "“Entity formed, acreage indexed, three working AI prototypes delivered, and the seed pipeline opened.”",
    sections: [
      {
        heading: "Month 1: taming the data",
        body: "After fifteen years building AI systems, I watched the generative wave arrive with a mix of excitement and concern. Every week brought another thousand wrapper apps competing on thin margins, while the most valuable sector on the planet, the physical resources that underpin modern civilisation, remained virtually untouched by modern AI engineering.\n\nThe first month went entirely into ingestion. Federal, state and county land databases are notoriously messy: legacy FTP servers, scanned PDF plats, unstructured commission records, radiometric surveys. We built ETL pipelines to normalise and geocode those feeds into a unified vector space, a queryable semantic map of North American mineral rights and hydrological permits.",
      },
      {
        heading: "Month 2: three working demos",
        body: "Rather than pitching investors with abstract decks, we took a builder-first approach and proved the platform through three live prototypes: mineral rights intelligence identifying undervalued parcels; a filing agent automating Form W-1 drilling permits; and a water rights monitor tracking permits and arbitrage in high-drawdown groundwater districts.\n\nA prototype answers a question a slide cannot: does the thing run?",
      },
      {
        heading: "Month 3 and the road to 2030",
        body: "With prototypes live, we opened the Phase 1 Seed. Capital is dedicated to scaling the platform and acquiring the first balance-sheet positions. The roadmap is deliberately simple: use intelligence to buy high-yielding natural assets at a discount, reinvest royalty cash flows into new positions, and license the intelligence stack to the wider sector.",
      },
    ],
  },
  {
    slug: "permian-ai",
    category: "Technical depth",
    title: "What Permian Basin operators get wrong about AI adoption",
    meta: "TECHNICAL DEPTH · 6 MIN",
    excerpt: "Walk any Midland or Houston engineering floor and you will find no shortage of AI pitch decks and pilot licences.",
    quote:
      "“Operators fail with AI when they treat it as an external dashboard demanding user attention, rather than an embedded worker that quietly removes operational friction.”",
    sections: [
      {
        heading: "1. The trap of general-purpose chatbots",
        body: "Walk any Midland or Houston engineering floor and you will find no shortage of AI pitch decks and pilot licences. Ask the VP of Operations how much field development, regulatory filing or production forecasting runs autonomously, and the answer is almost always negligible.\n\nThe standard diagnosis is cultural resistance. In my experience leading enterprise AI deployments, that is backwards. The barrier is architectural. Vendors demonstrate chat interfaces querying PDF manuals, but petroleum engineers do not need a summary of a reservoir handbook. They need systems that calculate bottom-hole pressure variances, verify lease-line spacing compliance, and assemble certified filings without error.",
      },
      {
        heading: "2. The agentic alternative",
        body: "In high-consequence industries, probabilistic hallucination is a non-starter. The workable pattern combines language models for unstructured synthesis with deterministic rules engines for statutory compliance.\n\nWhen our filing agent processes a drilling permit, it does not guess spacing rules. It executes geometric checks against GIS shapefiles and base-protection depth databases, then assembles the packet. The model proposes; the rules engine verifies.",
      },
      {
        heading: "3. The future of automation",
        body: "As tier-one inventory consolidates among mega-cap operators, the margin battle moves to execution velocity. Companies deploying agentic systems across title curative, regulatory filing and produced-water logistics will run with materially lower overhead while drilling faster and cleaner.",
      },
    ],
  },
  {
    slug: "carbon-data",
    category: "Policy + opportunity",
    title: "Carbon credits are a data problem. AI is the solution.",
    meta: "POLICY + OPPORTUNITY · 7 MIN",
    excerpt: "The voluntary carbon market has been through a credibility crisis.",
    quote:
      "“Carbon cannot be audited with periodic manual site visits every five years. It requires continuous telemetry, multi-spectral monitoring, and algorithmic baseline validation.”",
    sections: [
      {
        heading: "1. From sample estimates to sensors",
        body: "The voluntary carbon market has been through a credibility crisis. Investigations found that a large share of certain forestry offsets did not represent genuine, permanent removal. Corporate buyers withdrew and pricing collapsed.\n\nThe macro imperative did not change: corporations and sovereign states still face binding net-zero mandates. The problem was never demand. It was the verification architecture. Legacy accreditation relies on self-reported developer models and sporadic inspection. AI-native measurement replaces that with synthetic aperture radar, LiDAR canopy models and atmospheric sensing, combining continuous satellite feeds with computer vision to calculate biomass accretion and soil carbon flux at sub-metre resolution against audited baselines.",
      },
      {
        heading: "2. Carbon as an institutional asset",
        body: "When credits carry verifiable provenance, demonstrable additionality and real-time degradation alerts, they stop being reputational risk and become institutional-grade natural capital.\n\nThimar models sequestration potential alongside mineral rights and land parcels, identifying tracts where multi-stream monetisation, soil carbon plus subsurface rights, maximises total risk-adjusted return on the same acreage.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
