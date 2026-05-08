import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Trip } from "@/lib/types";

interface BudgetSectionProps {
  trip: Trip;
}

export default function BudgetSection({ trip }: BudgetSectionProps) {
  const max = Math.max(...trip.budget.map((b) => b.amt));
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [count, setCount] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setShown(true);
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shown) return;
    const target = trip.budgetTotal.hi;
    if (prefersReduced) {
      setCount(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.round(target * (0.2 + 0.8 * p)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, trip.budgetTotal.hi, prefersReduced]);

  return (
    <section
      ref={ref}
      style={{
        padding: "60px 0 40px",
        background: "var(--cream)",
        borderTop: "2px solid var(--ink)",
        borderBottom: "2px solid var(--ink)",
        margin: "20px 0",
        position: "relative",
      }}
    >
      <div className="case-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <div>
            <div
              className="t-mono"
              style={{ fontSize: 11, letterSpacing: "0.32em", color: "var(--wine)" }}
            >
              § 03 · FINANCIAL DISCLOSURE
            </div>
            <h2 className="t-display" style={{ fontSize: 64, margin: "4px 0 0" }}>
              THE MONEY, IN BARS.
            </h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              className="t-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "var(--ink-soft)",
              }}
            >
              RUNNING ESTIMATE · COUPLE · 8 DAYS
            </div>
            <div
              className="t-display"
              style={{
                fontSize: 96,
                color: "var(--wine)",
                lineHeight: 1,
                textShadow: "3px 3px 0 var(--amber)",
              }}
            >
              {count.toLocaleString()}
              <span style={{ fontSize: 28, color: "var(--ink)", marginLeft: 8 }}>DKK</span>
            </div>
            <div
              className="t-typewriter"
              style={{ fontSize: 12, color: "var(--ink-soft)" }}
            >
              range: {trip.budgetTotal.lo.toLocaleString()} –{" "}
              {trip.budgetTotal.hi.toLocaleString()} DKK
            </div>
          </div>
        </div>

        <div
          className="budget-grid"
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gap: 36,
          }}
        >
          <div>
            {trip.budget.map((b, i) => {
              const w = shown ? (b.amt / max) * 100 : 0;
              return (
                <div key={b.cat} style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 4,
                    }}
                  >
                    <span className="t-typewriter" style={{ fontSize: 13 }}>
                      {b.cat}
                    </span>
                    <span
                      className="t-mono"
                      style={{ fontSize: 12, color: "var(--wine)" }}
                    >
                      {b.amt.toLocaleString()} DKK
                    </span>
                  </div>
                  <div
                    style={{
                      height: 14,
                      background: "var(--manila)",
                      border: "1.5px solid var(--ink)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${w}%`,
                        height: "100%",
                        background:
                          i % 3 === 0
                            ? "var(--wine)"
                            : i % 3 === 1
                            ? "var(--amber)"
                            : "var(--teal)",
                        transition: prefersReduced
                          ? "none"
                          : `width 900ms cubic-bezier(0.2, 0.7, 0.2, 1) ${i * 70}ms`,
                        backgroundImage:
                          "repeating-linear-gradient(135deg, rgba(255,255,255,0.18) 0 6px, transparent 6px 12px)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <div
              style={{
                background: "var(--paper)",
                border: "2px solid var(--ink)",
                padding: 18,
                boxShadow: "5px 5px 0 var(--ink)",
                transform: "rotate(0.6deg)",
              }}
            >
              <div
                className="t-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  color: "var(--wine)",
                }}
              >
                ▌ SAVING TIPS — BURN AFTER READING
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0" }}>
                {[
                  "Cook 5–6 dinners in: ~800 DKK off the bill.",
                  "Skip the rental car: ~500 DKK off, but lose Langhe flexibility.",
                  "Torino+Piemonte Card if you hit 4+ sites — 200–400 DKK saved.",
                  "Pack lunch for day trips. The view is the restaurant.",
                ].map((t) => (
                  <li
                    key={t}
                    className="t-typewriter"
                    style={{
                      fontSize: 13,
                      padding: "5px 0",
                      borderBottom: "1px dotted var(--pencil)",
                    }}
                  >
                    → {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="intel" style={{ marginTop: 20 }}>
              Excludes flights and accommodation — those are already booked, off-budget, and
              frankly nobody's business.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
