import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Trip } from "@/lib/types";
import SectionHead from "@/components/trip/SectionHead";

interface BudgetSectionProps {
  trip: Trip;
}

export default function BudgetSection({ trip }: BudgetSectionProps) {
  const max = Math.max(...trip.budget.map((b) => b.amt));
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const t = window.setTimeout(() => setShown(true), 1000);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, []);

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
            <SectionHead eyebrow="BUDGET" title="Budget" />
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
              FIXED COSTS · COUPLE · 8 DAYS
            </div>
            <div
              className="t-display"
              style={{
                fontSize: 44,
                color: "var(--wine)",
                lineHeight: 1.05,
                textShadow: "3px 3px 0 var(--amber)",
                maxWidth: 360,
              }}
            >
              {trip.budgetTotalDkk}
            </div>
            <div
              className="t-typewriter"
              style={{ fontSize: 12, color: "var(--ink-soft)" }}
            >
              transit, museum tickets &amp; day-trip travel only
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
                  "This figure is fixed costs only — transit, tickets and day-trip trains. Food and drinks aren't counted.",
                  "Buy the Avigliana train + shuttle as a BUNDLE in the Trenitalia app — cheaper than separate tickets.",
                  "A multi-day GTT pass can beat single tickets once you ride the metro and buses every day.",
                  "Refill at the free toret fountains instead of buying water on the go.",
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
