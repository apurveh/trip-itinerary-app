import type { Traveler } from "@/lib/types";

interface AvatarProps {
  traveler: Traveler;
  size?: number;
}

/**
 * Deterministic variant selector — 0 or 1 — from traveler name.
 * Apurva (len 6, even) → 0  |  Clara (len 5, odd) → 1
 * Any future traveler gets a predictable, stable result.
 */
function getVariant(name: string): 0 | 1 {
  return (name.length % 2) as 0 | 1;
}

/**
 * Variant 0: wide/bushy hair (extends beyond head width), crew neck.
 * Reads as "broad top silhouette" — the hair sticks out on both sides of the head.
 */
function PortraitA() {
  return (
    <>
      {/* Wide hair block — protrudes past head on both sides */}
      <rect x="2" y="0" width="12" height="3" fill="currentColor" />
      {/* Head with evenodd eye cutouts */}
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M4 2H12V10H4Z M5 4H7V6H5Z M9 4H11V6H9Z"
      />
      {/* Neck */}
      <rect x="7" y="10" width="2" height="2" fill="currentColor" />
      {/* Shoulders — straight crewneck */}
      <rect x="2" y="12" width="12" height="4" fill="currentColor" />
    </>
  );
}

/**
 * Variant 1: narrow hair on top, long side-strands flanking the head, V-collar.
 * Reads as "side-hair silhouette" — the flanking strands extend down alongside the face.
 */
function PortraitB() {
  return (
    <>
      {/* Narrow hair top */}
      <rect x="5" y="0" width="6" height="2" fill="currentColor" />
      {/* Long side strands — flank the head on both sides */}
      <rect x="3" y="2" width="2" height="8" fill="currentColor" />
      <rect x="11" y="2" width="2" height="8" fill="currentColor" />
      {/* Head with evenodd eye cutouts */}
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M4 2H12V10H4Z M5 4H7V6H5Z M9 4H11V6H9Z"
      />
      {/* Neck */}
      <rect x="7" y="10" width="2" height="2" fill="currentColor" />
      {/* Shoulders with V-collar cutout */}
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M2 12H14V16H2Z M7 12L8 14L9 12Z"
      />
    </>
  );
}

/**
 * Avatar — stencil-grid ink portrait for a traveler.
 * Monochrome (fill="currentColor"), crispEdges, 16×16 viewBox.
 * Variant is deterministic from traveler.name (no color, no emoji).
 */
export default function Avatar({ traveler, size = 26 }: AvatarProps) {
  const variant = getVariant(traveler.name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden
      style={{ shapeRendering: "crispEdges", display: "block" }}
    >
      {variant === 0 ? <PortraitA /> : <PortraitB />}
    </svg>
  );
}
