/**
 * Decorative diagonal geometric lines — echoes the brand book's diagonal
 * motif. Purely presentational, hidden from assistive tech.
 */
export default function DiagonalDecor({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="var(--color-silver)" strokeOpacity="0.16" strokeWidth="1">
        <path d="M0 320 L400 80" />
        <path d="M0 360 L400 120" />
        <path d="M0 400 L400 160" />
        <path d="M240 0 L400 160" />
      </g>
    </svg>
  )
}
