import type { CSSProperties } from "react";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function Image({ src, alt, width, height, priority, className, style }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      // @ts-expect-error fetchpriority is valid HTML, not yet in React types
      fetchpriority={priority ? "high" : undefined}
      style={{
        display: "block",
        width: "100%",
        height: "auto",
        aspectRatio: `${width} / ${height}`,
        ...style,
      }}
    />
  );
}
