export type DemoKind = "mineral" | "filing" | "water";

export const DEMOS: {
  slug: string;
  title: string;
  blurb: string;
  kind: DemoKind;
  m1: string;
  m2: string;
  src: string;
}[] = [
  {
    slug: "mineral-rights",
    title: "Mineral Rights Intelligence",
    blurb:
      "AI-driven valuation pipeline cross-referencing geochemical anomalies, federal claim registries and county deed valuations to surface mispriced mineral tracts.",
    kind: "mineral",
    m1: "5 BASINS SCORED",
    m2: "AI SCORE RANGE 83–96",
    src: "USGS · BLM · AAPL",
  },
  {
    slug: "filing-agent",
    title: "AI Regulatory Filing Agent",
    blurb:
      "Agentic AI that automates Texas Railroad Commission Form W-1 drilling permits, spacing validation, density checks and packet assembly.",
    kind: "filing",
    m1: "6 AUTOMATED STEPS",
    m2: "100% VALIDATION PASSED",
    src: "TEXAS RRC · W-1",
  },
  {
    slug: "water-monitor",
    title: "Texas Water Rights Monitor",
    blurb:
      "Groundwater district tracker across Texas GCDs, permit filings, usage trends and acquisition windows in the fastest-appreciating natural asset class.",
    kind: "water",
    m1: "4 DISTRICTS TRACKED",
    m2: "+15.4% 5-YR PRICE CAGR",
    src: "TWDB · TX GCDS",
  },
];

export const MINERAL_ROWS = [
  { parcel: "VN-TR-4417", commodity: "Lithium", loc: "Vantrel Basin · Corran County", size: "640 ac", valuation: "$4,200", alpha: "+$1.03M", score: "94" },
  { parcel: "QD-LM-3044", commodity: "Lithium", loc: "Lomaris Flat · Sedrick County", size: "1,280 ac", valuation: "$8,900", alpha: "+$5.24M", score: "96" },
  { parcel: "HR-BK-4102", commodity: "Rare earth", loc: "Brakewell Rise · Halvane County", size: "960 ac", valuation: "$2,850", alpha: "+$864k", score: "89" },
  { parcel: "TP-DV-7719", commodity: "Lithium", loc: "Dorvale Trough · Menark County", size: "1,920 ac", valuation: "$5,100", alpha: "+$3.45M", score: "91" },
  { parcel: "KL-CB-1190", commodity: "Cobalt", loc: "Cobalt Reach · Iskerry County", size: "480 ac", valuation: "$3,150", alpha: "+$360k", score: "83" },
];

export const WATER_ROWS = [
  { district: "Corran Valley GCD", aquifer: "Vantrel", price: "$3,200", risk: "MODERATE-HIGH", rating: "96" },
  { district: "Sedrick Authority", aquifer: "Lomaris", price: "$5,800", risk: "CAP ENFORCED", rating: "91" },
  { district: "Halvane Plains No. 1", aquifer: "Brakewell", price: "$1,950", risk: "SEVERE DEPLETION", rating: "88" },
  { district: "Menark Basin GCD", aquifer: "Dorvale", price: "$2,750", risk: "MODERATE", rating: "94" },
];
