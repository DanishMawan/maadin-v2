/** Bar data behind FigTrack/TrackBars (build.py's fig_track()). */
export const TRACK_BARS = [
  { name: "AI & ML leadership", a: 0, b: 100, on: true },
  { name: "Enterprise BD", a: 13, b: 100, on: false },
  { name: "CTO / architecture", a: 6, b: 81, on: false },
  { name: "Serial entrepreneur", a: 21, b: 100, on: false },
  { name: "Author & educator", a: 45, b: 100, on: false },
] as const;

/** The work page's "five threads" card grid (build.py's module-level TRACK list) —
 *  a distinct, differently-shaped dataset from TRACK_BARS above, despite covering
 *  the same five threads. Reused (sliced) on the advisory page's credibility section. */
export const TRACK_THREADS = [
  {
    title: "AI & machine learning leadership",
    tag: "15+ YEARS",
    body: "From early NLP and computer vision through to today’s multimodal, agentic systems, architected production AI at global scale.",
  },
  {
    title: "Enterprise business development",
    tag: "FORTUNE 50 & DEFENSE",
    body: "Multi-million quota ownership and eight-figure pipeline closed with industrial and defense institutions.",
  },
  {
    title: "CTO / chief technology officer",
    tag: "MULTIPLE VENTURES",
    body: "Hands-on architecture across NLP, deep learning and LLMs, using Python, PyTorch, AWS, GCP and Azure.",
  },
  {
    title: "Serial entrepreneur",
    tag: "3 COMPANIES FOUNDED",
    body: "Zero to operating company, three times over, across product, GTM, fundraising and delivery.",
  },
  {
    title: "Published author & educator",
    tag: "2 BOOKS",
    body: "Two published books on generative AI and DeFi for business leaders; educator to thousands of professionals.",
  },
] as const;
