import type { ReactNode } from "react";
import type { Tone } from "@/lib/types";

interface StickerProps {
  children: ReactNode;
  tone?: Tone;
  rotate?: number;
}

export default function Sticker({ children, tone = "ink", rotate = -3 }: StickerProps) {
  return (
    <span className={`sticker ${tone}`} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </span>
  );
}
