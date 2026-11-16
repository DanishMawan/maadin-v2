"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import "./globals.css";
import { satoshi, inter, plexMono } from "./fonts";
import { ServerError } from "@/components/server-error";

/**
 * Replaces the root layout when the layout itself throws, so it renders its
 * own <html>/<body> and skips Nav/Footer (they may be what failed).
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className={`${satoshi.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <title>Something went wrong | Maadin.AI</title>
        <main id="main">
          <ServerError
            reference={error.digest}
            actions={
              <>
                <button type="button" className="btn btn--primary" onClick={() => retry()}>
                  Try again <i aria-hidden="true">&#8635;</i>
                </button>
                {/* Full page load on purpose: the root layout just failed, so client-side nav could re-enter it. */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a className="btn btn--ghost" href="/">
                  Back to home <i aria-hidden="true">&rarr;</i>
                </a>
              </>
            }
          />
        </main>
      </body>
    </html>
  );
}
