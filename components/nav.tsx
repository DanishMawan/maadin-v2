"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { NAV } from "@/lib/content/nav";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);

  // Close the mobile panel on navigation. Adjusted during render (React's
  // recommended pattern for resetting state on a prop change) rather than in
  // an effect, which would call setState after commit and trigger an extra render.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [open]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !open) return;
      const f = panel.querySelectorAll<HTMLAnchorElement>("a[href]");
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
        e.preventDefault();
        toggleRef.current?.focus();
      }
    };
    panel.addEventListener("keydown", onKeydown);
    return () => panel.removeEventListener("keydown", onKeydown);
  }, [open]);

  useEffect(() => {
    const mq = matchMedia("(min-width: 810px)");
    const onChange = (m: MediaQueryListEvent) => {
      if (m.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header>
      <nav className="nav" data-nav data-open={open} aria-label="Primary">
        <div className="nav__in">
          <Link className="logo" href="/">
            <Logo />
          </Link>
          <ul className="nav__links" ref={panelRef}>
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="btn btn--primary nav__cta" href="/contact">
            Contact <i aria-hidden="true">&rarr;</i>
          </Link>
          <button
            ref={toggleRef}
            className="nav__toggle"
            type="button"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}
