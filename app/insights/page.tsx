import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/hero";
import { Closer } from "@/components/closer";
import { ARTICLES } from "@/lib/content/articles";

export const metadata: Metadata = {
  title: "Insights | Maadin.AI",
  description: "Market theses, technical research and founder notes on AI in natural resources.",
};

export default function InsightsIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        heading="Thinking in public."
        dek="Market theses, technical research and founder notes from building Maadin.AI in the open."
      />

      <section className="sec band">
        <div className="wrap">
          <div className="grid g2" data-rv-group>
            {ARTICLES.map((a) => (
              <Link className="card" href={`/insights/${a.slug}`} data-rv key={a.slug}>
                <span className="chip">{a.category}</span>
                <div className="h3">{a.title}</div>
                <p className="mono" style={{ marginTop: "auto" }}>
                  {a.meta}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Closer
        heading="Building this in the open."
        ctas={
          <>
            <Link className="btn btn--primary" href="/about">
              About Maadin.AI <i aria-hidden="true">&rarr;</i>
            </Link>
            <Link className="btn btn--ghost" href="/contact">
              Get in touch <i aria-hidden="true">&rarr;</i>
            </Link>
          </>
        }
      />
    </>
  );
}
