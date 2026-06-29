import type { CSSProperties, ReactNode } from "react";

interface StampProps {
  children: ReactNode;
  color?: string;
  rotate?: number;
  size?: "normal" | "large";
  className?: string;
  style?: CSSProperties;
}

export default function Stamp({
  children,
  color = "var(--wine)",
  rotate = -6,
  size = "normal",
  className = "",
  style,
}: StampProps) {
  return (
    <span
      className={`stamp ${size === "large" ? "large" : ""} ${className}`}
      style={{ color, transform: `rotate(${rotate}deg)`, ...style }}
    >
      {children}
    </span>
  );
}
