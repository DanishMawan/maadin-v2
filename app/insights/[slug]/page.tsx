import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Closer } from "@/components/closer";
import { Figure } from "@/components/figure";
import { FigArticleRule } from "@/components/diagrams/fig-article-rule";
import { ARTICLES, getArticle } from "@/lib/content/articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Maadin.AI`,
    description: article.sections[0].body.slice(0, 150),
  };
}

/** Mirrors build.py's `nxt[2].split(":")[0][:52]` next-article teaser truncation. */
function nextTeaser(title: string) {
  return title.split(":")[0].slice(0, 52);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = ARTICLES.findIndex((a) => a.slug === slug);
  if (idx === -1) notFound();
  const article = ARTICLES[idx];
  const next = ARTICLES[(idx + 1) % ARTICLES.length];
  const readMeta = article.meta.split("·").pop()?.trim();

  return (
    <>
      <section className="sec band-head">
        <div className="wrap" data-rv-group style={{ maxWidth: 900 }}>
          <p className="eyebrow" data-rv>
            <span>
              {article.category} · {readMeta}
            </span>
          </p>
          <h1 className="h2" data-rv style={{ marginTop: "var(--gap-2)" }}>
            {article.title}
          </h1>
          <p className="lead" data-rv>
            {article.excerpt}&hellip;
          </p>
          <p className="mono" data-rv style={{ marginTop: "var(--gap-3)" }}>
            Arshad Khan · Founder & Principal
          </p>
        </div>
      </section>
      <section className="sec band">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <blockquote
            className="h3"
            data-rv
            style={{
              borderLeft: "1px solid var(--forest)",
              paddingLeft: "var(--gap-3)",
              color: "var(--text-heading)",
              marginBottom: "var(--gap-5)",
            }}
          >
            {article.quote}
          </blockquote>
          <div data-rv style={{ marginBottom: "var(--gap-5)" }}>
            <Figure caption="Fig. 1. Section markers.">
              <FigArticleRule />
            </Figure>
          </div>
          {article.sections.map((s) => (
            <div data-rv style={{ marginTop: "var(--gap-5)" }} key={s.heading}>
              <h2 className="h3" style={{ marginBottom: "var(--gap-2)" }}>
                {s.heading}
              </h2>
              {s.body.split("\n\n").map((para, i) => (
                <p key={i} className="body" style={{ fontSize: "var(--lead)", lineHeight: "var(--lead-lh)", marginTop: i ? "var(--gap-2)" : 0 }}>
                  {para}
                </p>
              ))}
            </div>
          ))}
          <p className="mono" data-rv style={{ marginTop: "var(--gap-5)" }}>
            Read time computed from word count. <span className="ph">Labels on the index are the source site&rsquo;s. PLACEHOLDERS B6.</span>
          </p>
        </div>
      </section>
      <Closer
        heading={`Next: ${nextTeaser(next.title)}…`}
        ctas={
          <>
            <Link className="btn btn--primary" href={`/insights/${next.slug}`}>
              Read next <i aria-hidden="true">&rarr;</i>
            </Link>
            <Link className="btn btn--ghost" href="/insights">
              All insights <i aria-hidden="true">&rarr;</i>
            </Link>
          </>
        }
      />
    </>
  );
}
