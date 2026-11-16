import type { ReactNode } from "react";
import { Terrain } from "./terrain";

/**
 * Full-bleed 500 layout shared by app/error.tsx (runtime error boundary),
 * app/global-error.tsx (root-layout failures) and app/500/page.tsx (the static
 * page Apache can serve via ErrorDocument). Deliberately avoids data-rv reveal
 * attributes: an error boundary can mount after ClientEffects has already
 * scanned the DOM, which would leave reveal-gated content invisible.
 */
export function ServerError({
  actions,
  reference,
}: {
  actions: ReactNode;
  reference?: string;
}) {
  return (
    <section className="sec band-hero err" aria-labelledby="err-h">
      <Terrain />
      <div className="wrap err__wrap">
        <p className="err__code" aria-hidden="true">
          5<span>0</span>
          <span>0</span>
        </p>
        <p className="eyebrow">
          <span>Error 500 · Internal server error</span>
        </p>
        <h1 className="h1 err__h" id="err-h">
          Something broke on our side.
        </h1>
        <p className="lead err__lead">
          It isn&rsquo;t you, and it isn&rsquo;t your connection. The page hit an unexpected fault before it
          could finish loading. Try again in a moment, or head back to solid ground.
        </p>
        <div className="hero-ctas err__ctas">{actions}</div>

        <dl className="err__readout">
          <div>
            <dt>Status</dt>
            <dd>
              <span className="err__dot" aria-hidden="true" />
              500 Internal Server Error
            </dd>
          </div>
          <div>
            <dt>Reference</dt>
            <dd>{reference ?? "Not available"}</dd>
          </div>
          <div>
            <dt>If it persists</dt>
            <dd>
              <a className="tlink" href="/contact/">
                Tell us what you were doing
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
