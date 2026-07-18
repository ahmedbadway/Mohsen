import { Link } from 'react-router-dom'

// External logo file. Swap public/assets/images/logo.jpeg with your own
// artwork (same name) — it renders at a fixed height so any replacement
// keeps the same navbar size automatically.
const logoSrc = `${import.meta.env.BASE_URL}assets/images/logo.jpeg`

/**
 * Hosni Architecture Studio logotype. Rendered from an external SVG file so
 * the artwork can be replaced without touching the code. The optional
 * sublabel "ARCHITECTURE & INTERIOR DESIGN STUDIO" appears under the mark
 * on request (used in the footer).
 */
export default function Logo({ withSub = false, onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Hosni Architecture Studio — home"
      className="group inline-flex flex-col leading-none"
    >
      <img
        src={logoSrc}
        alt="Hosni Architecture Studio"
        className="h-8 w-auto transition-opacity duration-300 group-hover:opacity-80"
      />
      {withSub && (
        <span className="mt-2 text-[0.58rem] font-medium uppercase tracking-[0.28em] text-silver">
          Architecture &amp; Interior Design Studio
        </span>
      )}
    </Link>
  )
}
