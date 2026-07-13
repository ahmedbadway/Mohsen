import { motion } from 'motion/react'
import ProjectCard from '../components/ProjectCard.jsx'

// Placeholder project data. SVGs live in /public/assets and are named
// project-01..06.svg for easy manual replacement with real photos later.
const projects = [
  {
    image: 'project-01.svg',
    title: 'Living Room 2023',
    description:
      'A warm, minimal residential lounge balancing natural light with quiet material contrast.',
  },
  {
    image: 'project-02.svg',
    title: 'Coastal Villa',
    description:
      'Open-plan volumes framing the horizon, where interior and landscape read as one.',
  },
  {
    image: 'project-03.svg',
    title: 'Studio Loft',
    description:
      'A compact urban workspace organised around a central circulation spine.',
  },
  {
    image: 'project-04.svg',
    title: 'Boutique Retail',
    description:
      'Geometric display architecture that lets the product take the lead.',
  },
  {
    image: 'project-05.svg',
    title: 'Garden Residence',
    description:
      'A family home layered around courtyards, shade and cross-ventilation.',
  },
  {
    image: 'project-06.svg',
    title: 'Office Interior',
    description:
      'A calm, focused environment designed for collaboration and long working hours.',
  },
]

export default function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
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
          A selection of architectural and interior work. Imagery shown here is
          placeholder and will be replaced with completed project photography.
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
