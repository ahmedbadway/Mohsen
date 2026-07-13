import { Link } from 'react-router-dom'

/**
 * HOSNI© logotype. Rendered as a styled Sora-bold wordmark (geometric,
 * hard-edged) rather than a vector, per the brief. The optional sublabel
 * "ARCHITECTURE & INTERIOR DESIGN STUDIO" appears under the mark on request.
 */
export default function Logo({ withSub = false, onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Hosni Arc Studio — home"
      className="group inline-flex flex-col leading-none"
    >
      <span className="flex items-start font-display font-extrabold tracking-[0.14em] text-intense-white">
        <span className="text-2xl transition-colors duration-300 group-hover:text-silver">
          HOSNI
        </span>
        <span className="ml-1 mt-0.5 text-[0.6rem] font-semibold text-silver">
          &copy;
        </span>
      </span>
      {withSub && (
        <span className="mt-2 text-[0.58rem] font-medium uppercase tracking-[0.28em] text-silver">
          Architecture &amp; Interior Design Studio
        </span>
      )}
    </Link>
  )
}
