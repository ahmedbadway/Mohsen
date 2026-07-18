import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowsClockwise, ArrowLeft } from '@phosphor-icons/react'

/**
 * Project card with a 3D flip interaction. The front shows the project image
 * and title; tapping/clicking flips the card 180° to reveal details on the
 * back. Fully keyboard-accessible (it's a button; Enter/Space toggle it).
 *
 * The 3D properties (perspective, preserve-3d, backface-visibility) are set
 * via Tailwind arbitrary classes so Autoprefixer adds the -webkit- prefixes
 * iOS Safari needs.
 */
export default function ProjectCard({
  image,
  title,
  description,
  details,
  category,
  year,
  index = 0,
}) {
  const [flipped, setFlipped] = useState(false)
  const src = `${import.meta.env.BASE_URL}assets/images/${image}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        delay: (index % 3) * 0.08,
        type: 'spring',
        stiffness: 260,
        damping: 30,
      }}
      className="[perspective:1600px]"
    >
      <motion.button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={
          flipped ? `Hide details for ${title}` : `Show details for ${title}`
        }
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        className="group relative block aspect-[4/5] w-full cursor-pointer text-left [transform-style:preserve-3d]"
      >
        {/* Front */}
        <span className="absolute inset-0 flex flex-col overflow-hidden border hairline bg-jungle/10 [backface-visibility:hidden]">
          <img
            src={src}
            alt={`${title} — project preview`}
            loading="lazy"
            className="min-h-0 w-full flex-1 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
          <span className="flex items-center justify-between gap-3 p-6">
            <span className="flex flex-col">
              <span className="font-display text-lg font-semibold text-intense-white">
                {title}
              </span>
              <span className="mt-1 text-xs uppercase tracking-[0.2em] text-feldgrau">
                {category} &middot; {year}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-silver">
              <ArrowsClockwise size={16} weight="bold" />
              Details
            </span>
          </span>
        </span>

        {/* Back */}
        <span className="absolute inset-0 flex flex-col justify-between border hairline bg-jungle/30 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-silver">
              {category} &middot; {year}
            </span>
            <span className="mt-3 block font-display text-xl font-semibold text-intense-white">
              {title}
            </span>
            <span className="mt-4 block text-sm leading-relaxed text-silver">
              {details || description}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-feldgrau">
            <ArrowLeft size={16} weight="bold" />
            Tap to flip back
          </span>
        </span>
      </motion.button>
    </motion.div>
  )
}
