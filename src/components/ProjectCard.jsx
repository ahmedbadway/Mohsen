import { motion } from 'motion/react'
import { Images } from '@phosphor-icons/react'

/**
 * Project card. Shows the cover image and title; tapping/clicking opens the
 * project's album (a lightbox with the full gallery and video) via the
 * `onOpen` callback. Fully keyboard-accessible (it's a button, so Enter/Space
 * activate it).
 */
export default function ProjectCard({
  slug,
  cover,
  title,
  category,
  year,
  onOpen,
  index = 0,
}) {
  const src = `${import.meta.env.BASE_URL}assets/images/${slug}/${cover}`

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
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open album for ${title}`}
        className="group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden border hairline bg-jungle/10 text-left"
      >
        <img
          src={src}
          alt={`${title} — project cover`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
        {/* Gradient scrim keeps the caption legible over any photo. */}
        <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-6">
          <span className="flex flex-col">
            <span className="font-display text-lg font-semibold text-intense-white">
              {title}
            </span>
            <span className="mt-1 text-xs uppercase tracking-[0.2em] text-silver">
              {category} &middot; {year}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-silver">
            <Images size={16} weight="bold" />
            Album
          </span>
        </span>
      </button>
    </motion.div>
  )
}
