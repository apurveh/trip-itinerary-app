import type { CSSProperties } from "react";
import type { Tone } from "@/lib/types";

interface PillProps {
  label: string;
  amt: string;
  tone?: Tone | "ink";
  style?: CSSProperties;
}

export default function Pill({ label, amt, tone = "amber", style }: PillProps) {
  return (
    <span className={`pill ${tone}`} style={style}>
      <span className="pill-label">{label}</span>
      <span className="pill-amt">· {amt}</span>
    </span>
  );
}
