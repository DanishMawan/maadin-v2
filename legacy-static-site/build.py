#!/usr/bin/env python3
"""Static page generator for maadin-revamp/site.

NOT a build step for the site: the output is plain HTML that runs from the
folder with nothing installed. This exists only to keep the nav and footer
identical across 16 files (the sync-script approach from Phase 2).
    python3 build.py
"""
import os, re, textwrap

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'site')

def _asset_version():
    """Short content hash of the shared CSS/JS. Appended to their URLs so a
    rebuild can never be masked by a cached stylesheet — the filename changes
    in effect, so the browser is obliged to refetch."""
    import hashlib
    h = hashlib.sha1()
    for rel in ('assets/css/tokens.css','assets/css/site.css','assets/js/site.js'):
        p = os.path.join(ROOT, rel)
        if os.path.exists(p):
            h.update(open(p,'rb').read())
    return h.hexdigest()[:8]

ASSET_V = _asset_version()

NAV = [("Platform","platform/"),("Demos","demos/"),("Work","work/"),
       ("Advisory","advisory/"),("Investors","investors/"),
       ("Insights","insights/"),("About","about/")]

def up(depth): return '../'*depth if depth else ''

def logomark():
    """Line 'M' with the dot above it. Stroke-only so it inherits currentColor and
    sits directly on the nav ground — no filled container behind it."""
    return ('<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
            '<path d="M4 19.5V8.2c0-.7.85-1.05 1.32-.53L12 15l6.68-7.33c.47-.52 1.32-.17 1.32.53V19.5" '
            'fill="none" stroke="currentColor" stroke-width="2.1" '
            'stroke-linecap="round" stroke-linejoin="round"/>'
            '<circle cx="12" cy="5.1" r="1.6" fill="currentColor"/></svg>')

_DEPTH = [0]
def set_depth(d):
    """Directory depth of the page currently being assembled, so relative
    asset paths in shared components resolve correctly."""
    _DEPTH[0] = d
    return ''

def head(title, desc, depth):
    r = up(depth)
    return f'''<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<link rel="preload" as="font" type="font/woff2" href="{r}assets/fonts/satoshi-400.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="{r}assets/fonts/inter-400.woff2" crossorigin>
<link rel="stylesheet" href="{r}assets/css/tokens.css?v={ASSET_V}">
<link rel="stylesheet" href="{r}assets/css/site.css?v={ASSET_V}">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
'''

def nav(active, depth):
    r = up(depth)
    li = []
    for label, path in NAV:
        cur = ' aria-current="page"' if label == active else ''
        li.append(f'        <li><a href="{r}{path}"{cur}>{label}</a></li>')
    links = "\n".join(li)
    return f'''<!--nav:start-->
<header>
<nav class="nav" data-nav aria-label="Primary">
  <div class="nav__in">
    <a class="logo" href="{r}">{logomark()}Maadin</a>
    <ul class="nav__links" data-nav-links>
{links}
    </ul>
    <a class="btn btn--primary nav__cta" href="{r}contact/">Contact <i aria-hidden="true">&rarr;</i></a>
    <button class="nav__toggle" data-nav-toggle type="button" aria-expanded="false" aria-label="Menu"><span></span></button>
  </div>
</nav>
</header>
<!--nav:end-->
<main id="main">
'''

def footer(depth):
    r = up(depth)
    return f'''</main>
<!--footer:start-->
<footer class="foot">
  <div class="wrap">
    <div class="foot__grid">
      <div>
        <a class="logo" href="{r}">{logomark()}Maadin</a>
        <p class="body" style="margin-top:var(--gap-2);max-width:30ch">
          The intelligence layer for the world&rsquo;s most valuable natural assets.</p>
        <p class="mono" style="margin-top:var(--gap-3)">
          Maadin.AI<br>United States &middot; Global Advisory</p>
      </div>
      <div><h2>Links</h2><ul>
        <li><a href="{r}platform/">Platform</a></li>
        <li><a href="{r}demos/">Demos</a></li>
        <li><a href="{r}work/">Work</a></li>
        <li><a href="{r}insights/">Insights</a></li></ul></div>
      <div><h2>Company</h2><ul>
        <li><a href="{r}about/">About</a></li>
        <li><a href="{r}advisory/">Advisory</a></li>
        <li><a href="{r}investors/">Investors</a></li></ul></div>
      <div><h2>Contact</h2><ul>
        <li><a href="{r}contact/">Send a message</a></li>
        <li><a href="https://www.linkedin.com/in/arshadkhanxai/" rel="noopener">LinkedIn</a></li>
        <li><a href="https://spe.org" rel="noopener">SPE</a></li></ul></div>
    </div>
    <div class="foot__meta">
      <span>&copy; 2026 Maadin.AI</span>
      <span>31&deg;58&prime;N 102&deg;04&prime;W &middot; Permian Basin ref.</span>
      <span data-clock>--:--:-- UTC</span>
      <span>Illustrative data throughout. See PLACEHOLDERS.md</span>
    </div>
  </div>
</footer>
<!--footer:end-->
<script src="{r}assets/js/site.js?v={ASSET_V}"></script>
</body>
</html>
'''

def page(path, title, desc, active, body, depth):
    html = head(title, desc, depth) + nav(active, depth) + body + footer(depth)
    out = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, 'w') as f:
        f.write(html)
    return out

# ---------------------------------------------------------------- helpers ---
def terrain():
    """Wireframe terrain behind the hero. Decorative only: aria-hidden, not
    focusable, and it reserves its own box so it cannot shift layout."""
    r = up(_DEPTH[0])
    return (f'<div class="terrain" aria-hidden="true">'
            f'<img src="{r}assets/img/terrain-light.webp?v={ASSET_V}" '
            f'srcset="{r}assets/img/terrain-light-1200.webp?v={ASSET_V} 1200w, '
            f'{r}assets/img/terrain-light.webp?v={ASSET_V} 2000w" '
            f'sizes="100vw" width="2000" height="1000" alt="" decoding="async"></div>')

def hero(eyebrow, h, dek, ctas, cls="h1", glows=None, visual=""):
    """Homepage hero. Vertical wash, white to #E4EFDF, with the visual
    overlapping into the next section rather than stopping at the boundary."""
    return f'''<section class="sec band-hero">
  {terrain()}
  <div class="wrap" data-rv-group>
    <p class="eyebrow" data-rv><span>{eyebrow}</span></p>
    <h1 class="{cls}" data-rv style="margin-top:var(--gap-3);max-width:19ch;margin-inline:auto">{h}</h1>
    <p class="lead" data-rv style="margin-top:var(--gap-3)">{dek}</p>
    <div class="hero-ctas" data-rv style="margin-top:var(--gap-4)">{ctas}</div>
    {visual}
  </div>
</section>'''
def page_header(eyebrow, h, dek, glows=None):
    """Sub-page opener: same wash, centred, no CTAs."""
    return f'''<section class="sec band-head">
  <div class="wrap" data-rv-group>
    <p class="eyebrow" data-rv><span>{eyebrow}</span></p>
    <h1 class="h2" data-rv style="margin-top:var(--gap-3);max-width:22ch;margin-inline:auto">{h}</h1>
    <p class="lead" data-rv style="margin-top:var(--gap-3);margin-inline:auto">{dek}</p>
  </div>
</section>'''
def closer(h, ctas, depth=0, card=None):
    """Full-width deep-forest CTA panel, radius-panel, sitting on white."""
    card = card or [("Request the seed data room","NDA required"),
                    ("Open the live demos","3 prototypes"),
                    ("Work with Arshad","2 slots")]
    rows = "".join(f'<div class="ctacard__row"><b>{a}</b><span>{b}</span></div>' for a,b in card)
    return f'''<section class="sec band">
  <div class="wrap">
    <div class="ctapanel" data-rv>
      <div>
        <p class="eyebrow"><span>Next step</span></p>
        <h2 class="h1" style="margin-top:var(--gap-3);max-width:15ch">{h}</h2>
        <div class="hero-ctas" style="margin-top:var(--gap-4);justify-content:flex-start">{ctas}</div>
      </div>
      <div class="ctacard">{rows}</div>
    </div>
  </div>
</section>'''
def figure(svg, cap):
    return f'<figure class="figure">{svg}<figcaption class="figcap">{cap}</figcaption></figure>'

# ============================ FIGURES (PRD §7) ==============================
# Thin white line-art. ALL labels are HTML positioned over the SVG (see .dia in
# site.css) so they render at the page's own type sizes and never scale with the
# viewBox. No <text> inside any figure. Stroke lengths are measured at runtime
# from getTotalLength(), so no path can be left part-drawn.

def L(x, y, title, sub="", mod="c", below=None, above=None):
    """One HTML label pinned to the diagram. y is a percentage; `below`/`above`
    pin it a fixed number of px outside the SVG box instead, so a caption can
    never collide with a label whatever the rendered height."""
    inner = "<b>%s</b>" % title + ("<i>%s</i>" % sub if sub else "")
    if below is not None:   top = "calc(100%% + %dpx)" % below
    elif above is not None: top = "-%dpx" % above
    else:                   top = "%s%%" % y
    return '<div class="dia__l dia__l--%s" style="left:%s%%;top:%s">%s</div>' % (mod, x, top, inner)

def dia(svg, labels, pad_bottom=0, pad_px=0, pad_top=0):
    st = []
    if pad_bottom: st.append("padding-bottom:%s%%" % pad_bottom)
    if pad_px:     st.append("margin-bottom:%dpx" % pad_px)
    if pad_top:    st.append("margin-top:%dpx" % pad_top)
    sattr = ' style="%s"' % ";".join(st) if st else ''
    return '<div class="dia"%s>%s%s</div>' % (sattr, svg, "".join(labels))

# --- Mineral / geological glyph set -----------------------------------------
# Small line glyphs used inside the deep-forest icon chips. Each one means
# something specific to the section it sits in; none is decorative filler.
GLYPH = {
 "strata":  '<path d="M2 7h20M2 12h20M2 17h20" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
 "crystal": '<path d="M12 2 21 8v8l-9 6-9-6V8z" stroke-width="1.6" fill="none" stroke-linejoin="round"/>'
            '<path d="M12 2v20M3 8l9 6 9-6" stroke-width="1.2" fill="none"/>',
 "parcel":  '<path d="M3 3h18v18H3z" stroke-width="1.6" fill="none"/>'
            '<path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke-width="1.1" fill="none"/>',
 "core":    '<path d="M8 3h8v18H8z" stroke-width="1.6" fill="none" stroke-linejoin="round"/>'
            '<path d="M8 9h8M8 14h8" stroke-width="1.2" fill="none"/>',
 "basin":   '<path d="M2 8c4 0 5 9 10 9s6-9 10-9" stroke-width="1.6" fill="none" stroke-linecap="round"/>'
            '<path d="M2 14c4 0 5 6 10 6s6-6 10-6" stroke-width="1.1" fill="none" stroke-linecap="round"/>',
 "seismic": '<path d="M2 12h4l2-6 3 13 3-9 2 4h6" stroke-width="1.6" fill="none"'
            ' stroke-linecap="round" stroke-linejoin="round"/>',
 "drill":   '<path d="M12 2v13M7 21h10M12 15l-4 6M12 15l4 6" stroke-width="1.6" fill="none"'
            ' stroke-linecap="round" stroke-linejoin="round"/>',
 "doc":     '<path d="M6 2h8l4 4v16H6z" stroke-width="1.6" fill="none" stroke-linejoin="round"/>'
            '<path d="M14 2v4h4M9 12h6M9 16h6" stroke-width="1.2" fill="none" stroke-linecap="round"/>',
 "globe":   '<circle cx="12" cy="12" r="9" stroke-width="1.6" fill="none"/>'
            '<path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke-width="1.1" fill="none"/>',
 "shield":  '<path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5z" stroke-width="1.6"'
            ' fill="none" stroke-linejoin="round"/><path d="M9 12l2.5 2.5L16 10" stroke-width="1.6"'
            ' fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
 "growth":  '<path d="M3 20h18" stroke-width="1.6" fill="none" stroke-linecap="round"/>'
            '<path d="M6 16v-3M11 16V8M16 16v-6M21 16V4" stroke-width="1.6" fill="none"'
            ' stroke-linecap="round"/>',
 "compass": '<circle cx="12" cy="12" r="9" stroke-width="1.6" fill="none"/>'
            '<path d="M15.5 8.5l-2 5-5 2 2-5z" stroke-width="1.4" fill="none" stroke-linejoin="round"/>',
}

def icochip(kind, on=False):
    return ('<span class="icochip%s" aria-hidden="true"><svg viewBox="0 0 24 24">%s</svg></span>'
            % (" icochip--on" if on else "", GLYPH[kind]))

def cards(items, cls=""):
    """Fact-card grid. Replaces the dot-on-a-rail figure for content that is a
    set of parallel facts rather than a sequence — a timeline metaphor there was
    telling the reader something untrue about the content."""
    out=[]
    for i,(g,k,v,on) in enumerate(items):
        note = '<p class="gcard__n">%s</p>' % v[1] if isinstance(v,tuple) else ""
        body = v[0] if isinstance(v,tuple) else v
        out.append('<div class="gcard" data-rv style="--st:%dms">%s'
                   '<p class="gcard__k">%s</p><p class="gcard__v">%s</p>%s</div>'
                   % (i*90, icochip(g,on), k, body, note))
    n = " gcards--3" if len(items)==3 else ""
    return ('<div class="gcards%s%s" data-rv-group>%s</div>'
            % (n, (" "+cls) if cls else "", "".join(out)))

def illus_strata():
    """Layered basin cross-section with a scored parcel picked out. Used where a
    section is text-only and the page needs a visual (spec §6: every section has one)."""
    return ('<div class="illus" data-rv><svg class="fig" viewBox="0 0 420 260" role="img" aria-label="Cross-section'
      ' of layered rock strata with one parcel column identified and scored.">'
      '<path d="M0 74 C90 56 150 92 230 78 C300 66 360 86 420 74" class="s-d draw" style="--dd:80ms"/>'
      '<path d="M0 118 C90 100 150 136 230 122 C300 110 360 130 420 118" class="s-d draw" style="--dd:180ms"/>'
      '<path d="M0 162 C90 144 150 180 230 166 C300 154 360 174 420 162" class="s-d draw" style="--dd:280ms"/>'
      '<path d="M0 206 C90 188 150 224 230 210 C300 198 360 218 420 206" class="s-d draw" style="--dd:380ms"/>'
      '<path d="M0 30 C90 12 150 48 230 34 C300 22 360 42 420 30" class="s draw" style="--dd:40ms"/>'
      '<g class="pop" style="--dd:560ms">'
      '<rect x="196" y="26" width="52" height="196" rx="8" class="s-a" fill="none"/>'
      '<circle cx="222" cy="122" r="9" class="dot-a"/></g>'
      '<g class="pop" style="--dd:660ms">'
      '<line x1="222" y1="240" x2="222" y2="228" class="s"/></g>'
      '</svg></div>')

def illus_parcelgrid():
    """Survey grid with a handful of positions scored — the shape of an acquisition
    pipeline before any asset exists."""
    cells=[]
    hot={(1,2),(3,1)}
    for r in range(4):
        for c in range(6):
            x=14+c*66; y=14+r*56
            on=(r,c) in hot
            cells.append('<g class="pop" style="--dd:%dms"><rect x="%d" y="%d" width="58" height="48"'
                         ' rx="8" class="%s" fill="none"/>%s</g>'
                         % (120+(r*6+c)*22, x, y, "s-a" if on else "s-d",
                            '<circle cx="%d" cy="%d" r="6" class="dot-a"/>' % (x+29,y+24) if on else ""))
    return ('<div class="illus" data-rv><svg class="fig" viewBox="0 0 420 260" role="img" aria-label="A survey grid'
      ' of parcels with two positions scored and shortlisted.">%s</svg></div>' % "".join(cells))

def fig_pipeline():
    xs = [150, 450, 750, 1050]
    p = ['<svg class="fig" viewBox="0 0 1200 120" role="img" aria-label="Four-station pipeline:'
         ' ingest, analyse, classify, compound. A dashed divider separates the public record from'
         ' proprietary processing.">',
         '<line x1="150" y1="60" x2="1050" y2="60" class="s-d draw" style="--dd:60ms"/>',
         '<line x1="150" y1="60" x2="450" y2="60" class="s draw" style="--dd:260ms"/>',
         '<line x1="300" y1="18" x2="300" y2="102" class="s-a draw" style="--dd:520ms" stroke-dasharray="3 4"/>']
    for i, x in enumerate(xs):
        last = i == len(xs) - 1
        p.append('<g class="pop" style="--dd:%dms"><circle cx="%d" cy="60" r="%d" class="%s"/>'
                 '<circle cx="%d" cy="60" r="15" class="%s"/></g>'
                 % (200 + i*100, x, 7 if last else 6, "dot-a" if last else "dot",
                    x, "s-a" if last else "s"))
    p.append('</svg>')
    steps = [("01 Ingest","USGS &middot; BLM &middot; RRC &middot; TWDB"),
             ("02 Analyse","Discovery &amp; valuation"),
             ("03 Classify","Four asset classes"),
             ("04 Compound","Toward $1B by 2030")]
    labels = [L(25, 0, "Public record &rarr;&larr; Proprietary", "", "c nw", above=26)]
    labels += [L(x/1200.0*100, 0, k, v, "c", below=14) for x,(k,v) in zip(xs, steps)]
    return dia("".join(p), labels, pad_px=96, pad_top=40)

def fig_assets():
    svg = ('<svg class="fig" viewBox="0 0 1000 420" role="img" aria-label="Five public data sources'
      ' converge on the Thimar scoring engine and fan out to four asset classes.">'
      '<g class="draw" style="--dd:240ms">'
      '<path d="M250 56 C340 56 350 190 430 206" class="s-d"/>'
      '<path d="M250 126 C340 126 350 192 430 208" class="s-d"/>'
      '<path d="M250 196 C340 196 360 204 430 210" class="s-d"/>'
      '<path d="M250 266 C340 266 350 226 430 212" class="s-d"/>'
      '<path d="M250 336 C340 336 350 232 430 214" class="s-d"/></g>'
      '<g class="pop" style="--dd:120ms">'
      '<circle cx="240" cy="56" r="4" class="dot"/><circle cx="240" cy="126" r="4" class="dot"/>'
      '<circle cx="240" cy="196" r="4" class="dot"/><circle cx="240" cy="266" r="4" class="dot"/>'
      '<circle cx="240" cy="336" r="4" class="dot"/></g>'
      '<g class="pop" style="--dd:520ms"><rect x="430" y="172" width="150" height="76" rx="12" class="s"/>'
      '<circle cx="430" cy="210" r="5" class="dot-a"/></g>'
      '<g class="draw" style="--dd:660ms">'
      '<path d="M580 210 C660 210 680 74 760 74" class="s"/>'
      '<path d="M580 210 C660 210 680 164 760 164" class="s"/>'
      '<path d="M580 210 C660 210 680 254 760 254" class="s"/>'
      '<path d="M580 210 C660 210 680 344 760 344" class="s"/></g>'
      '<g class="pop" style="--dd:840ms">'
      '<circle cx="760" cy="74" r="5" class="dot"/><circle cx="760" cy="164" r="5" class="dot"/>'
      '<circle cx="760" cy="254" r="5" class="dot"/><circle cx="760" cy="344" r="5" class="dot"/></g>'
      '</svg>')
    labels = [L(0, 13.3, "USGS MRDS", "", "m"), L(0, 30, "BLM LR2000", "", "m"),
              L(0, 46.7, "Texas RRC", "", "m"), L(0, 63.3, "TWDB / GCD", "", "m"),
              L(0, 80, "Satellite", "", "m"),
              L(50.5, 50, "Thimar", "Scoring engine", "cm"),
              L(78, 17.6, "Critical minerals", "Lithium &middot; cobalt &middot; REE", "m"),
              L(78, 39, "Oil &amp; gas royalties", "Permian &middot; Eagle Ford", "m"),
              L(78, 60.5, "Water rights", "TX groundwater districts", "m"),
              L(78, 82, "Carbon markets", "Voluntary + compliance", "m")]
    return dia(svg, labels)

def fig_flywheel():
    svg = ('<svg class="fig" viewBox="0 0 520 520" role="img" aria-label="A four-stage cycle:'
      ' discover, acquire, cash flow, reinvest, returning to discover, with one billion dollars'
      ' by 2030 at the centre.">'
      '<circle cx="260" cy="260" r="150" class="s-d"/>'
      '<path d="M260 110 A150 150 0 0 1 410 260" class="s draw" style="--dd:150ms"/>'
      '<path d="M410 260 A150 150 0 0 1 260 410" class="s draw" style="--dd:330ms"/>'
      '<path d="M260 410 A150 150 0 0 1 110 260" class="s draw" style="--dd:510ms"/>'
      '<path d="M110 260 A150 150 0 0 1 260 110" class="s-a draw" style="--dd:690ms"/>'
      '<g class="pop" style="--dd:400ms"><circle cx="260" cy="110" r="7" class="dot"/></g>'
      '<g class="pop" style="--dd:500ms"><circle cx="410" cy="260" r="7" class="dot"/></g>'
      '<g class="pop" style="--dd:600ms"><circle cx="260" cy="410" r="7" class="dot"/></g>'
      '<g class="pop" style="--dd:700ms"><circle cx="110" cy="260" r="7" class="dot-a"/></g>'
      '</svg>')
    labels = [L(50, 9, "01 Discover", "AI scores assets", "c"),
              L(84, 50, "02 Acquire", "Rights secured", "m"),
              L(50, 87, "03 Cash flow", "Royalties + SaaS", "c"),
              L(16, 50, "04 Reinvest", "Larger positions", "rm"),
              '<div class="dia__l dia__l--cm dia__l--num" style="left:50%;top:50%">'
              '<b>$1B</b><i>By 2030</i></div>']
    return dia(svg, labels)

def fig_roadmap():
    rows = [("Phase 01", "Incorporate &amp; build Thimar", "Entity &middot; pipelines &middot; three prototypes", "done"),
            ("Phase 02", "First asset acquisition", "Mineral rights or royalty &middot; DOE / SBIR", "now"),
            ("Phase 03", "Platform + portfolio scale", "Thimar as SaaS &middot; 5&ndash;10 positions", "next"),
            ("Phase 04", "$1B valuation", "Compounding &middot; platform revenue", "next")]
    # Drawn in CSS, not SVG: the old 58x560 viewBox was stretched to 58px by full
    # column height, which scaled it non-uniformly and turned every dot into an
    # ellipse and every stroke into a broken line.
    n = len(rows) - 1
    dots = []
    labels = []
    for i, (ph, title, meta, state) in enumerate(rows):
        top = 10 + i * (80.0 / n)
        mod = {"done": " rail__dot--done", "now": " rail__dot--now", "next": ""}[state]
        dots.append('<span class="rail__dot%s" style="top:%.4f%%"></span>' % (mod, top))
        badge = {"done": "Complete", "now": "In progress", "next": "Target"}[state]
        labels.append(L(0, top, title, "%s &middot; %s &middot; %s" % (ph, badge, meta), "m"))
    rail = ('<span class="rail" aria-hidden="true">'
            '<span class="rail__line"></span>'
            '<span class="rail__line rail__line--on" style="bottom:%.4f%%"></span>%s</span>'
            % (10 + (80.0 / n) * (n - 1), "".join(dots)))
    return ('<div class="dia dia--rail" role="img" aria-label="Vertical roadmap of four phases read'
            ' top to bottom; phase one complete, phase two in progress, phases three and four are'
            ' targets.">%s%s</div>' % (rail, "".join(labels)))

def fig_proceeds():
    segs = [("Thimar platform build", 45, 0), ("First asset acquisition", 30, 45),
            ("Team &amp; operations", 15, 75), ("Data &amp; infrastructure", 10, 90)]
    W = 1000
    p = ['<svg class="fig" viewBox="0 0 1000 110" role="img" aria-label="Use of proceeds as one stacked'
         ' bar: 45 percent platform build, 30 percent first asset acquisition, 15 percent team and'
         ' operations, 10 percent data and infrastructure.">',
         '<g class="grow" style="--dd:150ms"><rect x="0" y="26" width="1000" height="48" rx="10" class="s"/>'
         '<rect x="2" y="28" width="446" height="44" rx="8" fill="var(--lime)" opacity=".55"/></g>']
    labels = []
    for i, (label, pct, off) in enumerate(segs):
        x = off * W / 100.0
        w = pct * W / 100.0
        if i > 0:
            p.append('<line x1="%s" y1="26" x2="%s" y2="74" class="s pop" style="--dd:%dms"/>' % (x, x, 380 + i * 90))
        p.append('<line x1="%s" y1="74" x2="%s" y2="92" class="s-d pop" style="--dd:%dms"/>' % (x + w / 2, x + w / 2, 460 + i * 90))
        labels.append(L(off + pct / 2.0, 0, "%d%%" % pct, label, "c", below=10))
    p.append('</svg>')
    return dia("".join(p), labels, pad_px=76)

def fig_two_engines():
    svg = ('<svg class="fig" viewBox="0 0 740 300" role="img" aria-label="The platform venture and the'
      ' advisory practice both feed one compounding mission.">'
      '<g class="pop" style="--dd:120ms"><rect x="4" y="34" width="300" height="90" rx="14" class="s"/></g>'
      '<g class="pop" style="--dd:220ms"><rect x="4" y="176" width="300" height="90" rx="14" class="s"/></g>'
      '<g class="draw" style="--dd:340ms">'
      '<path d="M304 79 H400 V140" class="s-d"/>'
      '<path d="M304 221 H400 V160" class="s-d"/>'
      '<path d="M400 150 H500" class="s"/></g>'
      '<g class="pop" style="--dd:560ms"><circle cx="640" cy="150" r="92" class="s-d"/>'
      '<circle cx="640" cy="58" r="6" class="dot-a"/></g>'
      '<path d="M640 58 A92 92 0 0 1 732 150" class="s-a draw" style="--dd:640ms"/>'
      '</svg>')
    labels = [L(4.5, 26.3, "The platform &middot; Venture", "Thimar, acquires &amp; compounds assets", "m"),
              L(4.5, 73.7, "The practice &middot; Advisory", "Fractional CAIO / CRO", "m"),
              '<div class="dia__l dia__l--cm dia__l--num" style="left:86.5%;top:50%">'
              '<b>$1B</b><i>One mission &middot; 2030</i></div>']
    return dia(svg, labels)

def fig_architecture():
    # Same CSS rail as the roadmap — see fig_roadmap for why this is not an SVG.
    return ('<div class="dia dia--rail" style="min-height:100%" role="img" aria-label="Depth indicator'
            ' running from commodity data at the top to a defensible position at the bottom.">'
            '<span class="rail" aria-hidden="true"><span class="rail__line"></span>'
            '<span class="rail__line rail__line--on" style="bottom:50%"></span>'
            '<span class="rail__dot rail__dot--done" style="top:10%"></span>'
            '<span class="rail__dot rail__dot--done" style="top:50%"></span>'
            '<span class="rail__dot rail__dot--now" style="top:90%"></span></span></div>')

def fig_founder():
    svg = ('<svg class="fig" viewBox="0 0 1000 150" role="img" aria-label="Fifteen years of AI moving'
      ' from early NLP through deep learning and agentic systems to the physical world.">'
      '<line x1="60" y1="70" x2="940" y2="70" class="s-d draw" style="--dd:80ms"/>'
      '<line x1="60" y1="70" x2="646" y2="70" class="s draw" style="--dd:260ms"/>'
      '<g class="pop" style="--dd:220ms"><circle cx="60" cy="70" r="7" class="dot"/><circle cx="60" cy="70" r="16" class="s"/></g>'
      '<g class="pop" style="--dd:320ms"><circle cx="353" cy="70" r="7" class="dot"/><circle cx="353" cy="70" r="16" class="s"/></g>'
      '<g class="pop" style="--dd:420ms"><circle cx="646" cy="70" r="7" class="dot"/><circle cx="646" cy="70" r="16" class="s"/></g>'
      '<g class="pop" style="--dd:520ms"><circle cx="940" cy="70" r="7" class="dot-a"/><circle cx="940" cy="70" r="16" class="s-a"/></g>'
      '</svg>')
    labels = [L(0, 0, "15 years &middot; software &rarr; subsurface", "", "nw", above=26),
              L(0, 0, "NLP / CV", "", "nw", below=14), L(35.3, 0, "Deep learning", "", "c nw", below=14),
              L(64.6, 0, "LLM / agentic", "", "c nw", below=14), L(100, 0, "Physical world", "", "r nw", below=14)]
    return dia(svg, labels, pad_px=64, pad_top=40)

def fig_roles():
    # Was a hub-and-spoke SVG whose curves stopped short of their end dots and sat
    # hard left in the column. Parallel roles are not a radial hierarchy anyway.
    return cards([("compass","01 Enterprise BD","Partnerships and channel development.",False),
                  ("growth","02 Revenue leadership","Fractional CRO ownership of the number.",True),
                  ("crystal","03 Chief AI Officer","Capability, architecture and roadmap.",False),
                  ("shield","04 Industry principal","Domain authority in front of the client.",False)])

def fig_thesis():
    return cards([("compass","01 Why now",("Policy-backed demand","IRA &amp; EU CRMA"),False),
                  ("core","02 Why Maadin.AI",("Fifteen years of execution","AI &times; enterprise"),False),
                  ("crystal","03 The moat",("Proprietary pipelines","Normalised public record"),False),
                  ("growth","04 The model",("Assets + SaaS + grants","Three revenue lines"),True)])

def fig_track():
    # Was five SVG lines whose end dots detached from the strokes. Rebuilt as HTML
    # bars: nothing is scaled, so nothing can come apart.
    rows = [("AI &amp; ML leadership", 0, 100, True), ("Enterprise BD", 13, 100, False),
            ("CTO / architecture", 6, 81, False), ("Serial entrepreneur", 21, 100, False),
            ("Author &amp; educator", 45, 100, False)]
    bars = "".join(
      '<div class="trk__row" data-rv style="--st:%dms"><p class="trk__k">%s</p>'
      '<div class="trk__track"><span class="trk__bar%s" style="left:%d%%;right:%d%%"></span></div></div>'
      % (i*90, name, " trk__bar--on" if on else "", a, 100-b)
      for i,(name,a,b,on) in enumerate(rows))
    return ('<div class="trk" data-rv-group role="img" aria-label="Five track-record threads running'
            ' in parallel between 2010 and 2026.">'
            '<div class="trk__scale"><span>2010</span><span>2026</span></div>%s</div>' % bars)

def fig_engagements():
    # Centred, evenly spaced, and the depth is carried by bar height rather than by
    # three boxes drifting left of the column.
    items = [("Directional","Advisory retainer",38,False),
             ("Embedded","Fractional CRO / CAIO &middot; most requested",100,True),
             ("Focused","GTM sprint &middot; 90 days",66,False)]
    cols = "".join(
      '<div class="depth__col" data-rv style="--st:%dms">'
      '<div class="depth__barwrap"><span class="depth__bar%s" style="height:%d%%"></span></div>'
      '<p class="gcard__k">%s</p><p class="gcard__n">%s</p></div>'
      % (i*100, " depth__bar--on" if on else "", h, k, v)
      for i,(k,v,h,on) in enumerate(items))
    return ('<div class="depth" data-rv-group role="img" aria-label="Three engagement models ordered'
            ' by depth of involvement: directional, embedded, focused.">'
            '<p class="depth__axis">Depth of involvement</p>%s</div>' % cols)

def fig_contact():
    # Was three SVG curves colliding with their own labels and an inbox box that
    # overflowed its own outline. Three routes into one inbox is a list, not a graph.
    routes = "".join(
      '<div class="route" data-rv style="--st:%dms">%s<div><p class="gcard__k">%s</p>'
      '<p class="gcard__n">%s</p></div></div>' % (i*90, icochip(g,on), k, v)
      for i,(g,k,v,on) in enumerate([("growth","Invest","Seed round &middot; data room under NDA",False),
                                     ("compass","Partner / build","Platform and data partnerships",False),
                                     ("shield","Advisory","Fractional CRO / CAIO engagements",False)]))
    return ('<div class="routes" data-rv-group role="img" aria-label="Three enquiry routes, all'
            ' reaching Arshad directly rather than a support queue.">%s'
            '<p class="routes__foot">All three reach Arshad directly, not a support queue.</p>'
            '</div>' % routes)

def fig_expertise():
    cols = [("crystal","AI &amp; technology",["AI / ML strategy","Deep learning &amp; NLP",
             "Generative AI &amp; LLMs","Agentic systems"], True),
            ("growth","Enterprise &amp; commercial",["Enterprise architecture","Revenue leadership",
             "Go-to-market"], False),
            ("basin","Natural resources",["Natural resources AI","Geospatial &amp; regulatory data"], False),
            ("compass","Leadership &amp; venture",["Startup to scale","Board &amp; investor relations",
             "Fractional CxO"], False)]
    out=[]
    for i,(g,h,items,on) in enumerate(cols):
        li = "".join('<li>%s</li>' % x for x in items)
        out.append('<div class="gcard" data-rv style="--st:%dms">%s<p class="gcard__k">%s</p>'
                   '<ul class="gcard__list">%s</ul></div>' % (i*90, icochip(g,on), h, li))
    return '<div class="gcards" data-rv-group>%s</div>' % "".join(out)

def fig_demo_strip(kind):
    if kind == "mineral":
        svg = ('<svg class="fig" viewBox="0 0 320 96" aria-hidden="true">'
          '<circle cx="36" cy="48" r="28" class="s-d"/>'
          '<path d="M36 20 A28 28 0 1 1 12 62" class="s-a draw" style="--dd:200ms"/>'
          '<line x1="86" y1="48" x2="300" y2="48" class="s-d draw" style="--dd:160ms"/>'
          '<g class="pop" style="--dd:340ms">'
          '<circle cx="86" cy="48" r="4" class="dot"/><circle cx="140" cy="48" r="4" class="dot"/>'
          '<circle cx="194" cy="48" r="4" class="dot"/><circle cx="247" cy="48" r="4" class="dot"/>'
          '<circle cx="300" cy="48" r="4" class="dot-a"/></g></svg>')
        return dia(svg, ['<div class="dia__l dia__l--cm dia__l--num" style="left:11%;top:50%">'
                         '<b data-count>94</b></div>']).replace('class="dia"','class="dia dia--score"',1)
    if kind == "filing":
        svg = ('<svg class="fig" viewBox="0 0 320 96" aria-hidden="true">'
          '<line x1="16" y1="48" x2="304" y2="48" class="s-d draw" style="--dd:160ms"/>'
          '<g class="pop" style="--dd:300ms">'
          '<rect x="8" y="40" width="16" height="16" rx="4" class="s"/><rect x="78" y="40" width="16" height="16" rx="4" class="s"/>'
          '<rect x="148" y="40" width="16" height="16" rx="4" class="s"/><rect x="218" y="40" width="16" height="16" rx="4" class="s"/>'
          '<rect x="288" y="40" width="16" height="16" rx="4" class="s-a"/></g></svg>')
        return dia(svg, [])
    svg = ('<svg class="fig" viewBox="0 0 320 96" aria-hidden="true">'
      '<line x1="8" y1="88" x2="312" y2="88" class="s-d draw" style="--dd:140ms"/>'
      '<g class="pop" style="--dd:300ms">'
      '<rect x="18" y="62" width="42" height="26" rx="4" class="s"/><rect x="90" y="46" width="42" height="42" rx="4" class="s"/>'
      '<rect x="162" y="32" width="42" height="56" rx="4" class="s"/><rect x="234" y="16" width="42" height="72" rx="4" class="s-a"/></g></svg>')
    return dia(svg, [])

def fig_insights():
    return cards([("crystal","Market thesis",("Critical minerals","Why the convergence matters"),True),
                  ("core","Founder journal",("Building in public","Thesis to platform"),False),
                  ("drill","Technical depth",("O&amp;G automation","What operators get wrong"),False),
                  ("globe","Policy",("Carbon markets","Credits as a data problem"),False)])

def fig_why():
    return cards([("doc","Data-rich",("Petabytes of public record","Registries, filings, assays"),False),
                  ("seismic","High complexity",("Legal + geological + regulatory","Three literacies at once"),False),
                  ("basin","Untouched",("No AI-native competitor","An uncrowded vertical"),False),
                  ("shield","Policy-backed",("IRA &amp; EU CRMA","Statutory demand"),True)])

def fig_sectors():
    return cards([("shield","Defence / federal","Mission systems and federal programme delivery.",True),
                  ("drill","Fortune 50 industrial","Heavy industry and large-scale operations.",False),
                  ("parcel","Enterprise data platform","Platform architecture and data infrastructure.",False),
                  ("globe","Education","Teaching, curriculum and technical authorship.",False)])

def fig_article_rule():
    svg = ('<svg class="fig" viewBox="0 0 900 40" preserveAspectRatio="none" role="img" aria-label="Section rule.">'
      '<line x1="0" y1="20" x2="900" y2="20" class="s-d draw" style="--dd:80ms"/></svg>')
    return dia(svg, [])


# ================================ PAGES =====================================
BTN_INVEST = '<a class="btn btn--primary" href="{r}investors/">Invest in Maadin.AI <i aria-hidden="true">&rarr;</i></a>'
BTN_PARTNER = '<a class="btn btn--ghost" href="{r}advisory/">Partner with me <i aria-hidden="true">&rarr;</i></a>'

GROUND = {                      # spec §4 rhythm — declared once, looked up by id.
  "pipeline":  "band band--tint",
  "engines":   "band",            # white, carries the deep-forest inset panel
  "founder":   "band",
  "assets":    "band band--tint",
  "flywheel":  "band band--tint",
  "roadmap":   "band",
  "demos":     "band",
  "work":      "band band--tint",
  "investors": "band band--tint",
  "insights":  "band",
  "contact":   "band band--tint",
  "company":   "band",
  "why":       "band band--tint",
  "expertise": "band",
  "sources":   "band band--tint",
  "classes":   "band",
  "threads":   "band band--tint",
}

def sec_split(id_, eyebrow, h, body, aside, extra="", cls="band", hcls="h2"):
    """Centred header, then a two-column body. Same opening as every other
    section — spec §3.2 allows no exceptions."""
    cls = GROUND.get(id_, cls)
    b = f'<p class="lead" data-rv>{body}</p>' if body else ""
    return f'''<section class="sec {cls}" id="{id_}" aria-labelledby="{id_}-h">
  <div class="wrap">
    <div class="shead" data-rv-group>
      <p class="eyebrow" data-rv><span>{eyebrow}</span></p>
      <h2 class="{hcls}" id="{id_}-h" data-rv>{h}</h2>{b}
    </div>
    <div data-rv style="margin-top:var(--gap-5)">{aside}</div>
    {extra}
  </div>
</section>'''
def sec(id_, eyebrow, h, body=None, extra="", cls="band", hcls="h2"):
    cls = GROUND.get(id_, cls)
    b = f'<p class="lead" data-rv style="margin-top:var(--gap-3)">{body}</p>' if body else ""
    return f'''<section class="sec {cls}" id="{id_}" aria-labelledby="{id_}-h">
  <div class="wrap">
    <div class="shead" data-rv-group>
      <p class="eyebrow" data-rv><span>{eyebrow}</span></p>
      <h2 class="{hcls}" id="{id_}-h" data-rv>{h}</h2>{b}
    </div>
    {extra}
  </div>
</section>'''

# ------------------------------------------------------------------ HOME ---
HERO_VISUAL = '''<div class="hero-visual" data-rv>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--gap-3);flex-wrap:wrap">
        <div style="display:flex;align-items:center;gap:var(--gap-2)">
          <span class="ichip" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2.5 21 12l-9 9.5L3 12Z" stroke="#A9E27C" stroke-width="1.4" stroke-linejoin="round"/>
            <path d="M7 12h10" stroke="#A9E27C" stroke-width="1.2" opacity=".7"/></svg></span>
          <div><p class="h4">Thimar, scored positions</p>
            <p class="mono" style="margin-top:2px">Illustrative data. Not a real asset.</p></div>
        </div>
        <span class="chip">5 basins scored</span>
      </div>
      <div style="margin-top:var(--gap-4);overflow-x:auto">
        <table class="dtable">
          <thead><tr><th>Parcel</th><th>Basin</th><th class="num">AI valuation</th>
            <th class="num">Alpha</th><th class="num">Score</th></tr></thead>
          <tbody>
            <tr><td>VN-TR-4417</td><td>Vantrel Basin</td><td class="num">$4,200</td><td class="num">+$1.03M</td><td class="num"><b>94</b></td></tr>
            <tr><td>QD-LM-3044</td><td>Lomaris Flat</td><td class="num">$8,900</td><td class="num">+$5.24M</td><td class="num"><b>96</b></td></tr>
            <tr><td>HR-BK-4102</td><td>Brakewell Rise</td><td class="num">$2,850</td><td class="num">+$864k</td><td class="num"><b>89</b></td></tr>
          </tbody></table>
      </div>
    </div>'''

def build_home():
    set_depth(0)
    r = ''
    body = hero(
        "AI &times; Natural Resources",
        "Earth&rsquo;s treasure.<br>AI is the finder.",
        "Public data in. Undervalued mineral, energy, water &amp; carbon assets out. Found, valued, and compounded by AI.",
        BTN_INVEST.format(r=r) + BTN_PARTNER.format(r=r),
        cls="display", visual=HERO_VISUAL)

    body += f'''<section class="sec band" id="metrics" aria-labelledby="metrics-h">
  <div class="wrap">
    <div class="shead" data-rv-group style="margin-bottom:var(--gap-5)">
      <p class="eyebrow" data-rv><span>By the numbers</span></p>
      <h2 class="h2" id="metrics-h" data-rv>Fifteen years, four asset classes, one target.</h2>
      <p class="lead" data-rv>The record behind the platform, and the number it is being built toward.</p>
    </div>
    <div class="statcard" data-rv-group>
      <div data-rv><div class="stat"><span class="ph" data-count>15</span>+ yrs</div><div class="mono">AI / ML</div></div>
      <div data-rv><div class="stat"><span class="ph" data-count>3</span></div><div class="mono">Companies founded</div></div>
      <div data-rv><div class="stat" data-count>4</div><div class="mono">Asset classes</div></div>
      <div data-rv><div class="stat">$1B</div><div class="mono">Goal by 2030</div></div>
    </div>
  </div>
</section>'''

    body += sec("pipeline","How it works","Public record in. Priced assets out.",
        "Thimar reads the same public registries everyone can access, and prices what the market has not.",
        f'<div data-rv style="margin-top:var(--gap-5)">{figure(fig_pipeline(),"Fig. 1. Thimar ingestion pipeline, public record to compounding position.")}</div>'
        f'<div class="tlink--end" data-rv><a class="tlink" href="platform/">See the full architecture</a></div>')

    body += sec_split("engines","What Maadin.AI is","Two engines.<br>One compounding mission.",
        "A venture that acquires natural assets with AI, and an executive practice that helps industry leaders build their own AI capability.",
        '<div class="panel--dark">%s</div>' % figure(fig_two_engines(),"Fig. 2. Venture and practice, one mission."),
        f'''<div style="margin-top:var(--gap-5)">
      <div class="grid g2" data-rv-group style="gap:var(--gap-3)">
        <div class="panel" data-rv><p class="eyebrow"><span>The Platform &middot; Venture</span></p>
          <p class="h3" style="margin-top:var(--gap-2)">Thimar</p>
          <p class="body" style="margin-top:var(--gap-2)">Acquires and compounds critical mineral rights,
          O&amp;G royalties and water assets, powered by a proprietary AI stack.</p>
          <p style="margin-top:var(--gap-3)"><a class="tlink" href="platform/">Explore the platform</a></p></div>
        <div class="panel" data-rv><p class="eyebrow"><span>The Practice &middot; Advisory</span></p>
          <p class="h3" style="margin-top:var(--gap-2)">Fractional CAIO / CRO</p>
          <p class="body" style="margin-top:var(--gap-2)">Arshad Khan embeds as a fractional AI or revenue
          executive, bridging AI architecture with enterprise commercial execution.</p>
          <p style="margin-top:var(--gap-3)"><a class="tlink" href="advisory/">View engagements</a></p></div>
      </div>
    </div>''', cls="band")

    body += sec("founder","The founder","15 years in AI.<br>Built for the physical world.",
        "A rare mix: technical enough to architect the system, commercial enough to close enterprise deals. "
        "Now applied to the hardest problems in the physical world.",
        f'<div data-rv style="margin-top:var(--gap-5)">{figure(fig_founder(),"Fig. 3. Fifteen years of AI, redirected at the subsurface.")}</div>'
        f'<div class="tlink--end" data-rv><a class="tlink" href="about/">Read the full story</a></div>')

    body += sec("assets","What the engine covers","Four asset classes. One engine.",
        "Each class is scored by the same pipeline, with models specialised to its data.",
        f'<div data-rv style="margin-top:var(--gap-5)">{figure(fig_assets(),"Fig. 4. Public sources fan into one engine, out to four asset classes.")}</div>',
        cls="band band--tint")

    body += sec("flywheel","The model","Royalties fund the next position.",
        "Cash generated by acquired rights is reinvested. Platform subscriptions run alongside, so portfolio and software compound together.",
        f'''<div class="split" style="margin-top:var(--gap-5);grid-template-columns:minmax(0,1fr) minmax(0,1fr)">
      <div data-rv>{figure(fig_flywheel(),"Fig. 5. The compounding cycle.")}</div>
      <div class="grid" data-rv-group>{CYCLE_CARDS}</div>
    </div>''')

    body += sec("roadmap","Roadmap","Where the company actually is.",
        '<span class="ph">Phase status is unconfirmed. PLACEHOLDERS B5. No asset has been acquired to date.</span>',
        f'''<div class="split" style="margin-top:var(--gap-5);grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)">
          <div data-rv>{figure(fig_roadmap(),"Fig. 6. Four phases, read top down. Phase 02 is current.")}</div>
          <div class="panel" data-rv>
            <p class="eyebrow"><span>Status today</span></p>
            <div class="ctacard__row"><b>Entity &amp; platform</b><span>Complete</span></div>
            <div class="ctacard__row"><b>Working prototypes</b><span>3 live</span></div>
            <div class="ctacard__row"><b>Assets acquired</b><span>None to date</span></div>
            <div class="ctacard__row"><b>Current phase</b><span>02 &middot; In progress</span></div>
            <p class="body" style="margin-top:var(--gap-3)">The platform is built and the prototypes run.
              The portfolio does not exist yet, and the roadmap says so rather than implying otherwise.</p>
            <div style="margin-top:var(--gap-3)"><a class="tlink" href="investors/">Read the thesis</a></div>
          </div>
        </div>''',
        cls="band")

    demos = ""
    for slug,title,blurb,metric,kind in [
        ("demos/mineral-rights/","Mineral Rights Intelligence","Discovery, scoring and valuation across claim registries and county deed records.","5 BASINS SCORED &middot; AI SCORE 83&ndash;96","mineral"),
        ("demos/filing-agent/","AI Regulatory Filing Agent","Agentic AI preparing Texas RRC W-1 well permits end to end.","6 AUTOMATED STEPS &middot; 100% VALIDATED","filing"),
        ("demos/water-monitor/","Texas Water Rights Monitor","Groundwater district tracking: permits, usage trends, acquisition windows.","4 DISTRICTS TRACKED &middot; +15.4% 5-YR CAGR","water")]:
        demos += f'''<a class="card" href="{slug}" data-rv>{fig_demo_strip(kind)}
        <div><div class="h4">{title}</div><p class="body" style="margin-top:8px">{blurb}</p></div>
        <p class="mono bright" style="margin-top:auto">{metric}</p></a>'''
    body += sec("demos","Proof of capability","Three working systems. Not slides.",
        "Built on public data. Together they demonstrate the full path: discover, validate, monitor.",
        f'<div class="grid g3" data-rv-group style="margin-top:var(--gap-5)">{demos}</div>'
        f'<div class="tlink--end" data-rv><a class="tlink" href="demos/">Open the demos</a></div>')

    body += sec("work","Delivered for","Built where a wrong answer has consequences.",
        "Fifteen years of shipping AI inside organisations that audit it.",
        '''<div data-rv style="margin-top:var(--gap-5)">%s</div>
      <div class="shead" data-rv style="margin-top:var(--gap-4)">
        <p class="mono"><span class="ph">Client names withheld pending permission. PLACEHOLDERS D7.</span></p>
        <div class="tlink--end"><a class="tlink" href="work/">See the work</a></div>
      </div>''' % figure(fig_sectors(),"Fig. 6. Four delivery sectors on one track."))

    body += sec("investors","Investors","The thesis. The opportunity. The raise.",
        "An uncrowded vertical, policy-backed demand, and an operator with AI depth and a business-development record.",
        f'''<div style="margin-top:var(--gap-5)" data-rv>{figure(fig_thesis(),"Fig. 7. Four blocks of the investment case.")}</div>
      <div style="margin-top:var(--gap-5)" data-rv>{figure(fig_proceeds(),"Fig. 8. Phase 1 Seed, use of proceeds.")}</div>
      <div data-rv style="margin-top:var(--gap-4)">
        <a class="btn btn--primary" href="investors/">Request Seed Data Room (NDA) <i aria-hidden="true">&rarr;</i></a></div>''',
        cls="band band--tint")

    arts = ""
    for slug,cat,title,meta in ARTICLES:
        arts += f'''<a class="card" href="insights/{slug}/" data-rv><span class="chip">{cat}</span>
        <div class="h3">{title}</div><p class="mono" style="margin-top:auto">{meta}</p></a>'''
    body += sec("insights","Thinking in public","Market theses, in the open.",
        "Four threads, one argument: the public record is mispriced and AI is what reads it.",
        f'<div data-rv style="margin-top:var(--gap-5)">{figure(fig_insights(),"Fig. 9. Four threads, one thesis.")}</div>'
        f'<div class="grid g4" data-rv-group style="margin-top:var(--gap-5)">{arts}</div>'
        f'<div class="tlink--end" data-rv><a class="tlink" href="insights/">All insights</a></div>')

    body += f'''<section class="sec band band--tint" id="contact" aria-labelledby="contact-h" style="overflow:hidden">
  <div class="wrap">
    <div class="shead" data-rv-group>
      <p class="eyebrow" data-rv><span>Contact</span></p>
      <h2 class="h2" id="contact-h" data-rv>Let&rsquo;s talk.</h2>
      <p class="lead" data-rv>Investor, consulting client, or founder in natural-resource AI, it reaches Arshad directly.</p>
    </div>
    <div class="split" style="margin-top:var(--gap-5);align-items:start">
      <div data-rv>{figure(fig_contact(),"Fig. 9. Three routes, one inbox.")}</div>
      <div data-rv>{contact_form(0)}</div>
    </div>
  </div>
</section>'''

    body += closer("Two ways in.",
        '<a class="btn btn--primary" href="investors/">Request the data room <i aria-hidden="true">&rarr;</i></a>'
        '<a class="btn btn--ghost" href="advisory/">Work with Arshad <i aria-hidden="true">&rarr;</i></a>',
        card=[("Request the seed data room","NDA required"),
              ("Open the live demos","3 prototypes"),
              ("Work with Arshad","2 slots")])

    return page("index.html","Maadin.AI, Natural resource intelligence",
        "Public data in. Undervalued mineral, energy, water and carbon assets out. Found, valued, and compounded by AI.",
        None, body, 0)

def contact_form(depth):
    return f'''<form class="panel" data-form novalidate>
  <p class="eyebrow" style="margin-bottom:var(--gap-3)"><span>What is this about?</span></p>
  <div class="seg" data-seg>
    <button type="button" data-key="invest" data-value="Investment / Seed Round" aria-pressed="true">Invest</button>
    <button type="button" data-key="build" data-value="Partnership or collaboration" aria-pressed="false">Partner / Build</button>
    <button type="button" data-key="advisory" data-value="Advisory / Fractional CRO or CAIO" aria-pressed="false">Advisory</button>
  </div>
  <p class="mono" data-seg-note style="margin-bottom:var(--gap-4)">Investor enquiries reach Arshad directly. Materials are shared under NDA.</p>
  <div class="field"><label for="name">Name</label><input id="name" name="name" type="text" required></div>
  <div class="field"><label for="company">Company or fund</label><input id="company" name="company" type="text"></div>
  <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" required></div>
  <div class="field"><label for="topic">Topic</label>
    <select id="topic" name="topic" required>
      <option>Investment / Seed Round</option>
      <option>Partnership or collaboration</option>
      <option>Advisory / Fractional CRO or CAIO</option>
      <option>Thimar platform</option>
      <option>Speaking / media</option>
      <option>Other</option>
    </select></div>
  <div class="field"><label for="message">Message</label><textarea id="message" name="message" required></textarea></div>
  <button class="btn btn--primary" type="submit">Send message <i aria-hidden="true">&rarr;</i></button>
  <p class="mono" style="margin-top:var(--gap-3)"><span class="ph">No form endpoint configured. PLACEHOLDERS D3.</span></p>
</form>'''

ARTICLES = [
  ("critical-minerals","Market thesis","Why AI &times; critical minerals is the most important convergence of the decade","MARKET THESIS &middot; 8 MIN"),
  ("ninety-days","Founder journal","Building Maadin.AI: from thesis to platform in 90 days","FOUNDER JOURNAL &middot; 7 MIN"),
  ("permian-ai","Technical depth","What Permian Basin operators get wrong about AI adoption","TECHNICAL DEPTH &middot; 6 MIN"),
  ("carbon-data","Policy + opportunity","Carbon credits are a data problem. AI is the solution.","POLICY + OPPORTUNITY &middot; 7 MIN"),
]

CYCLE_CARDS = '''
        <div class="panel" data-rv><p class="mono">01 Discover</p>
          <p class="body" style="margin-top:8px">The engine scores undervalued tracts and rights against the public record.</p></div>
        <div class="panel" data-rv><p class="mono">02 Acquire</p>
          <p class="body" style="margin-top:8px">Rights and royalty streams secured at assessed-value baselines.</p></div>
        <div class="panel" data-rv><p class="mono">03 Cash flow</p>
          <p class="body" style="margin-top:8px">Royalty distributions and platform subscriptions generate recurring revenue.</p></div>
        <div class="panel" data-rv><p class="mono">04 Reinvest</p>
          <p class="body" style="margin-top:8px">Proceeds fund larger positions, the loop that compounds the portfolio.</p></div>'''

def subnav(items):
    li = "".join(f'<li><a href="#{i}">{t}</a></li>' for i,t in items)
    return f'<nav class="subnav" data-subnav aria-label="On this page"><ol>{li}</ol></nav>'

# -------------------------------------------------------------- PLATFORM ---
def build_platform():
    set_depth(1)
    r='../'
    body = page_header("Platform architecture","The natural resource intelligence engine.",
      "Thimar reads USGS MRDS, BLM MLRS/LR2000, Texas RRC &amp; GAU, Rule 37/38 filings and satellite "
      "imagery, then discovers, scores and monitors natural assets before the market reprices them.")

    body += '''<section class="sec band" id="architecture">
  <div class="wrap">
    <div class="shead" data-rv-group>
      <p class="eyebrow" data-rv><span>System architecture</span></p>
      <h2 class="h2" data-rv>Three layers, from commodity data to a defensible position.</h2>
      <p class="lead" data-rv>Anyone can download the registries. The advantage is what happens after.</p>
    </div>
    <div style="display:grid;grid-template-columns:56px minmax(0,1fr);gap:var(--gap-4);margin-top:var(--gap-5)">
      <div data-rv>%s</div>
      <div class="grid" data-rv-group>
        <div class="panel" data-rv>
          <div style="display:flex;justify-content:space-between;gap:var(--gap-3);flex-wrap:wrap">
            <p class="mono">Layer 01</p><p class="mono">Commodity</p></div>
          <h3 class="h3" style="margin-top:var(--gap-2)">Automated ingestion &amp; vector geocoding</h3>
          <p class="body" style="margin-top:var(--gap-2);max-width:70ch">Connects to federal, state and
            county repositories through automated ETL. Normalises unstructured legal deeds, GIS shapefiles
            and geochemical assays into a single geospatial vector database.</p>
        </div>
        <div class="panel" data-rv>
          <div style="display:flex;justify-content:space-between;gap:var(--gap-3);flex-wrap:wrap">
            <p class="mono">Layer 02</p><p class="mono">Proprietary</p></div>
          <h3 class="h3" style="margin-top:var(--gap-2)">Multi-modal scoring</h3>
          <p class="body" style="margin-top:var(--gap-2);max-width:70ch">Satellite imagery, production
            history and title records are evaluated together rather than in isolation, spatial
            cross-correlation, title curative validation and yield projection in one pass.</p>
        </div>
        <div class="panel" data-rv>
          <div style="display:flex;justify-content:space-between;gap:var(--gap-3);flex-wrap:wrap">
            <p class="mono">Layer 03</p><p class="mono" style="color:var(--accent-bright)">Defensible</p></div>
          <h3 class="h3" style="margin-top:var(--gap-2)">Continuous monitoring &amp; alerting</h3>
          <p class="body" style="margin-top:var(--gap-2);max-width:70ch">New filings, permits and surface
            activity arrive as alerts against watched parcels, so a position is re-priced when the record
            changes rather than on a quarterly cycle.</p>
        </div>
      </div>
    </div>
    <p class="figcap" data-rv style="margin-top:var(--gap-3)">Fig. 1. Three-layer stack; depth marks specialisation.</p>
  </div>
</section>''' % fig_architecture()

    body += sec("sources","Data sources","Public registries, read properly.",
      "Five feeds, normalised into one queryable geospatial space.",
      '''<div data-rv style="margin-top:var(--gap-4)"><div class="tablecard" style="overflow-x:auto">
      <table class="dtable">
        <thead><tr><th>Source</th><th>What it yields</th><th class="num">Cadence</th></tr></thead>
        <tbody>
          <tr><td>USGS MRDS</td><td>Geochemical surveys &amp; core drill logs</td><td class="num">QUARTERLY</td></tr>
          <tr><td>BLM MLRS / LR2000</td><td>Federal mineral claim registries</td><td class="num">DAILY</td></tr>
          <tr><td>Texas RRC &amp; GAU</td><td>Well production, spacing, Rule 37/38</td><td class="num">DAILY</td></tr>
          <tr><td>TWDB &amp; Texas GCDs</td><td>Groundwater levels &amp; transfer filings</td><td class="num">MONTHLY</td></tr>
          <tr><td>Satellite imagery</td><td>Surface activity &amp; change detection</td><td class="num">WEEKLY</td></tr>
        </tbody></table></div></div>
    <div class="split" style="margin-top:var(--gap-5)">
      <div data-rv>
        <div class="codeblock"><pre><span class="k">GET</span> <span class="v">/api/v1/parcels/VN-TR-4417/valuation</span>

{
  <span class="k">"parcel_id"</span>:             <span class="v">"VN-TR-4417"</span>,
  <span class="k">"basin"</span>:                 <span class="v">"Vantrel Basin"</span>,
  <span class="k">"target_commodity"</span>:      <span class="v">"Lithium Brine"</span>,
  <span class="k">"geochem_score"</span>:         <span class="v">0.96</span>,
  <span class="k">"assessor_baseline_usd"</span>: <span class="v">2580.00</span>,
  <span class="k">"maadin_fair_value_usd"</span>: <span class="v">4200.00</span>,
  <span class="k">"alpha_pct"</span>:             <span class="v">62.8</span>,
  <span class="k">"title_status"</span>:          <span class="v">"UNENCUMBERED_FEE_SIMPLE"</span>
}</pre></div>
        <p class="illus" style="margin-top:var(--gap-3)">Illustrative data. Not a real asset.</p>
      </div>
      <div class="head" data-rv>
        <p class="eyebrow"><span>Developer surface</span></p>
        <h3 class="h3" style="margin-top:var(--gap-2)">Every valuation is addressable.</h3>
        <p class="body" style="margin-top:var(--gap-3)">Parcel-level scores, title status and fair-value
          estimates are exposed as REST and GraphQL endpoints for integration into existing land and ERP
          systems.</p>
      </div>
    </div>''', cls="band")

    body += sec("classes","Asset classes","Four classes. One engine.",
      "Each class is scored by the same pipeline, with models specialised to its data.",
      '''<div data-rv style="margin-top:var(--gap-5)">%s</div>
      <div class="rows" data-rv style="margin-top:var(--gap-5)">%s</div>'''
      % (figure(fig_assets(),"Fig. 2. Sources to engine to classes."), asset_rows()))

    body += sec("flywheel","The model","Royalties fund the next position.",
      "Cash generated by acquired rights is reinvested. Platform subscriptions run alongside it.",
      '''<div class="split" style="margin-top:var(--gap-5);grid-template-columns:minmax(0,1fr) minmax(0,1fr)">
        <div data-rv>%s</div>
        <div class="grid" data-rv-group>%s</div>
      </div>''' % (figure(fig_flywheel(),"Fig. 3. The compounding cycle."), CYCLE_CARDS),
      cls="band band--tint")

    body += closer("See it run, or read the thesis.",
      f'<a class="btn btn--primary" href="{r}demos/">Open the demos <i aria-hidden="true">&rarr;</i></a>'
      f'<a class="btn btn--ghost" href="{r}investors/">Request the data room <i aria-hidden="true">&rarr;</i></a>')
    return page("platform/index.html","Thimar Intelligence Platform, architecture | Maadin.AI",
      "The three-layer intelligence stack: automated ingestion, multi-modal scoring, and continuous monitoring across USGS, BLM, Texas RRC and TWDB.",
      "Platform", body, 1)

def asset_rows():
    data=[("Critical minerals","AI-driven mineral rights acquisition across lithium, cobalt and rare earths, aligned with US Inflation Reduction Act and EU Critical Raw Materials Act tailwinds."),
          ("Oil &amp; gas royalties","Permian Basin and Eagle Ford royalty streams identified through well-performance modelling on Texas RRC public data."),
          ("Water rights","Texas groundwater district monitoring, permit filings, usage trends and transfer activity across conservation districts."),
          ("Carbon markets","Credit origination and portfolio intelligence for voluntary and compliance markets, modelled alongside subsurface rights on the same parcels.")]
    out=""
    for i,(t,b) in enumerate(data):
        out+=f'''<div class="row"><button class="row__btn" data-row-btn type="button"
        aria-expanded="false" aria-controls="ac{i}"><span class="h3">{t}</span>
        <span class="row__sign" aria-hidden="true"></span></button>
      <div class="row__panel" id="ac{i}" style="height:0"><div class="row__panel-in body">{b}</div></div></div>'''
    return out

# ----------------------------------------------------------------- DEMOS ---
DEMOS = [
 ("mineral-rights","Mineral Rights Intelligence",
  "AI-driven valuation pipeline cross-referencing geochemical anomalies, federal claim registries and county deed valuations to surface mispriced mineral tracts.",
  "mineral","5 BASINS SCORED","AI SCORE RANGE 83&ndash;96","USGS &middot; BLM &middot; AAPL"),
 ("filing-agent","AI Regulatory Filing Agent",
  "Agentic AI that automates Texas Railroad Commission Form W-1 drilling permits, spacing validation, density checks and packet assembly.",
  "filing","6 AUTOMATED STEPS","100% VALIDATION PASSED","TEXAS RRC &middot; W-1"),
 ("water-monitor","Texas Water Rights Monitor",
  "Groundwater district tracker across Texas GCDs, permit filings, usage trends and acquisition windows in the fastest-appreciating natural asset class.",
  "water","4 DISTRICTS TRACKED","+15.4% 5-YR PRICE CAGR","TWDB &middot; TX GCDS"),
]

def build_demos_index():
    set_depth(1)
    r='../'
    body = page_header("Proof of capability", "Three working systems. Not slides.", "Three proprietary prototypes built on public natural-resource data, live "
      "demonstrations of the intelligence layer behind Thimar, not concepts.")
    cards=""
    for slug,title,blurb,kind,m1,m2,src in DEMOS:
        cards+=f'''<a class="card" href="{slug}/" data-rv>{fig_demo_strip(kind)}
      <div><div class="h3">{title}</div><p class="body" style="margin-top:10px">{blurb}</p></div>
      <div style="margin-top:auto"><p class="mono bright">{m1}</p><p class="mono">{m2}</p>
      <p class="mono" style="margin-top:8px">{src}</p></div></a>'''
    body += f'''<section class="sec band">
  <div class="wrap">
    <div data-rv style="margin-bottom:var(--gap-5)">{figure(fig_pipeline(),"Fig. 1. All three prototypes exercise the same pipeline.")}</div>
    <div class="grid g3" data-rv-group>{cards}</div>
    <p class="illus" data-rv style="margin-top:var(--gap-5)">Illustrative data. Not a real asset.</p>
    <p class="body" data-rv style="margin-top:var(--gap-3);max-width:60ch">Every identifier, place name and
      operator on these pages is invented. No real company, parcel or district is represented.</p>
  </div>
</section>'''
    body += closer("Want the methodology?",
      f'<a class="btn btn--primary" href="{r}contact/">Request the methodology <i aria-hidden="true">&rarr;</i></a>'
      f'<a class="btn btn--ghost" href="{r}investors/">Request the data room <i aria-hidden="true">&rarr;</i></a>')
    return page("demos/index.html","Live demos, three working prototypes | Maadin.AI",
      "Three proprietary AI prototypes built on public natural-resource data: mineral rights intelligence, a regulatory filing agent, and a Texas water rights monitor.",
      "Demos", body, 1)

MINERAL_ROWS = [
 ("VN-TR-4417","Lithium","Vantrel Basin &middot; Corran County","640 ac","$4,200","+$1.03M","94"),
 ("QD-LM-3044","Lithium","Lomaris Flat &middot; Sedrick County","1,280 ac","$8,900","+$5.24M","96"),
 ("HR-BK-4102","Rare earth","Brakewell Rise &middot; Halvane County","960 ac","$2,850","+$864k","89"),
 ("TP-DV-7719","Lithium","Dorvale Trough &middot; Menark County","1,920 ac","$5,100","+$3.45M","91"),
 ("KL-CB-1190","Cobalt","Cobalt Reach &middot; Iskerry County","480 ac","$3,150","+$360k","83"),
]

def build_demo_mineral():
    set_depth(2)
    r='../../'
    rows="".join(f'''<tr><td>{p}</td><td>{c}</td><td>{loc}</td><td class="num">{sz}</td>
      <td class="num">{v}</td><td class="num">{a}</td><td class="num bright">{s}</td></tr>'''
      for p,c,loc,sz,v,a,s in MINERAL_ROWS)
    body = page_header("Live technology prototype", "Mineral Rights Intelligence Engine", "Cross-references geochemical anomalies, federal claim registries and county deed "
      "valuations to surface mispriced mineral tracts.")
    body += f'''<section class="sec band" style="padding-block:var(--gap-5)">
  <div class="wrap"><p class="illus" data-rv>Illustrative data. Not a real asset.</p></div>
</section>
<section class="sec band">
  <div class="wrap">
    <div class="shead" data-rv-group>
      <p class="eyebrow" data-rv><span>Scored opportunities</span></p>
      <h2 class="h2" data-rv>Five tracts, ranked by model score.</h2>
    </div>
    <div data-rv style="margin-top:var(--gap-4);overflow-x:auto">
      <table class="dtable">
        <thead><tr><th>Parcel</th><th>Commodity</th><th>Location</th><th class="num">Size</th>
          <th class="num">AI valuation</th><th class="num">Projected alpha</th><th class="num">Score</th></tr></thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
    <p class="mono" data-rv style="margin-top:var(--gap-3)">All identifiers and place names are invented.</p>
  </div>
</section>
<section class="sec band band--tint">
  <div class="wrap">
    <div class="split">
      <div class="head" data-rv-group>
        <p class="eyebrow" data-rv><span>Top prospect</span></p>
        <h2 class="h2" data-rv>VN-TR-4417</h2>
        <p class="lead" data-rv>Vantrel Basin &middot; Corran County. Highest composite score in the current sweep.</p>
        <div data-rv style="margin-top:var(--gap-4)">{figure(fig_pipeline(),"Fig. 1. Scoring path for a single parcel.")}</div>
      </div>
      <div class="grid" data-rv-group style="gap:var(--gap-3)">
        <div class="panel" data-rv><p class="eyebrow"><span>Decomposition</span></p>
          <table class="dtable" style="margin-top:var(--gap-3)">
            <tbody>
              <tr><td>Geochem radiometric anomaly</td><td class="num bright">96%</td></tr>
              <tr><td>Unencumbered title ratio</td><td class="num bright">92%</td></tr>
              <tr><td>Infrastructure &amp; water access</td><td class="num bright">88%</td></tr>
            </tbody></table></div>
        <div class="panel" data-rv><p class="eyebrow"><span>Valuation model</span></p>
          <table class="dtable" style="margin-top:var(--gap-3)">
            <tbody>
              <tr><td>Assessor baseline</td><td class="num bright">$2,580 / acre</td></tr>
              <tr><td>Model fair value</td><td class="num bright">$4,200 / acre</td></tr>
              <tr><td>Gross tract</td><td class="num bright">640 net mineral acres</td></tr>
              <tr><td>Estimated tract alpha</td><td class="num bright">+$1.03M (+62.8%)</td></tr>
            </tbody></table></div>
      </div>
    </div>
  </div>
</section>'''
    body += closer("How the score is computed.",
      f'<a class="btn btn--primary" href="{r}contact/">Request the methodology <i aria-hidden="true">&rarr;</i></a>'
      f'<a class="btn btn--ghost" href="{r}demos/filing-agent/">Next demo <i aria-hidden="true">&rarr;</i></a>')
    return page("demos/mineral-rights/index.html","Mineral Rights Intelligence, demo | Maadin.AI",
      "A live prototype scoring and valuing mineral rights across public claim registries and county deed records. Illustrative data.",
      "Demos", body, 2)

def build_demo_filing():
    set_depth(2)
    r='../../'
    body = page_header("O&amp;G regulatory automation", "AI Regulatory Filing Agent", "An autonomous compliance workflow that assembles Texas Railroad Commission Form W-1 "
      "drilling permits, spacing validation, density checks and packet assembly, with "
      "every step auditable.")
    body += f'''<section class="sec band" style="padding-block:var(--gap-5)">
  <div class="wrap"><p class="illus" data-rv>Illustrative data. Not a real asset.</p></div>
</section>
<section class="sec band">
  <div class="wrap">
    <div class="split">
      <div class="head" data-rv-group>
        <p class="eyebrow" data-rv><span>Run log</span></p>
        <h2 class="h2" data-rv>Six steps, each one checkable.</h2>
        <p class="lead" data-rv>The agent does not guess spacing rules. It executes geometric checks against
          shapefiles and depth databases, then assembles the filing packet.</p>
        <div data-rv style="margin-top:var(--gap-4)">{figure(fig_demo_strip("filing"),"Fig. 1. Raw information to filed packet.")}</div>
      </div>
      <div data-rv>
        <div class="codeblock"><pre><span class="k">$</span> <span class="v">rrc_agent_runner</span> --operator ORD-4471 --district 08

<span class="k">[0.1s]</span> Initialising RRC agentic pipeline&hellip;
<span class="k">[0.4s]</span> Querying groundwater depth limits
        fresh water base at <span class="v">1,650 ft</span>
<span class="k">[0.8s]</span> Rule 37 spacing vs neighbouring lease lines
        distance = <span class="v">467 ft</span> (compliant)
<span class="k">[1.1s]</span> Rule 38 density standard
        <span class="v">640-acre</span> unit confirmed
<span class="k">[1.5s]</span> Compiling Form W-1 payload + plat layer
<span class="k">[1.8s]</span> <span class="v">COMPLETE</span>, packet ready for review</pre></div>
        <div class="panel" style="margin-top:var(--gap-3)">
          <p class="eyebrow"><span>Form W-1 &middot; assembled</span></p>
          <table class="dtable" style="margin-top:var(--gap-3)"><tbody>
            <tr><td>Operator</td><td class="num bright">Ordway Resources LLC</td></tr>
            <tr><td>District &amp; county</td><td class="num bright">08 &middot; Menark</td></tr>
            <tr><td>Lease / well no.</td><td class="num bright">Dorvale Unit #14H</td></tr>
            <tr><td>Surface casing depth</td><td class="num bright">1,650 ft</td></tr>
            <tr><td>Rule 37 distance</td><td class="num bright">467 ft</td></tr>
            <tr><td>Rule 38 acreage unit</td><td class="num bright">640.00 acres</td></tr>
          </tbody></table>
          <p class="mono" style="margin-top:var(--gap-3)">Operator and lease names are invented. Rule 37/38 and Form W-1 are genuine public regulatory references.</p>
        </div>
      </div>
    </div>
  </div>
</section>'''
    body += closer("See the same engine on minerals.",
      f'<a class="btn btn--primary" href="{r}demos/mineral-rights/">Mineral demo <i aria-hidden="true">&rarr;</i></a>'
      f'<a class="btn btn--ghost" href="{r}demos/water-monitor/">Water demo <i aria-hidden="true">&rarr;</i></a>')
    return page("demos/filing-agent/index.html","AI Regulatory Filing Agent, demo | Maadin.AI",
      "An agentic workflow assembling Texas RRC Form W-1 drilling permits with auditable spacing and density validation. Illustrative data.",
      "Demos", body, 2)

WATER_ROWS=[("Corran Valley GCD","Vantrel","$3,200","MODERATE-HIGH","96"),
            ("Sedrick Authority","Lomaris","$5,800","CAP ENFORCED","91"),
            ("Halvane Plains No. 1","Brakewell","$1,950","SEVERE DEPLETION","88"),
            ("Menark Basin GCD","Dorvale","$2,750","MODERATE","94")]

def build_demo_water():
    set_depth(2)
    r='../../'
    rows="".join(f'<tr><td>{d}</td><td>{a}</td><td class="num">{p}</td><td class="num">{k}</td><td class="num bright">{s}</td></tr>'
                 for d,a,p,k,s in WATER_ROWS)
    body = page_header("Groundwater intelligence", "Texas Water Rights Monitor", "Tracks spot pricing, permit transfers and drawdown across groundwater conservation "
      "districts, the fastest-appreciating natural asset class in the American Southwest.")
    body += f'''<section class="sec band" style="padding-block:var(--gap-5)">
  <div class="wrap"><p class="illus" data-rv>Illustrative data. Not a real asset.</p></div>
</section>
<section class="sec band">
  <div class="wrap">
    <div class="shead" data-rv-group>
      <p class="eyebrow" data-rv><span>Monitored districts</span></p>
      <h2 class="h2" data-rv>Four districts, priced per acre-foot.</h2>
    </div>
    <div data-rv style="margin-top:var(--gap-4);overflow-x:auto">
      <table class="dtable">
        <thead><tr><th>District</th><th>Aquifer</th><th class="num">Price / AF</th>
          <th class="num">Depletion risk</th><th class="num">Rating</th></tr></thead>
        <tbody>{rows}</tbody></table>
    </div>
    <div data-rv style="margin-top:var(--gap-5);max-width:640px">{figure(fig_demo_strip("water"),"Fig. 1. Composite $/AF index, five-year trend.")}</div>
    <p class="mono" data-rv style="margin-top:var(--gap-3)">All district and aquifer names are invented.</p>
  </div>
</section>'''
    body += closer("The same engine, three domains.",
      f'<a class="btn btn--primary" href="{r}demos/">All demos <i aria-hidden="true">&rarr;</i></a>'
      f'<a class="btn btn--ghost" href="{r}platform/">See the architecture <i aria-hidden="true">&rarr;</i></a>')
    return page("demos/water-monitor/index.html","Texas Water Rights Monitor, demo | Maadin.AI",
      "A groundwater district tracker covering permit filings, usage trends and acquisition windows across Texas GCDs. Illustrative data.",
      "Demos", body, 2)

# ------------------------------------------------------------------ WORK ---
TRACK = [
 ("AI &amp; machine learning leadership","15+ YEARS",
  "From early NLP and computer vision through to today&rsquo;s multimodal, agentic systems, architected production AI at global scale."),
 ("Enterprise business development","FORTUNE 50 &amp; DEFENSE",
  "Multi-million quota ownership and eight-figure pipeline closed with industrial and defense institutions."),
 ("CTO / chief technology officer","MULTIPLE VENTURES",
  "Hands-on architecture across NLP, deep learning and LLMs, using Python, PyTorch, AWS, GCP and Azure."),
 ("Serial entrepreneur","3 COMPANIES FOUNDED",
  "Zero to operating company, three times over, across product, GTM, fundraising and delivery."),
 ("Published author &amp; educator","2 BOOKS",
  "Two published books on generative AI and DeFi for business leaders; educator to thousands of professionals."),
]

def build_work():
    set_depth(1)
    r='../'
    body = page_header("Track record", "Delivered where reliability isn&rsquo;t optional.", "Fifteen years of building and selling AI inside organisations where a wrong answer has consequences. "
      "Named references are available under NDA.")

    body += f'''<section class="sec band band--tint">
  <div class="wrap">
    <div class="split">
      <div class="head" data-rv-group>
        <p class="eyebrow" data-rv><span>Lead engagement</span></p>
        <h2 class="h2" data-rv>US defense institution</h2>
        <p class="lead" data-rv>Mission-critical AI systems, delivered under constraints most commercial
          deployments never encounter.</p>
        <p class="body" data-rv style="margin-top:var(--gap-3)">The requirement was not accuracy in the
          abstract, it was reliability, security and precision under conditions where a wrong output
          is not a bad recommendation but an operational failure. That forced decisions in the architecture:
          deterministic guardrails around probabilistic components, full auditability of every inference,
          and a deployment model that assumed constrained connectivity rather than a cloud round-trip.</p>
        <p class="body" data-rv style="margin-top:var(--gap-3)">The same discipline is what Thimar applies to
          statutory filings today: a language model proposes, a rules engine verifies, and nothing reaches a
          regulator without a check that can be shown.</p>
      </div>
      <div data-rv>
        <div class="panel">
          <p class="eyebrow"><span>Outcome</span></p>
          <table class="dtable" style="margin-top:var(--gap-3)"><tbody>
            <tr><td>Engagement</td><td class="num bright"><span class="ph">Withheld</span></td></tr>
            <tr><td>Scale</td><td class="num bright"><span class="ph">Withheld</span></td></tr>
            <tr><td>Outcome</td><td class="num bright"><span class="ph">Withheld</span></td></tr>
          </tbody></table>
          <p class="mono" style="margin-top:var(--gap-3)">Client naming and outcome metrics pending permission
           . PLACEHOLDERS D4, D7. Named references available under NDA.</p>
        </div>
      </div>
    </div>
  </div>
</section>'''

    cards="".join(f'''<div class="card" data-rv><p class="chip">{tag}</p>
      <div class="h3">{t}</div><p class="body">{b}</p></div>''' for t,tag,b in TRACK)
    body += sec("threads","The record","Five threads, run in parallel.",
      "These are not sequential roles. They overlapped, which is the point, the commercial work funded the technical work and vice versa.",
      f'<div data-rv style="margin-top:var(--gap-5)">{figure(fig_track(),"Fig. 1. Five threads across fifteen years.")}</div>'
      f'<div class="grid g3" data-rv-group style="margin-top:var(--gap-5)">{cards}</div>')

    body += closer("Hire the record, not the résumé.",
      f'<a class="btn btn--primary" href="{r}advisory/">Discuss an engagement <i aria-hidden="true">&rarr;</i></a>'
      f'<a class="btn btn--ghost" href="{r}about/">Full founder story <i aria-hidden="true">&rarr;</i></a>')
    return page("work/index.html","Work, track record | Maadin.AI",
      "Fifteen years of AI leadership, enterprise business development, CTO architecture, company building and published work.",
      "Work", body, 1)

# -------------------------------------------------------------- ADVISORY ---
def build_advisory():
    set_depth(1)
    r='../'
    body = page_header("Advisory", "Work with Arshad.<br>Fractional executive &amp; GTM lead.", "Hands-on AI strategy, enterprise business development and revenue leadership for "
      "companies building at the intersection of AI and natural resources. Two concurrent client slots.")

    nav_items=[("credibility","01 Why Arshad"),("roles","02 Role types"),("models","03 Engagement models")]
    cards="".join(f'''<div class="card" data-rv><p class="chip">{tag}</p>
      <div class="h4">{t}</div><p class="body">{b}</p></div>''' for t,tag,b in TRACK[:4])
    body += f'''<section class="sec band">
  <div class="wrap">
    <div>
      <div>
        <div id="credibility" style="scroll-margin-top:calc(var(--nav-h) + 40px)">
          <div class="shead" data-rv-group>
            <p class="eyebrow" data-rv><span>Why Arshad</span></p>
            <h2 class="h2" data-rv>You are hiring a person, not a tier.</h2>
            <p class="lead" data-rv>Fifteen years across the full span: writing production ML, and closing
              enterprise deals with the executives who sign for them. Both halves, in the same person.</p>
          </div>
          <div data-rv style="margin-top:var(--gap-5)">{figure(fig_track(),"Fig. 1. Overlapping threads, not a sequence of jobs.")}</div>
          <div class="grid g2" data-rv-group style="margin-top:var(--gap-5)">{cards}</div>
          <div class="panel" data-rv style="margin-top:var(--gap-4)">
            <div class="split" style="align-items:center;gap:var(--gap-4)">
              <div>
                <p class="eyebrow"><span>Domain depth</span></p>
                <p class="body" style="margin-top:var(--gap-2)">Natural resources is not an adjacent
                  market picked from a slide. Thimar reads Texas RRC filings, BLM claim registries and groundwater
                  district transfers daily. That is the same vocabulary an operator, landman or royalty buyer uses,
                  which is why the sales conversation starts a level deeper than a generalist can reach.</p>
              </div>
              {illus_strata()}
            </div>
          </div>
        </div>

        <div id="roles" style="margin-top:var(--band);scroll-margin-top:calc(var(--nav-h) + 40px)">
          <div class="shead" data-rv-group>
            <p class="eyebrow" data-rv><span>Role types</span></p>
            <h2 class="h2" data-rv>Four ways the work lands.</h2>
          </div>
          <div data-rv style="margin-top:var(--gap-5)">{figure(fig_roles(),"Fig. 2. Four roles from one operator.")}</div>
          <div class="grid g2" data-rv-group style="margin-top:var(--gap-5)">
            <div class="card" data-rv><p class="mono">01</p><div class="h4">Enterprise BD &amp; partnerships</div>
              <p class="body">C-suite relationships with operators, majors and royalty companies. Direct outreach and relationship-led closing.</p></div>
            <div class="card" data-rv><p class="mono">02</p><div class="h4">Revenue leadership (CRO)</div>
              <p class="body">Quota ownership, team building and forecast accountability, what a full-time CRO delivers, fractionally.</p></div>
            <div class="card" data-rv><p class="mono">03</p><div class="h4">Chief AI Officer (CAIO)</div>
              <p class="body">AI strategy, roadmap and architecture leadership, positioning the product to domain-expert buyers.</p></div>
            <div class="card" data-rv><p class="mono">04</p><div class="h4">Industry principal</div>
              <p class="body">Technical credibility for sales engineering, RFP responses and product positioning in mining, O&amp;G and carbon.</p></div>
          </div>
        </div>

        <div id="models" style="margin-top:var(--band);scroll-margin-top:calc(var(--nav-h) + 40px)">
          <div class="shead" data-rv-group>
            <p class="eyebrow" data-rv><span>Engagement models</span></p>
            <h2 class="h2" data-rv>Three levels of involvement.</h2>
          </div>
          <div data-rv style="margin-top:var(--gap-5)">{figure(fig_engagements(),"Fig. 3. Depth of involvement by model.")}</div>
          <div class="grid g3" data-rv-group style="margin-top:var(--gap-5)">
            <div class="card" data-rv><p class="chip">Directional</p>
              <div class="h3">Strategic advisory retainer</div>
              <p class="body">Executive-level guidance for companies that already have internal teams.</p>
              <p class="mono" style="margin-top:auto">GTM STRATEGY &middot; DEAL REVIEW &middot; EXEC INTRODUCTIONS &middot; DIRECTION</p></div>
            <div class="card" data-rv style="border-color:var(--border-strong)"><p class="chip">Embedded &middot; Most requested</p>
              <div class="h3">Fractional CRO / CAIO</div>
              <p class="body">Two to three days a week, embedded. Full revenue or AI leadership, performance-aligned.</p>
              <p class="mono" style="margin-top:auto">REVENUE OWNERSHIP &middot; PIPELINE &middot; TEAM &middot; FORECASTING &middot; AI ROADMAP</p></div>
            <div class="card" data-rv><p class="chip">Focused</p>
              <div class="h3">GTM sprint, 90 days</div>
              <p class="body">Fixed-scope, deliverable-based execution rather than open-ended advice.</p>
              <p class="mono" style="margin-top:auto">ICP &middot; POSITIONING &middot; SALES PLAYBOOK &middot; OUTREACH &middot; FIRST RELATIONSHIPS</p></div>
          </div>
          <p class="body" data-rv style="margin-top:var(--gap-4)"><strong class="bright">Two concurrent client slots.</strong>
            <span class="ph">Slot count unconfirmed. PLACEHOLDERS A5.</span></p>
        </div>
      </div>
    </div>
  </div>
</section>'''
    body += closer("Two slots. One conversation.",
      f'<a class="btn btn--primary" href="{r}contact/">Discuss an engagement <i aria-hidden="true">&rarr;</i></a>')
    return page("advisory/index.html","Advisory, fractional CAIO &amp; CRO | Maadin.AI",
      "Fractional executive and GTM leadership for companies building at the intersection of AI and natural resources. Two concurrent client slots.",
      "Advisory", body, 1)

# ------------------------------------------------------------- INVESTORS ---
def build_investors():
    set_depth(1)
    r='../'
    body = page_header("Seed round &middot; Phase 1", "The thesis. The opportunity. The raise.", "An uncrowded vertical, policy-backed demand, and an operator with the AI depth and "
      "commercial record to execute.")

    nav_items=[("thesis","01 Thesis"),("raise","02 The raise"),("status","03 Status"),("dataroom","04 Data room")]
    body += f'''<section class="sec band">
  <div class="wrap">
    <div>
      <div>
        <div id="thesis" style="scroll-margin-top:calc(var(--nav-h) + 40px)">
          <div class="shead" data-rv-group>
            <p class="eyebrow" data-rv><span>Investment thesis</span></p>
            <h2 class="h2" data-rv>Four structural advantages.</h2>
          </div>
          <div class="grid g2" data-rv-group style="margin-top:var(--gap-5)">
            <div class="card" data-rv><p class="mono">01</p><div class="h3">Why now</div>
              <p class="body">Policy-backed demand meets an underpenetrated AI vertical. The US Inflation Reduction
                Act and EU Critical Raw Materials Act tie capital and statutory deadlines to domestic mineral supply.</p>
              <p class="mono" style="margin-top:auto">US IRA &middot; EU CRMA</p></div>
            <div class="card" data-rv><p class="mono">02</p><div class="h3">Why Maadin.AI</div>
              <p class="body">Fifteen years of AI/ML execution plus enterprise commercial relationships, combined
                with natural-resource domain positioning that generalist AI teams do not have.</p>
              <p class="mono" style="margin-top:auto">EXECUTION &middot; RELATIONSHIPS &middot; DOMAIN</p></div>
            <div class="card" data-rv><p class="mono">03</p><div class="h3">The moat</div>
              <p class="body">Proprietary pipelines and models trained on natural-resource signals. The registries are
                public; the normalisation, scoring and monitoring built on top of them are not.</p>
              <p class="mono" style="margin-top:auto">USGS &middot; BLM &middot; TEXAS RRC</p></div>
            <div class="card" data-rv><p class="mono">04</p><div class="h3">The model</div>
              <p class="body">Asset compounding, platform SaaS revenue and non-dilutive grant funding, three
                value-creation levers running in parallel rather than a single software bet.</p>
              <p class="mono" style="margin-top:auto">DOE &middot; ARPA-E &middot; SBIR</p></div>
          </div>
          <p class="body" data-rv style="margin-top:var(--gap-4);max-width:60ch">
            <span class="ph">The &ldquo;uncrowded vertical&rdquo; claim is asserted, not yet evidenced. PLACEHOLDERS B3.</span></p>
        </div>

        <div id="raise" style="margin-top:var(--band);scroll-margin-top:calc(var(--nav-h) + 40px)">
          <div class="shead" data-rv-group>
            <p class="eyebrow" data-rv><span>Current raise</span></p>
            <h2 class="h2" data-rv>Phase 1 Seed.</h2>
            <p class="lead" data-rv>Capital is structured for direct deployment into platform scale and the first
              revenue-yielding asset position.</p>
          </div>
          <div data-rv style="margin-top:var(--gap-5)">{figure(fig_proceeds(),"Fig. 2. Use of proceeds, single allocation.")}</div>
          <p class="body" data-rv style="margin-top:var(--gap-3)">
            <span class="ph">Target raise amount withheld. PLACEHOLDERS B4. Percentages are of an undisclosed total.</span></p>
        </div>

        <div id="status" style="margin-top:var(--band);scroll-margin-top:calc(var(--nav-h) + 40px)">
          <div class="shead" data-rv-group>
            <p class="eyebrow" data-rv><span>Status</span></p>
            <h2 class="h2" data-rv>No asset has been acquired to date.</h2>
            <p class="lead" data-rv>Stated plainly, because it is the first thing a diligent reader will want to
              establish. The platform is built and the prototypes run; the portfolio does not exist yet.</p>
          </div>
          <div class="split" style="margin-top:var(--gap-5);align-items:center">
            <div data-rv>{figure(fig_roadmap(),"Fig. 3. Phase 02 is current.")}</div>
            {illus_parcelgrid()}
          </div>
          <p class="body" data-rv style="margin-top:var(--gap-3)">
            <span class="ph">Phase status unconfirmed. PLACEHOLDERS B5.</span></p>
        </div>

        <div id="dataroom" style="margin-top:var(--band);scroll-margin-top:calc(var(--nav-h) + 40px)">
          <div class="shead" data-rv-group>
            <p class="eyebrow" data-rv>Confidential access</p>
            <h2 class="h2" data-rv>Request the seed data room.</h2>
            <p class="lead" data-rv>Investor materials are available under NDA.</p>
          </div>
          <form class="panel formwrap" data-rv style="margin-top:var(--gap-4)" novalidate>
            <div class="field"><label for="dr-name">Full name</label><input id="dr-name" type="text" required></div>
            <div class="field"><label for="dr-fund">Fund or entity</label><input id="dr-fund" type="text"></div>
            <div class="field"><label for="dr-email">Corporate email</label><input id="dr-email" type="email" required></div>
            <label style="display:flex;gap:10px;align-items:flex-start;margin-bottom:var(--gap-3)">
              <input type="checkbox" id="dr-nda" required style="width:auto;margin-top:3px">
              <span class="body">I agree to execute a standard mutual non-disclosure agreement covering
                proprietary valuations and models.</span></label>
            <button class="btn btn--primary" type="submit">Request access <i aria-hidden="true">&rarr;</i></button>
            <p class="mono" style="margin-top:var(--gap-3)"><span class="ph">No form endpoint configured. PLACEHOLDERS D3.</span></p>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>'''
    body += closer("Read the platform first, if you prefer.",
      f'<a class="btn btn--primary" href="{r}platform/">Platform architecture <i aria-hidden="true">&rarr;</i></a>'
      f'<a class="btn btn--ghost" href="{r}demos/">Open the demos <i aria-hidden="true">&rarr;</i></a>')
    return page("investors/index.html","Investors, thesis, raise and data room | Maadin.AI",
      "The investment thesis, Phase 1 Seed use of proceeds, current status, and a gated data-room request.",
      "Investors", body, 1)

# --------------------------------------------------------------- INSIGHTS --
ART_BODIES = {
 "critical-minerals": [
   ("The structural deficit","&ldquo;By 2030, global demand for lithium is projected to exceed supply. The bottleneck isn&rsquo;t geological scarcity. It&rsquo;s the intelligence friction in identifying, titling and valuing unexploited deposits.&rdquo;"),
   ("1. The policy tailwind","Every industrial epoch is defined by two inputs: energy and material substrate. In the 19th century, coal and steel. In the 20th, hydrocarbons and silicon. In the 21st, clean energy and AI compute rest on an unprecedented basket of critical minerals, including lithium, cobalt, nickel, neodymium, dysprosium and copper.<br><br>Yet while software moves in two-week sprints, mining runs on an analog timeline: bringing a discovery from exploration to production averages more than sixteen years. Governments have recognised that these supply chains are a national security exposure. The US IRA ties tax incentives directly to domestic and allied sourcing; the EU Critical Raw Materials Act sets statutory extraction and processing targets by 2030. This is policy-enforced capital deployment with deadlines attached."),
   ("2. Why incumbents are blind","Legacy conglomerates are built around slow, capital-intensive physical exploration: seismic shoots, core drilling, disjointed county-level record searches.<br><br>Meanwhile petabytes of unstructured public data sit unindexed, including USGS surveys, BLM registries, hyperspectral satellite imagery and historical borehole archives. An AI-native platform can synthesise those across millions of acres in minutes. The constraint was never the data. It was that nobody had read it at scale."),
   ("3. Compound assets, not just code","Selling software alone into slow-moving extractive industries leaves most of the economic value on the table. The winning model is dual-engine: an intelligence platform that identifies mispriced acreage and automates administrative bottlenecks, and a compounding asset engine that acquires rights and royalty streams directly.<br><br>When intelligence powers balance-sheet acquisition, the cash flows reinvest into more positions. That is the flywheel."),
 ],
 "ninety-days": [
   ("The 90-day milestones","&ldquo;Entity formed, acreage indexed, three working AI prototypes delivered, and the seed pipeline opened.&rdquo;"),
   ("Month 1: taming the data","After fifteen years building AI systems, I watched the generative wave arrive with a mix of excitement and concern. Every week brought another thousand wrapper apps competing on thin margins, while the most valuable sector on the planet, the physical resources that underpin modern civilisation, remained virtually untouched by modern AI engineering.<br><br>The first month went entirely into ingestion. Federal, state and county land databases are notoriously messy: legacy FTP servers, scanned PDF plats, unstructured commission records, radiometric surveys. We built ETL pipelines to normalise and geocode those feeds into a unified vector space, a queryable semantic map of North American mineral rights and hydrological permits."),
   ("Month 2: three working demos","Rather than pitching investors with abstract decks, we took a builder-first approach and proved the platform through three live prototypes: mineral rights intelligence identifying undervalued parcels; a filing agent automating Form W-1 drilling permits; and a water rights monitor tracking permits and arbitrage in high-drawdown groundwater districts.<br><br>A prototype answers a question a slide cannot: does the thing run?"),
   ("Month 3 and the road to 2030","With prototypes live, we opened the Phase 1 Seed. Capital is dedicated to scaling the platform and acquiring the first balance-sheet positions. The roadmap is deliberately simple: use intelligence to buy high-yielding natural assets at a discount, reinvest royalty cash flows into new positions, and license the intelligence stack to the wider sector."),
 ],
 "permian-ai": [
   ("The core mistake","&ldquo;Operators fail with AI when they treat it as an external dashboard demanding user attention, rather than an embedded worker that quietly removes operational friction.&rdquo;"),
   ("1. The trap of general-purpose chatbots","Walk any Midland or Houston engineering floor and you will find no shortage of AI pitch decks and pilot licences. Ask the VP of Operations how much field development, regulatory filing or production forecasting runs autonomously, and the answer is almost always negligible.<br><br>The standard diagnosis is cultural resistance. In my experience leading enterprise AI deployments, that is backwards. The barrier is architectural. Vendors demonstrate chat interfaces querying PDF manuals, but petroleum engineers do not need a summary of a reservoir handbook. They need systems that calculate bottom-hole pressure variances, verify lease-line spacing compliance, and assemble certified filings without error."),
   ("2. The agentic alternative","In high-consequence industries, probabilistic hallucination is a non-starter. The workable pattern combines language models for unstructured synthesis with deterministic rules engines for statutory compliance.<br><br>When our filing agent processes a drilling permit, it does not guess spacing rules. It executes geometric checks against GIS shapefiles and base-protection depth databases, then assembles the packet. The model proposes; the rules engine verifies."),
   ("3. The future of automation","As tier-one inventory consolidates among mega-cap operators, the margin battle moves to execution velocity. Companies deploying agentic systems across title curative, regulatory filing and produced-water logistics will run with materially lower overhead while drilling faster and cleaner."),
 ],
 "carbon-data": [
   ("The verification gap","&ldquo;Carbon cannot be audited with periodic manual site visits every five years. It requires continuous telemetry, multi-spectral monitoring, and algorithmic baseline validation.&rdquo;"),
   ("1. From sample estimates to sensors","The voluntary carbon market has been through a credibility crisis. Investigations found that a large share of certain forestry offsets did not represent genuine, permanent removal. Corporate buyers withdrew and pricing collapsed.<br><br>The macro imperative did not change: corporations and sovereign states still face binding net-zero mandates. The problem was never demand. It was the verification architecture. Legacy accreditation relies on self-reported developer models and sporadic inspection. AI-native measurement replaces that with synthetic aperture radar, LiDAR canopy models and atmospheric sensing, combining continuous satellite feeds with computer vision to calculate biomass accretion and soil carbon flux at sub-metre resolution against audited baselines."),
   ("2. Carbon as an institutional asset","When credits carry verifiable provenance, demonstrable additionality and real-time degradation alerts, they stop being reputational risk and become institutional-grade natural capital.<br><br>Thimar models sequestration potential alongside mineral rights and land parcels, identifying tracts where multi-stream monetisation, soil carbon plus subsurface rights, maximises total risk-adjusted return on the same acreage."),
 ],
}

def build_insights_index():
    set_depth(1)
    r='../'
    body = page_header("Insights", "Thinking in public.", "Market theses, technical research and founder notes from building Maadin.AI in the open.")
    cards=""
    for slug,cat,title,meta in ARTICLES:
        cards+=f'''<a class="card" href="{slug}/" data-rv><span class="chip">{cat}</span>
      <div class="h3">{title}</div><p class="mono" style="margin-top:auto">{meta}</p></a>'''
    body += f'''<section class="sec band">
  <div class="wrap">
    <div class="grid g2" data-rv-group>{cards}</div>
  </div>
</section>'''
    body += closer("Building this in the open.",
      f'<a class="btn btn--primary" href="{r}about/">About Maadin.AI <i aria-hidden="true">&rarr;</i></a>'
      f'<a class="btn btn--ghost" href="{r}contact/">Get in touch <i aria-hidden="true">&rarr;</i></a>')
    return page("insights/index.html","Insights | Maadin.AI",
      "Market theses, technical research and founder notes on AI in natural resources.",
      "Insights", body, 1)

def build_article(idx):
    set_depth(2)
    slug,cat,title,meta = ARTICLES[idx]
    r='../../'
    nxt = ARTICLES[(idx+1) % len(ARTICLES)]
    secs = ART_BODIES[slug]
    lead = secs[0][1]
    body = f'''<section class="sec band-head">
  <div class="wrap" data-rv-group style="max-width:900px">
    <p class="eyebrow" data-rv><span>{cat} &middot; {meta.split("&middot;")[-1].strip()}</span></p>
    <h1 class="h2" data-rv style="margin-top:var(--gap-2)">{title}</h1>
    <p class="lead" data-rv>{secs[1][1][:170].split("<br>")[0]}&hellip;</p>
    <p class="mono" data-rv style="margin-top:var(--gap-3)">Arshad Khan &middot; Founder &amp; Principal</p>
  </div>
</section>
<section class="sec band">
  <div class="wrap" style="max-width:820px">
    <blockquote class="h3" data-rv style="border-left:1px solid var(--accent-bright);padding-left:var(--gap-3);
      color:var(--text-primary);margin-bottom:var(--gap-5)">{lead}</blockquote>
    <div data-rv style="margin-bottom:var(--gap-5)">{figure(fig_article_rule(),"Fig. 1. Section markers.")}</div>'''
    for h,p in secs[1:]:
        body += f'''<div data-rv style="margin-top:var(--gap-5)">
      <h2 class="h3" style="margin-bottom:var(--gap-2)">{h}</h2>
      <p class="body" style="font-size:var(--lead);line-height:var(--lead-lh)">{p}</p></div>'''
    body += f'''<p class="mono" data-rv style="margin-top:var(--gap-5)">
      Read time computed from word count. <span class="ph">Labels on the index are the source site&rsquo;s. PLACEHOLDERS B6.</span></p>
  </div>
</section>'''
    body += closer("Next: " + nxt[2].split(":")[0][:52] + "&hellip;",
      f'<a class="btn btn--primary" href="{r}insights/{nxt[0]}/">Read next <i aria-hidden="true">&rarr;</i></a>'
      f'<a class="btn btn--ghost" href="{r}insights/">All insights <i aria-hidden="true">&rarr;</i></a>')
    return page(f"insights/{slug}/index.html", f"{re.sub('<[^>]+>','',title)} | Maadin.AI",
      re.sub('<[^>]+>','',secs[1][1])[:150], "Insights", body, 2)

# ----------------------------------------------------------------- ABOUT ---
def build_about():
    set_depth(1)
    r='../'
    body = page_header("About", "Two engines.<br>One compounding mission.", "Maadin.AI is both a venture builder and an executive practice, deploying AI to "
      "acquire natural assets, while helping industry leaders build their own AI capability.")

    body += f'''<section class="sec band band--tint" id="founder" aria-labelledby="founder-h">
  <div class="wrap">
    <div class="split">
      <div class="head" data-rv-group>
        <p class="eyebrow" data-rv><span>Founder</span></p>
        <h2 class="h2" id="founder-h" data-rv>Arshad Khan</h2>
        <p class="mono" data-rv>FOUNDER &amp; PRINCIPAL &middot; MAADIN.AI</p>
        <p class="lead" data-rv style="margin-top:var(--gap-3)">A rare mix: technical enough to architect the
          system, commercial enough to close the enterprise deal. Fifteen years at that intersection, now
          pointed at the physical world.</p>
        <div data-rv style="margin-top:var(--gap-4)">{figure(fig_founder(),"Fig. 2. Fifteen years of AI, redirected at the subsurface.")}</div>
      </div>
      <div>
        <div class="statband" data-rv-group style="grid-template-columns:repeat(3,1fr)">
          <div data-rv><div class="stat"><span class="ph" data-count>15</span>+</div><div class="mono">YEARS AI / ML</div></div>
          <div data-rv><div class="stat"><span class="ph" data-count>3</span></div><div class="mono">COMPANIES FOUNDED</div></div>
          <div data-rv><div class="stat" data-count>2</div><div class="mono">PUBLISHED BOOKS</div></div>
        </div>
        <div class="panel" data-rv style="margin-top:var(--gap-4)">
          <p class="eyebrow"><span>Detail</span></p>
          <table class="dtable" style="margin-top:var(--gap-3)"><tbody>
            <tr><td>Location</td><td class="num bright">United States &middot; Global advisory</td></tr>
            <tr><td>Focus</td><td class="num bright">AI &times; natural resources</td></tr>
            <tr><td>Member</td><td class="num bright"><span class="ph">SPE, unverified</span></td></tr>
          </tbody></table>
          <p class="mono" style="margin-top:var(--gap-3)"><span class="ph">Education is omitted deliberately,
            the two existing sites give conflicting claims and nothing is invented here. PLACEHOLDERS A1.</span></p>
        </div>
      </div>
    </div>
  </div>
</section>'''

    body += sec("why","Why natural resources","A deliberate bet on an untouched domain.",
      "After fifteen years in AI, the choice was to go where AI fluency is rare and the asymmetry is largest.",
      '''<div class="grid g2" data-rv-group style="margin-top:var(--gap-5)">
        <div data-rv><p class="body" style="font-size:var(--lead);line-height:var(--lead-lh)">
          Critical minerals, oil &amp; gas, water and carbon are data-rich, high-complexity and largely untouched
          by AI-native competitors. The registries are public and enormous; almost nobody has read them at scale.</p></div>
        <div data-rv><p class="body" style="font-size:var(--lead);line-height:var(--lead-lh)">
          The US Inflation Reduction Act and the EU Critical Raw Materials Act now back that bet with
          policy-driven demand and statutory deadlines. Maadin.AI sits at the intersection of that demand and a
          fifteen-year AI foundation.</p></div>
      </div>
      <div data-rv style="margin-top:var(--gap-5)">%s</div>''' % figure(fig_why(),"Fig. 4. Four conditions, one asymmetry."))

    body += sec("expertise","Core expertise","Four groups, one operator.",
      None,
      f'<div data-rv style="margin-top:var(--gap-5)">{figure(fig_expertise(),"Fig. 3. Core expertise groups.")}</div>',
      cls="band band--tint")

    body += closer("Talk to the founder directly.",
      f'<a class="btn btn--primary" href="{r}contact/">Get in touch <i aria-hidden="true">&rarr;</i></a>'
      f'<a class="btn btn--ghost" href="{r}advisory/">Work with Arshad <i aria-hidden="true">&rarr;</i></a>')
    return page("about/index.html","About, company and founder | Maadin.AI",
      "Maadin.AI is a venture builder and an executive practice. Founder Arshad Khan, fifteen years in AI, now applied to natural resources.",
      "About", body, 1)

# --------------------------------------------------------------- CONTACT ---
def build_contact():
    set_depth(1)
    r='../'
    body = page_header("Contact","Let&rsquo;s talk.",
      "Investor, consulting client, or founder in natural-resource AI, it reaches Arshad "
      "directly, not a support queue.")
    body += f'''<section class="sec band" id="routes" aria-labelledby="routes-h">
  <div class="wrap">
    <div class="shead" data-rv-group>
      <p class="eyebrow" data-rv><span>Routes</span></p>
      <h2 class="h2" id="routes-h" data-rv>Three ways in.</h2>
      <p class="lead" data-rv>Pick the one that fits and the message lands in the right place.</p>
    </div>
    <div class="split" style="margin-top:var(--gap-5);align-items:start">
      <div data-rv>
        {figure(fig_contact(),"Fig. 1. Three routes, one inbox.")}
        <div class="panel" style="margin-top:var(--gap-4)">
          <p class="eyebrow"><span>Elsewhere</span></p>
          <ul style="list-style:none;margin-top:var(--gap-3)">
            <li><a class="tlink" href="https://www.linkedin.com/in/arshadkhanxai/" rel="noopener">LinkedIn</a></li>
            <li><a class="tlink" href="{r}investors/">Investor data room</a></li>
            <li><a class="tlink" href="{r}advisory/">Advisory engagements</a></li>
          </ul>
        </div>
      </div>
      <div data-rv>{contact_form(1)}</div>
    </div>
  </div>
</section>'''
    body += closer("Or start with the platform.",
      f'<a class="btn btn--primary" href="{r}platform/">See the architecture <i aria-hidden="true">&rarr;</i></a>'
      f'<a class="btn btn--ghost" href="{r}demos/">Open the demos <i aria-hidden="true">&rarr;</i></a>')
    return page("contact/index.html","Contact | Maadin.AI",
      "Investor, consulting client, or founder in natural-resource AI, reach Arshad directly.",
      None, body, 1)

# ================================= RUN ======================================
if __name__ == "__main__":
    made = [build_home(), build_platform(), build_demos_index(),
            build_demo_mineral(), build_demo_filing(), build_demo_water(),
            build_work(), build_advisory(), build_investors(),
            build_insights_index()]
    made += [build_article(i) for i in range(len(ARTICLES))]
    made += [build_about(), build_contact()]
    for p in made:
        print(f"  {os.path.relpath(p, ROOT):46} {os.path.getsize(p)/1024:6.1f} KB")
    print(f"\n{len(made)} pages written to {ROOT}")
