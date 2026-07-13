import { motion } from 'motion/react'
import ProjectCard from '../components/ProjectCard.jsx'
import { pageVariants, pageTransition } from '../utils/motion.js'

// Placeholder project data. SVGs live in /public/assets and are named
// project-01..06.svg for easy manual replacement with real photos later.
// `details` is the longer copy revealed on the back of the flip card.
const projects = [
  {
    image: 'project-01.svg',
    title: 'Living Room 2023',
    category: 'Residential',
    year: '2023',
    description:
      'A warm, minimal residential lounge balancing natural light with quiet material contrast.',
    details:
      'A residential lounge organised around a single axis of daylight. Warm timber, matte stone and layered lighting create a calm, tactile room that shifts character from morning to evening.',
  },
  {
    image: 'project-02.svg',
    title: 'Coastal Villa',
    category: 'Residential',
    year: '2022',
    description:
      'Open-plan volumes framing the horizon, where interior and landscape read as one.',
    details:
      'Open-plan living volumes step down toward the shoreline, framing the horizon through full-height glazing. Interior and landscape are treated as one continuous material field.',
  },
  {
    image: 'project-03.svg',
    title: 'Studio Loft',
    category: 'Interior',
    year: '2023',
    description:
      'A compact urban workspace organised around a central circulation spine.',
    details:
      'A compact live-work loft planned around a central spine that separates focus from rest. Built-in joinery keeps the footprint efficient without sacrificing openness.',
  },
  {
    image: 'project-04.svg',
    title: 'Boutique Retail',
    category: 'Commercial',
    year: '2024',
    description:
      'Geometric display architecture that lets the product take the lead.',
    details:
      'A boutique interior where geometric display volumes recede so the product reads first. Concealed lighting and a restrained palette give the space a quiet, gallery-like presence.',
  },
  {
    image: 'project-05.svg',
    title: 'Garden Residence',
    category: 'Residential',
    year: '2022',
    description:
      'A family home layered around courtyards, shade and cross-ventilation.',
    details:
      'A family home layered around planted courtyards that pull shade and cross-ventilation deep into the plan — a passive response to the local climate that keeps interiors cool.',
  },
  {
    image: 'project-06.svg',
    title: 'Office Interior',
    category: 'Commercial',
    year: '2023',
    description:
      'A calm, focused environment designed for collaboration and long working hours.',
    details:
      'A workplace interior tuned for long hours and quiet collaboration. Acoustic zoning, soft task lighting and biophilic touches support focus across an open floorplate.',
  },
]

export default function Projects() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="mx-auto max-w-content px-6 py-20"
    >
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-silver">
          Selected Work
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-intense-white sm:text-5xl">
          Projects
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-silver">
          A selection of architectural and interior work. Tap any card to flip
          it and read the project details. Imagery is placeholder and will be
          replaced with completed project photography.
        </p>
      </header>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.image} index={i} {...p} />
        ))}
      </div>
    </motion.div>
  )
}
