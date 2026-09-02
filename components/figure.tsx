import type { ReactNode } from "react";

export function Figure({ children, caption }: { children: ReactNode; caption: ReactNode }) {
  return (
    <figure className="figure">
      {children}
      <figcaption className="figcap">{caption}</figcaption>
    </figure>
  );
}
