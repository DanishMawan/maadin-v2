import type { Metadata } from "next";
import Link from "next/link";
import { ServerError } from "@/components/server-error";

/**
 * Static 500 page, exported to out/500/index.html. Point Apache at it with
 * `ErrorDocument 500 /500/` in the server's .htaccess.
 */
export const metadata: Metadata = {
  title: "Server error | Maadin.AI",
  robots: { index: false, follow: false },
};

export default function ServerErrorPage() {
  return (
    <ServerError
      actions={
        <>
          <Link className="btn btn--primary" href="/">
            Back to home <i aria-hidden="true">&rarr;</i>
          </Link>
          <Link className="btn btn--ghost" href="/contact">
            Contact us <i aria-hidden="true">&rarr;</i>
          </Link>
        </>
      }
    />
  );
}
