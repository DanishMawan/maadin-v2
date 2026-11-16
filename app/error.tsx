"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { ServerError } from "@/components/server-error";

export default function Error({
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
    <>
      <title>Something went wrong | Maadin.AI</title>
      <ServerError
        reference={error.digest}
        actions={
          <>
            <button type="button" className="btn btn--primary" onClick={() => retry()}>
              Try again <i aria-hidden="true">&#8635;</i>
            </button>
            <Link className="btn btn--ghost" href="/">
              Back to home <i aria-hidden="true">&rarr;</i>
            </Link>
          </>
        }
      />
    </>
  );
}
