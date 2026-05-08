import type { CSSProperties } from "react";

interface TapeProps {
  style?: CSSProperties;
}

export default function Tape({ style }: TapeProps) {
  return <div className="tape" style={style} aria-hidden />;
}
