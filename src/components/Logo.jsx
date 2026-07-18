import { Link } from 'react-router-dom'

// External logo file (transparent PNG). Swap public/assets/images/logo.png
// with your own artwork (same name) — it renders at a fixed height so any
// replacement keeps the same size automatically.
const logoSrc = `${import.meta.env.BASE_URL}assets/images/logo.png`

/**
 * Hosni Architecture Studio logo, loaded from an external file so the
 * artwork can be replaced without touching the code. `self-start` stops
 * flex-column parents (like the footer) from stretching the image.
 */
export default function Logo({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Hosni Architecture Studio — home"
      className="group inline-flex"
    >
      <img
        src={logoSrc}
        alt="Hosni Architecture Studio"
        className="h-11 w-auto self-start transition-opacity duration-300 group-hover:opacity-80"
      />
    </Link>
  )
}
