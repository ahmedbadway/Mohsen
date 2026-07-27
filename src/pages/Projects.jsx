import { useState } from 'react'
import { motion } from 'motion/react'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectAlbum from '../components/ProjectAlbum.jsx'
import { pageVariants, pageTransition } from '../utils/motion.js'
import PageMeta from '../components/PageMeta.jsx'

// Placeholder project data. Each project owns a folder under
// /public/assets/images/<slug>/ with a `cover` image plus a `gallery` of
// interior shots. `video` is a shared placeholder clip for now — give a
// project its own film by dropping the file in /public/assets/videos/ and
// pointing its `video` field at that filename. `details` is the copy shown
// inside the album.
const gallery = ['01.svg', '02.svg', '03.svg', '04.svg', '05.svg']
const placeholderVideo = 'hero-bg.mp4'

const projects = [
  {
    slug: 'project-01',
    cover: 'cover.svg',
    gallery,
    video: placeholderVideo,
    title: 'Living Room 2023',
    category: 'Residential',
    year: '2023',
    details:
      'A residential lounge organised around a single axis of daylight. Warm timber, matte stone and layered lighting create a calm, tactile room that shifts character from morning to evening.',
  },
  {
    slug: 'project-02',
    cover: 'cover.svg',
    gallery,
    video: placeholderVideo,
    title: 'Coastal Villa',
    category: 'Residential',
    year: '2022',
    details:
      'Open-plan living volumes step down toward the shoreline, framing the horizon through full-height glazing. Interior and landscape are treated as one continuous material field.',
  },
  {
    slug: 'project-03',
    cover: 'cover.svg',
    gallery,
    video: placeholderVideo,
    title: 'Studio Loft',
    category: 'Interior',
    year: '2023',
    details:
      'A compact live-work loft planned around a central spine that separates focus from rest. Built-in joinery keeps the footprint efficient without sacrificing openness.',
  },
  {
    slug: 'project-04',
    cover: 'cover.svg',
    gallery,
    video: placeholderVideo,
    title: 'Boutique Retail',
    category: 'Commercial',
    year: '2024',
    details:
      'A boutique interior where geometric display volumes recede so the product reads first. Concealed lighting and a restrained palette give the space a quiet, gallery-like presence.',
  },
  {
    slug: 'project-05',
    cover: 'cover.svg',
    gallery,
    video: placeholderVideo,
    title: 'Garden Residence',
    category: 'Residential',
    year: '2022',
    details:
      'A family home layered around planted courtyards that pull shade and cross-ventilation deep into the plan — a passive response to the local climate that keeps interiors cool.',
  },
  {
    slug: 'project-06',
    cover: 'cover.svg',
    gallery,
    video: placeholderVideo,
    title: 'Office Interior',
    category: 'Commercial',
    year: '2023',
    details:
      'A workplace interior tuned for long hours and quiet collaboration. Acoustic zoning, soft task lighting and biophilic touches support focus across an open floorplate.',
  },
]

export default function Projects() {
  // Index of the project whose album is open, or null when nothing is open.
  const [openIndex, setOpenIndex] = useState(null)
  const activeProject = openIndex === null ? null : projects[openIndex]

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="mx-auto max-w-content px-6 py-20"
    >
      <PageMeta
        title="Projects — Hosni Architecture Studio"
        description="Selected architectural and interior projects by Hosni Architecture Studio: residential, commercial and interior work across Egypt."
        path="/projects"
      />

      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-silver">
          Selected Work
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-intense-white sm:text-5xl">
          Projects
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-silver">
          A selection of architectural and interior work. Tap any card to open
          its album and browse the project photography and walkthrough film.
          Imagery is placeholder and will be replaced with completed work.
        </p>
      </header>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} index={i} onOpen={setOpenIndex} {...p} />
        ))}
      </div>

      <ProjectAlbum
        project={activeProject}
        onClose={() => setOpenIndex(null)}
      />
    </motion.div>
  )
}
