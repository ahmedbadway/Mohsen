import { useState } from 'react'
import { motion } from 'motion/react'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectAlbum from '../components/ProjectAlbum.jsx'
import projects from '../content/loadProjects.js'
import { pageVariants, pageTransition } from '../utils/motion.js'
import PageMeta from '../components/PageMeta.jsx'

// Project content lives in src/content/projects/<NN>/ — one folder per project
// with an info.txt and its images. The client edits those directly on GitHub;
// `loadProjects` assembles them at build time (see src/content/loadProjects.js).

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
