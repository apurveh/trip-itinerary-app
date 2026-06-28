import type { IconName } from "@/lib/types";

/**
 * IconSprite — mount ONCE near the root (App.tsx).
 * All 10 symbols on a 16×16 viewBox, paths snapped to integer grid.
 * fill="currentColor" → inherits ink from parent; shape-rendering:crispEdges on Icon.
 */
export function IconSprite() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
    >
      <defs>
        {/* ticket — perforated stub with notch divider */}
        <symbol id="i-ticket" viewBox="0 0 16 16">
          <path d="M2 4h12v3H13v2h1v3H2v-3h1V7H2z" fill="currentColor" />
        </symbol>

        {/* market — awning with scalloped bottom + stall counter + legs */}
        <symbol id="i-market" viewBox="0 0 16 16">
          <rect x="0" y="2" width="16" height="3" fill="currentColor" />
          {/* Four scallop triangles hanging below awning stripe */}
          <path
            d="M0 5h4l-2 3zM4 5h4l-2 3zM8 5h4l-2 3zM12 5h4l-2 3z"
            fill="currentColor"
          />
          <rect x="1" y="9" width="14" height="4" fill="currentColor" />
          <rect x="2" y="13" width="2" height="2" fill="currentColor" />
          <rect x="12" y="13" width="2" height="2" fill="currentColor" />
        </symbol>

        {/* transit — tram/train: tall body, two windows (holes), wheels */}
        <symbol id="i-transit" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M2 1h12v11H2z M4 3h3v3H4z M9 3h3v3H9z"
            fill="currentColor"
          />
          <rect x="2" y="13" width="4" height="2" fill="currentColor" />
          <rect x="10" y="13" width="4" height="2" fill="currentColor" />
        </symbol>

        {/* shuttle — bus: wide body, windshield extension, three windows (holes), wheels */}
        <symbol id="i-shuttle" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M0 4h14v9H0z M14 6h2v5h-2z M2 6h2v4H2z M6 6h2v4H6z M10 6h2v4H10z"
            fill="currentColor"
          />
          <rect x="1" y="13" width="4" height="2" fill="currentColor" />
          <rect x="9" y="13" width="4" height="2" fill="currentColor" />
        </symbol>

        {/* flight — side-view aircraft: fuselage + pointed nose + wings + tail */}
        <symbol id="i-flight" viewBox="0 0 16 16">
          {/* fuselage */}
          <rect x="0" y="7" width="14" height="2" fill="currentColor" />
          {/* pointed nose */}
          <path d="M14 6L16 8L14 10Z" fill="currentColor" />
          {/* main wings */}
          <rect x="5" y="2" width="4" height="5" fill="currentColor" />
          <rect x="5" y="9" width="4" height="5" fill="currentColor" />
          {/* tail fins */}
          <rect x="0" y="5" width="2" height="6" fill="currentColor" />
        </symbol>

        {/* viewpoint — mountain with snow-cap cutout */}
        <symbol id="i-viewpoint" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M8 1L15 15H1Z M6 9L8 4L10 9Z"
            fill="currentColor"
          />
        </symbol>

        {/* food — fork (3 tines + handle) left + knife (blade+handle) right */}
        <symbol id="i-food" viewBox="0 0 16 16">
          {/* fork tines */}
          <rect x="2" y="1" width="1" height="5" fill="currentColor" />
          <rect x="4" y="1" width="1" height="5" fill="currentColor" />
          <rect x="6" y="1" width="1" height="5" fill="currentColor" />
          {/* fork join bar */}
          <rect x="2" y="5" width="5" height="1" fill="currentColor" />
          {/* fork handle */}
          <rect x="4" y="6" width="1" height="9" fill="currentColor" />
          {/* knife blade */}
          <rect x="10" y="1" width="2" height="6" fill="currentColor" />
          {/* knife handle */}
          <rect x="11" y="7" width="1" height="8" fill="currentColor" />
        </symbol>

        {/* hydration — water drop teardrop polygon */}
        <symbol id="i-hydration" viewBox="0 0 16 16">
          <path d="M8 1L12 7V11L8 15L4 11V7Z" fill="currentColor" />
        </symbol>

        {/* sun-arc — disc + 4 cardinal rays + 4 diagonal corner dots */}
        <symbol id="i-sun-arc" viewBox="0 0 16 16">
          {/* centre disc */}
          <rect x="6" y="6" width="4" height="4" fill="currentColor" />
          {/* cardinal rays */}
          <rect x="7" y="1" width="2" height="4" fill="currentColor" />
          <rect x="7" y="11" width="2" height="4" fill="currentColor" />
          <rect x="1" y="7" width="4" height="2" fill="currentColor" />
          <rect x="11" y="7" width="4" height="2" fill="currentColor" />
          {/* diagonal corner dots */}
          <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          <rect x="12" y="2" width="2" height="2" fill="currentColor" />
          <rect x="2" y="12" width="2" height="2" fill="currentColor" />
          <rect x="12" y="12" width="2" height="2" fill="currentColor" />
        </symbol>

        {/* map-pin — hollow square head (evenodd) + tapered stem to point */}
        <symbol id="i-map-pin" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M3 0h10v9H3z M5 2h6v5H5z"
            fill="currentColor"
          />
          <rect x="6" y="9" width="4" height="2" fill="currentColor" />
          <rect x="7" y="11" width="2" height="4" fill="currentColor" />
        </symbol>
      </defs>
    </svg>
  );
}

/**
 * Icon — renders a single SVG symbol by name.
 * Decorative by default (aria-hidden); pass `title` for accessible label.
 * Always pair with a visible text label in UI.
 */
export default function Icon({
  name,
  size = 16,
  title,
}: {
  name: IconName;
  size?: number;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      style={{
        shapeRendering: "crispEdges",
        display: "inline-block",
        verticalAlign: "-0.15em",
      }}
    >
      {title && <title>{title}</title>}
      <use href={`#i-${name}`} />
    </svg>
  );
}
