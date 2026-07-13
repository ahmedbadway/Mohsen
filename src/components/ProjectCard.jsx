import { motion } from 'motion/react'
import { ArrowUpRight } from 'phosphor-react'

/**
 * Project card — SVG placeholder image (swappable from /public/assets),
 * title and short description. `image` is a filename under assets/.
 */
export default function ProjectCard({ image, title, description, index = 0 }) {
  const src = `${import.meta.env.BASE_URL}assets/${image}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        delay: (index % 3) * 0.08,
        type: 'spring',
        stiffness: 260,
        damping: 30,
      }}
      className="group flex flex-col overflow-hidden border hairline bg-jungle/10 transition-colors duration-300 hover:bg-jungle/25"
    >
      <div className="relative overflow-hidden">
        <img
          src={src}
          alt={`${title} — project preview`}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-lg font-semibold text-intense-white">
            {title}
          </h3>
          <ArrowUpRight
            size={20}
            weight="bold"
            className="mt-0.5 shrink-0 text-feldgrau transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-silver"
          />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-silver">{description}</p>
      </div>
    </motion.article>
  )
}
