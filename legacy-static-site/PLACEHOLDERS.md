# PLACEHOLDERS — Maadin.AI revamp

**Nothing ships until this file is empty.**

Every invented, unverified, or deliberately-omitted piece of content on this project is registered here. One row per item. When a real value arrives, replace it in the source file **and delete the row in the same commit**.

Status key: `OPEN` = needs real info from client · `BLOCKED` = needs a decision before it can even be drafted · `FICTIONAL-BY-DESIGN` = intentionally invented demo data that must stay obviously fake, but must still be reviewed and signed off.

File paths are the Phase 4 page map (18 files). None exist yet — they are created in Phase 6, and every row is re-verified against the real file then.

---

## A. Credentials & biography

| # | File / location | Current dummy value | What's needed | Status |
|---|---|---|---|---|
| A1 | `about/index.html` — founder narrative, right column | **Nothing rendered.** Education omitted entirely per instruction. No degree, institution, or executive-education claim appears anywhere. | Arshad's actual education — institution(s), degree(s), field, year(s) — with a source we can point to. The old site claimed *"MIT Sloan Executive Education · B.Eng. CSAI · MIT Data Science & ML"*; the Vercel site claims *"M.S. Applied Data Science · USC"*. **These contradict.** Until resolved, no education claim ships. | **OPEN** |
| A2 | `about/index.html` — track record; `work/index.html` | "Three companies founded" — only **two** are ever named (Maadin.AI, theDevMasters). | Name and one-line description of the third company, or drop the count to two. | OPEN |
| A3 | `about/index.html` — founder sidebar | SPE (Society of Petroleum Engineers) listed as a membership, carried from the old site. | Confirm membership is current and in what grade. Relevant to O&G credibility; do not ship unverified. | OPEN |
| A4 | `advisory/index.html` — objection comparison table | **No figures.** Table reframed qualitatively (Ramp / Domain network / Commitment) with no numbers. The invented comparatives previously drafted — "3–6 months vs 2 weeks", "Full comp vs 2–3 days/week" — are removed and must not return unevidenced. | Real, evidenced figures from actual engagements before any number appears here. Invented competitive performance claims are a different risk class from a placeholder stat: they are assertions about outcomes versus an alternative. | **BLOCKED** — no figure ships without evidence |
| A5 | `advisory/index.html` — hero | "Two concurrent client slots" — restored from the old site. | Confirm the number is still accurate. Phase 3 assumption 3. It carries real strategic weight, so it must be true. | OPEN |

## B. Metrics & revenue claims

| # | File / location | Current dummy value | What's needed | Status |
|---|---|---|---|---|
| B1 | `work/index.html`; `about/index.html`; `invest/index.html` — pillar 03 | Old site: `$Xm+` "Revenue Led" (an unedited placeholder, shipped live 3×). Vercel: **"eight-figure enterprise deals"**, **"Multi-million quota ownership"**. | A revenue figure that can be evidenced, or explicit permission to drop the number and rely on the named clients (GE, US Navy) instead. **Recommended: drop the number.** | OPEN |
| B2 | `index.html` hero metric strip; `about/index.html` | "15+ years in AI" | Confirm the start year so this stays accurate over time. Prefer a fixed start year ("in AI since 20XX") over a self-ageing count. | OPEN |
| B3 | `invest/index.html` — thesis pillar 01 evidence chip | Asserted on both existing sites with **no supporting evidence whatsoever**. | A citation, market map, or competitor count. Otherwise reword from a fact to a stated thesis. | OPEN |
| B4 | `invest/index.html` — use-of-funds block | Vercel renders the literal words **"Seed Round"** where an amount belongs, above a 45/30/15/10 allocation — percentages of an undisclosed total. | Target raise amount, or a decision to keep it NDA-gated and remove the allocation bars from the public page. | OPEN |
| B5 | `invest/index.html` and `platform/index.html` — roadmap | Phases carried over verbatim: "Phase 01 · **Now**", "Phase 02 · **2025** / First asset acquisition", "Phase 03 · 2026–27", "Phase 04 · 2028–30". Footer says © 2026 — so the "2025" milestone reads as already missed. | Current real status of each phase. **Has any asset been acquired?** Recommend switching to status labels (Complete / In progress / Planned) rather than years. | **BLOCKED** — page cannot be written accurately without this |
| B6 | `insights/index.html` — article cards; `index.html` teaser | Read-times carried from Vercel: "8 min", "6 min", "7 min" — against articles of 593 / 488 / 417 words. Roughly **3× inflated**. | Nothing from client — compute from word count at build time. Self-fixable in Phase 6. | OPEN (self-resolving) |
| B7 | `index.html` — demos teaser; `demos/index.html` — three cards | Seven unsourced figures on Vercel: "Score 96", "5 Basins Scored", "83–96 AI Score Range", "100% Passed Validation", "6 Automated Pipeline Steps", "4 Districts Tracked", "+15.4% 5-Yr Price CAGR". | Either a stated basis for each, or replace with figures derived from the fictional demo dataset (§C) and label them as such. | OPEN |

## C. Demo data — fictional by design

Per instruction: demo data must be **obviously fictional**. No real companies, no real parcels, no real counties. The Vercel build's use of Albemarle, Pioneer Natural Resources, Diamondback E&P, ConocoPhillips, parcel `NV-ES-8921`, and Esmeralda County is **prohibited** and must not be carried over, disclaimer or not.

| # | File / location | Current dummy value | What's needed | Status |
|---|---|---|---|---|
| C1 | `demos/mineral-rights/index.html` | To be authored: invented parcel IDs, invented county and basin names, invented operator names, invented valuations. Persistent "Illustrative data" marking inside the data surface itself. | Client sign-off that the invented naming reads as clearly fictional and collides with no real entity. | FICTIONAL-BY-DESIGN |
| C2 | `demos/filing-agent/index.html` | To be authored: invented operator profiles replacing the real E&P companies. Rule 37/38 and Form W-1 are genuine public regulatory references and may stay — the *operators* and *permit data* must be invented. | Same sign-off. Confirm that referencing real Texas RRC rule numbers is acceptable. | FICTIONAL-BY-DESIGN |
| C3 | `demos/water-monitor/index.html` | To be authored: invented groundwater district names and $/AF pricing. The Vercel build prices four **real** districts (Wintergarden GCD $3,200, Edwards Aquifer Authority $5,800, High Plains WD No. 1 $1,950, Middle Pecos GCD $2,750) — all must be replaced. | Same sign-off. | FICTIONAL-BY-DESIGN |
| C4 | All three `demos/*/index.html` | No "Acquire Position" CTA. Vercel's **"Acquire Position via Thimar Syndicate →"** is removed; replaced with a methodology/contact CTA. | Confirm removal is acceptable, or supply compliant language if a real syndicate offer exists. | OPEN |
| C6 | `demos/mineral-rights/`, `demos/filing-agent/`, `demos/water-monitor/` | **Full invented dataset now shipped.** Parcels `VN-TR-4417`, `QD-LM-3044`, `HR-BK-4102`, `TP-DV-7719`, `KL-CB-1190`; basins/counties Vantrel, Lomaris, Brakewell, Dorvale, Cobalt Reach / Corran, Sedrick, Halvane, Menark, Iskerry; operator "Ordway Resources LLC"; districts Corran Valley GCD, Sedrick Authority, Halvane Plains No. 1, Menark Basin GCD. All constructed; two-letter prefixes are not US state codes. Rule 37/38, Form W-1 and the agency names remain genuine public references. | Client sign-off that the invented set reads as unmistakably fictional. Every demo page carries the persistent `Illustrative data. Not a real asset.` label. | FICTIONAL-BY-DESIGN |
| C5 | `platform/index.html` (API sample) and all `demos/*/index.html` | **Shipped naming:** parcel `VN-TR-4417`, basin **"Vantrel Basin"**. ID *format* is deliberately realistic per instruction; the place name is fully constructed. `VN` is not a US state code. Earlier drafts using "Karnak Valley" (a real toponym) and "Ashmoor" (a near-miss of Ashmore) were rejected and removed. **Persistent visible label** — "Illustrative data. Not a real asset." — sits inside the data surface on every page showing this data, not in a footer, so it travels with a screenshot. | Sign-off on the invented naming. Note honestly: non-existence of any invented toponym cannot be *proved*, which is exactly why the disclosure rests on the persistent label rather than on the name alone. Confirm the label wording. | FICTIONAL-BY-DESIGN |

## D. Copy & legal

| # | File / location | Current dummy value | What's needed | Status |
|---|---|---|---|---|
| D1 | `privacy/index.html`, `terms/index.html` | Vercel has both routes live; contents not reviewed by us and presumed boilerplate. | Client-supplied or counsel-reviewed policy text. Do not author these. | OPEN |
| D2 | `platform/index.html`, `invest/index.html`, `demos/filing-agent/index.html` | Carried from Vercel: "zero-defect statutory compliance", "ZERO compliance defects", "first-mover pricing power", and *"Federal subsidies and defense stockpiles **guarantee** multi-decade demand."* | Approval to soften each, or evidence supporting them. "Guarantee" in investor copy should go regardless. | OPEN |
| D3 | `contact/index.html`; also `invest/index.html` #data-room | No backend. Both existing versions capture nothing usable — and neither has an **email field**, so no enquiry can be replied to. | A form endpoint (Formspree/Netlify/other) **and** confirmation that an email field is added and required. | **BLOCKED** — the site's only conversion path |
| D4 | `work/index.html` — lead case + three cards | Old site's four cases end in unquantified results: "→ Significant multi-year revenue growth", "→ Enterprise-grade AI deployment", "→ Mission-critical deployment". | One concrete, cleared outcome per engagement. GE and US Navy are confirmed as clients; the **outcomes** are not. Check what is publicly sayable about defence work. | OPEN |
| D5 | All 18 files — `<title>`, `index.html` H1, footer | Three variants exist across the old site alone: `<title>` "Earth's Treasure. **Discovered by AI**", H1 "Earth's treasure. **AI is the finder**", footer "Earth's Treasure. AI is the Finder." | One canonical tagline, one canonical capitalisation, used byte-identically everywhere. | OPEN |
| D6 | `about/index.html` — hero | Restoring the old site's line: *"Maadin (معدن) — Arabic for mineral, mine, and source."* | Confirm the transliteration, the Arabic spelling, and that the gloss is accurate. Will carry `lang="ar"` and `dir="rtl"` on the Arabic string. | OPEN |
| D7 | `work/index.html` — lead case narrative | Phase 4 allocates a ~400-word narrative (context · constraint · what was built · outcome) to the US Navy engagement as the lead case. **Not yet written — no invented content placed.** | The actual engagement story, and confirmation of what is publicly sayable about defence work. If it cannot be told, the lead case becomes General Electric and US Navy moves to the grid. | **BLOCKED** — page structure depends on which engagement can carry it |

## E. Assets

> **Design deviation on record.** PRD §6 specifies `--radius-card: 0px` ("everything else is square — no rounded cards"). At the design lead's direction cards are now softly rounded to agree with the pill buttons: a scale of `panel 16px / card 13px / small 9px / xs 5px / pill 999px`, carried into the SVG figure geometry so diagrams and surfaces share the same corner language. Radius tracks element size rather than one value applied uniformly. No other §6 token was changed.


| # | File / location | Current dummy value | What's needed | Status |
|---|---|---|---|---|
| E1 | `about/index.html` — sticky sidebar | Both existing versions use an "AK" monogram. No photograph exists on either site. | A real portrait, or a decision to keep the monogram. For a personal-authority page a real photo materially outperforms initials. | OPEN |
| E2 | All 18 files — nav and footer | Wordmark set in the body typeface: "Maadin**.AI**". No logotype or mark exists. | Confirm there is no existing brand asset. If none, a drawn wordmark is Phase 5 scope. | OPEN |
| E3 | All 18 files — `<meta property="og:image">` | None. Vercel declares `twitter:card summary_large_image` but ships **no image**. | A 1200×630 share image, or one generated from the type system in Phase 6. | OPEN (self-resolving) |
| E4 | `platform/index.html`, `demos/*/index.html` | None yet. Phase 3 direction is geological / cartographic / data-derived. | Confirm no licensed imagery budget, in which case all visuals are generated from the demo data and CSS. | OPEN |
| E5 | `assets/fonts/plexarabic-600.woff2`; `about/index.html` | **Added webfont: IBM Plex Sans Arabic 600** (arabic subset, 35.0 KB), for معدن on `/about/`. Newsreader has no Arabic coverage. `unicode-range` gates the fetch so only `/about/` downloads it — 0 KB on the other 17 pages. Total face budget is now 139.1 KB, of which 104.1 KB is the latin critical path. | No client input needed — registered because it changes the type system and the performance budget agreed in Phase 3. Delete this row once the Phase 3 typography note is amended to include the Arabic face. | OPEN (self-resolving) |

---

| E6 | `site/assets/img/terrain-mesh.webp` (2560&times;730) and `terrain-mesh-1280.webp` (1280&times;365) | Hero background texture, derived from a supplied stock wireframe-terrain PNG (2000&times;1000). Recoloured to white-on-transparent and cropped to the mesh. **The 2560w file is a 1.28&times; upscale** &mdash; the supplied source is only 2000px wide, so it is not true 2560 detail. Alpha is quantised to 5 levels at `alpha_quality 40` to hold the file to 182 KB; at `opacity .15` this is not visible. | The original vector or a &ge;2560px raster if genuine full-resolution detail is wanted, plus confirmation of the stock licence for commercial use. | OPEN |

**Open: 22 · Blocked: 4 (A4, B5, D3, D7) · Fictional-by-design awaiting sign-off: 5**

Last updated: Phase 6 (Forma rebuild). New: C6 (full invented demo dataset). Site rebuilt on the PRD §6 token set; `/invest/` renamed `/investors/` per PRD §4. New this phase: E5 (Arabic webfont). Changed: A4 reclassified OPEN → BLOCKED and the table reframed with no figures; C5 rewritten with the naming actually shipped plus the persistent label. Paths for `index.html` and `platform/index.html` are now real files under `site/`.
