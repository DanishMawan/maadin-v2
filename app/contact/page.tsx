import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/hero";
import { Closer } from "@/components/closer";
import { Figure } from "@/components/figure";
import { ContactForm } from "@/components/contact-form";
import { ContactRoutes } from "@/components/contact-routes";

export const metadata: Metadata = {
  title: "Contact | Maadin.AI",
  description: "Investor, consulting client, or founder in natural-resource AI, reach Arshad directly.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        heading="Let’s talk."
        dek="Investor, consulting client, or founder in natural-resource AI, it reaches Arshad directly, not a support queue."
      />
      <section className="sec band" id="routes" aria-labelledby="routes-h">
        <div className="wrap">
          <div className="shead" data-rv-group>
            <p className="eyebrow" data-rv>
              <span>Routes</span>
            </p>
            <h2 className="h2" id="routes-h" data-rv>
              Three ways in.
            </h2>
            <p className="lead" data-rv>
              Pick the one that fits and the message lands in the right place.
            </p>
          </div>
          <div className="split" style={{ marginTop: "var(--gap-5)", alignItems: "start" }}>
            <div data-rv>
              <Figure caption="Fig. 1. Three routes, one inbox.">
                <ContactRoutes />
              </Figure>
              <div className="panel" style={{ marginTop: "var(--gap-4)" }}>
                <p className="eyebrow">
                  <span>Elsewhere</span>
                </p>
                <ul style={{ listStyle: "none", marginTop: "var(--gap-3)" }}>
                  <li>
                    <a className="tlink" href="https://www.linkedin.com/in/arshadkhanxai/" rel="noopener">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <Link className="tlink" href="/investors">
                      Investor data room
                    </Link>
                  </li>
                  <li>
                    <Link className="tlink" href="/advisory">
                      Advisory engagements
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div data-rv>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Closer
        heading="Or start with the platform."
        ctas={
          <>
            <Link className="btn btn--primary" href="/platform">
              See the architecture <i aria-hidden="true">&rarr;</i>
            </Link>
            <Link className="btn btn--ghost" href="/demos">
              Open the demos <i aria-hidden="true">&rarr;</i>
            </Link>
          </>
        }
      />
    </>
  );
}
