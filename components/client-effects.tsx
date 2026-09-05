"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ports legacy-static-site/site/assets/js/site.js: scroll reveals, SVG
 * stroke-draw measurement, count-up numbers, expandable rows, and the
 * footer clock. Mounted once in the root layout; re-runs its DOM queries on
 * every route change since Next client navigation doesn't reload the page
 * the way the old multi-page HTML did.
 */
export default function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const d = document;
    d.documentElement.classList.remove("no-js");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");

    if (d.hidden) d.documentElement.classList.add("no-anim");
    const onVisibility = () => {
      if (!d.hidden)
        setTimeout(() => d.documentElement.classList.remove("no-anim"), 60);
    };
    d.addEventListener("visibilitychange", onVisibility);

    // --- Stroke measurement -------------------------------------------
    function measureStrokes(scope: ParentNode) {
      const paths = scope.querySelectorAll<SVGPathElement>(".fig .draw");
      paths.forEach((el) => {
        if (el.dataset.len) return;
        let len: number;
        try {
          len = (el as unknown as SVGGeometryElement).getTotalLength();
        } catch {
          len = 0;
        }
        if (!len || !isFinite(len)) {
          let bb: DOMRect | null = null;
          try {
            bb = (el as unknown as SVGGraphicsElement).getBBox();
          } catch {
            bb = null;
          }
          len = bb ? (bb.width + bb.height) * 2 : 0;
        }
        len = Math.ceil(len) + 2;
        el.dataset.len = String(len);
        el.style.strokeDasharray = len + " " + len;
        el.style.setProperty("--len", len + "px");
      });
    }
    measureStrokes(d);

    let ro: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver((entries) => {
        entries.forEach((en) => {
          en.target.querySelectorAll<HTMLElement>(".fig .draw").forEach((el) => {
            if (el.closest(".in")) return;
            delete el.dataset.len;
          });
          measureStrokes(en.target as ParentNode);
        });
      });
      d.querySelectorAll(".dia").forEach((n) => ro!.observe(n));
    }

    // --- Count-up -------------------------------------------------------
    function countUp(scope: Element | Document) {
      if (reduced.matches) return;
      const nodes: Element[] =
        "matches" in scope && (scope as Element).matches("[data-count]")
          ? [scope as Element]
          : Array.from(scope.querySelectorAll("[data-count]"));
      nodes.forEach((el) => {
        const node = el as HTMLElement;
        if (node.dataset.counted) return;
        node.dataset.counted = "1";
        const finalText = node.textContent || "";
        const m = finalText.match(/-?[\d.,]+/);
        if (!m) return;
        const target = parseFloat(m[0].replace(/,/g, ""));
        if (!isFinite(target) || target === 0) return;
        if (Math.abs(target) < 10) return;
        const from = Math.round(target * 0.7);
        const dec = (m[0].split(".")[1] || "").length;
        const pre = finalText.slice(0, m.index);
        const post = finalText.slice((m.index || 0) + m[0].length);
        let t0: number | null = null;
        const DUR = 800;
        const step = (t: number) => {
          if (t0 === null) t0 = t;
          const p = Math.min((t - t0) / DUR, 1);
          const v = (from + (target - from) * (1 - Math.pow(1 - p, 3))).toFixed(dec);
          node.textContent = pre + (dec ? v : Math.round(Number(v)).toLocaleString()) + post;
          if (p < 1) requestAnimationFrame(step);
          else node.textContent = finalText;
        };
        requestAnimationFrame(step);
      });
    }

    // --- Reveal -----------------------------------------------------------
    const STAGGER = 100;
    const CAP = 6;
    const items = Array.from(d.querySelectorAll<HTMLElement>("[data-rv]"));
    const settleStrokes = (el: Element) => {
      setTimeout(() => {
        el.querySelectorAll<SVGPathElement>(".fig .draw").forEach((p) => {
          if ((parseFloat(getComputedStyle(p).strokeDashoffset) || 0) > 0.5) {
            p.style.strokeDashoffset = "0px";
          }
        });
      }, 2200);
    };
    const showAll = () => {
      items.forEach((el) => {
        el.classList.add("in");
        settleStrokes(el);
        countUp(el);
      });
    };

    let io: IntersectionObserver | null = null;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let onVisibilityReveal: (() => void) | null = null;

    if (reduced.matches || !("IntersectionObserver" in window) || d.hidden) {
      showAll();
    } else {
      d.querySelectorAll("[data-rv-group]").forEach((g) => {
        Array.from(g.querySelectorAll<HTMLElement>("[data-rv]")).forEach((el, i) => {
          el.style.setProperty("--d", Math.min(i, CAP - 1) * STAGGER + "ms");
        });
      });
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            en.target.classList.add("in");
            io!.unobserve(en.target);
            settleStrokes(en.target);
            countUp(en.target);
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
      );
      items.forEach((el) => io!.observe(el));

      timers.push(
        setTimeout(() => {
          items.forEach((el) => {
            if (el.classList.contains("in")) return;
            if (el.getBoundingClientRect().top < innerHeight * 1.25) {
              el.classList.add("in");
              io!.unobserve(el);
              settleStrokes(el);
              countUp(el);
            }
          });
        }, 1400)
      );

      timers.push(
        setTimeout(() => {
          d.querySelectorAll<SVGPathElement>(".fig .draw").forEach((p) => {
            if (parseFloat(p.style.strokeDashoffset) > 0.5 && p.closest(".in")) {
              p.style.strokeDashoffset = "0px";
            }
          });
        }, 4000)
      );

      onVisibilityReveal = () => {
        if (d.hidden) return;
        timers.push(
          setTimeout(() => {
            items.forEach((el) => {
              if (!el.classList.contains("in") && el.getBoundingClientRect().top < innerHeight) {
                el.classList.add("in");
                io!.unobserve(el);
                settleStrokes(el);
                countUp(el);
              }
            });
          }, 100)
        );
      };
      d.addEventListener("visibilitychange", onVisibilityReveal);
    }

    // --- Expandable rows ----------------------------------------------
    const rowCleanups: Array<() => void> = [];
    d.querySelectorAll<HTMLButtonElement>("[data-row-btn]").forEach((btn) => {
      const p = d.getElementById(btn.getAttribute("aria-controls") || "");
      if (!p) return;
      const onClick = () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        if (reduced.matches) {
          p.style.height = open ? "0px" : "auto";
          return;
        }
        if (open) {
          p.style.height = p.scrollHeight + "px";
          void p.offsetHeight;
          p.style.height = "0px";
        } else {
          p.style.height = p.scrollHeight + "px";
          let done = false;
          const release = () => {
            if (done) return;
            done = true;
            p.style.height = "auto";
            p.removeEventListener("transitionend", onEnd);
          };
          const onEnd = (e: TransitionEvent) => {
            if (e.propertyName === "height") release();
          };
          p.addEventListener("transitionend", onEnd);
          setTimeout(release, 400);
        }
      };
      btn.addEventListener("click", onClick);
      rowCleanups.push(() => btn.removeEventListener("click", onClick));
    });

    // --- Contact intent segmenter ---------------------------------------
    const segCleanups: Array<() => void> = [];
    d.querySelectorAll<HTMLElement>("[data-seg]").forEach((seg) => {
      const topic = d.getElementById("topic") as HTMLInputElement | null;
      const note = d.querySelector<HTMLElement>("[data-seg-note]");
      const NOTES: Record<string, string> = {
        invest: "Investor enquiries reach Arshad directly. Materials are shared under NDA.",
        build: "Partnership and operator enquiries — expect a reply within two business days.",
        advisory: "Advisory enquiries are answered personally. Two concurrent client slots.",
      };
      seg.querySelectorAll<HTMLButtonElement>("button").forEach((b) => {
        const onClick = () => {
          seg.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", "false"));
          b.setAttribute("aria-pressed", "true");
          if (topic) topic.value = b.dataset.value || "";
          if (note) note.textContent = NOTES[b.dataset.key || ""] || "";
        };
        b.addEventListener("click", onClick);
        segCleanups.push(() => b.removeEventListener("click", onClick));
      });
    });

    // --- Scrollable table hint --------------------------------------------
    const tableCleanups: Array<() => void> = [];
    const updateTable = (card: HTMLElement, scroll: HTMLElement) => {
      const scrollable = scroll.scrollWidth > scroll.clientWidth + 1;
      card.setAttribute("data-scrollable", String(scrollable));
      const atEnd = scroll.scrollLeft + scroll.clientWidth >= scroll.scrollWidth - 1;
      card.setAttribute("data-at-end", String(atEnd));
    };
    let tableRO: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      tableRO = new ResizeObserver((entries) => {
        entries.forEach((en) => {
          const scroll = en.target as HTMLElement;
          const card = scroll.closest<HTMLElement>(".tablecard, .scrollfade");
          if (card) updateTable(card, scroll);
        });
      });
    }
    d.querySelectorAll<HTMLElement>(".tablecard, .scrollfade").forEach((card) => {
      const scroll = card.querySelector<HTMLElement>(".tablecard__scroll");
      if (!scroll) return;
      const onScroll = () => updateTable(card, scroll);
      scroll.addEventListener("scroll", onScroll, { passive: true });
      tableCleanups.push(() => scroll.removeEventListener("scroll", onScroll));
      updateTable(card, scroll);
      tableRO?.observe(scroll);
    });

    // --- Footer live clock ------------------------------------------------
    let clockInterval: ReturnType<typeof setInterval> | undefined;
    const clock = d.querySelector<HTMLElement>("[data-clock]");
    if (clock) {
      const tick = () => {
        const n = new Date();
        const p = (v: number) => String(v).padStart(2, "0");
        clock.textContent = `${p(n.getUTCHours())}:${p(n.getUTCMinutes())}:${p(n.getUTCSeconds())} UTC`;
      };
      tick();
      if (!reduced.matches) clockInterval = setInterval(tick, 1000);
    }

    return () => {
      d.removeEventListener("visibilitychange", onVisibility);
      if (onVisibilityReveal) d.removeEventListener("visibilitychange", onVisibilityReveal);
      timers.forEach(clearTimeout);
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      if (clockInterval) clearInterval(clockInterval);
      rowCleanups.forEach((fn) => fn());
      segCleanups.forEach((fn) => fn());
      tableCleanups.forEach((fn) => fn());
      if (tableRO) tableRO.disconnect();
    };
  }, [pathname]);

  return null;
}
