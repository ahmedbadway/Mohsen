import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CaretLeft, CaretRight, X, Play } from '@phosphor-icons/react'

/**
 * ProjectAlbum — a lightbox that opens over the Projects grid and lets the
 * viewer browse a project's gallery like a photo album. The media strip is
 * every gallery image followed by the walkthrough video as the final slide.
 *
 * Renders nothing until a `project` is passed in; `onClose` clears it. The
 * dialog traps focus intent, closes on Escape / backdrop click, and locks
 * page scroll while open.
 */
export default function ProjectAlbum({ project, onClose }) {
  const [active, setActive] = useState(0)
  const dialogRef = useRef(null)

  // Build the ordered media list: gallery images, then the video. Guarded so
  // hooks below can run unconditionally even when no project is open.
  const base = import.meta.env.BASE_URL
  const media = project
    ? [
        ...project.gallery.map((file, i) => ({
          type: 'image',
          src: `${base}assets/images/${project.slug}/${file}`,
          label: `Photo ${i + 1}`,
        })),
        {
          type: 'video',
          src: `${base}assets/videos/${project.video}`,
          label: 'Film',
        },
      ]
    : []

  // Reset to the first slide each time a new album opens.
  useEffect(() => {
    setActive(0)
  }, [project])

  // Lock body scroll and move focus into the dialog while open.
  useEffect(() => {
    if (!project) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [project])

  // Keyboard: Escape closes, arrows navigate.
  useEffect(() => {
    if (!project) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight')
        setActive((i) => Math.min(i + 1, media.length - 1))
      else if (e.key === 'ArrowLeft') setActive((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, media.length, onClose])

  const go = (dir) =>
    setActive((i) => Math.min(Math.max(i + dir, 0), media.length - 1))

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close album"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} — project album`}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ type: 'spring', stiffness: 240, damping: 28 }}
            className="relative grid max-h-[90vh] w-full max-w-6xl overflow-hidden border hairline bg-jungle shadow-2xl outline-none lg:grid-cols-[1.6fr_1fr]"
          >
            {/* Media stage */}
            <div className="relative flex flex-col bg-black/40">
              <div className="relative flex min-h-0 flex-1 items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    {media[active].type === 'image' ? (
                      <img
                        src={media[active].src}
                        alt={`${project.title} — ${media[active].label}`}
                        className="max-h-[54vh] w-full object-contain lg:max-h-[80vh]"
                      />
                    ) : (
                      <video
                        src={media[active].src}
                        controls
                        playsInline
                        aria-label={`${project.title} — walkthrough film`}
                        className="max-h-[54vh] w-full object-contain lg:max-h-[80vh]"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Prev / Next */}
                {active > 0 && (
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous item"
                    className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center border hairline bg-jungle/80 text-intense-white transition-colors hover:bg-feldgrau"
                  >
                    <CaretLeft size={18} weight="bold" />
                  </button>
                )}
                {active < media.length - 1 && (
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next item"
                    className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center border hairline bg-jungle/80 text-intense-white transition-colors hover:bg-feldgrau"
                  >
                    <CaretRight size={18} weight="bold" />
                  </button>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto border-t hairline p-3">
                {media.map((m, i) => (
                  <button
                    key={m.src}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Go to ${m.label}`}
                    aria-current={i === active}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden border transition-opacity ${
                      i === active
                        ? 'border-silver opacity-100'
                        : 'hairline opacity-60 hover:opacity-100'
                    }`}
                  >
                    {m.type === 'image' ? (
                      <img
                        src={m.src}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="grid h-full w-full place-items-center bg-black/50 text-intense-white">
                        <Play size={18} weight="fill" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Details rail */}
            <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-silver">
                  {project.category} &middot; {project.year}
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-intense-white">
                  {project.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-silver">
                  {project.details || project.description}
                </p>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-feldgrau">
                {active + 1} / {media.length} &middot; {media[active].label}
              </p>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close album"
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center border hairline bg-jungle/80 text-intense-white transition-colors hover:bg-feldgrau"
            >
              <X size={18} weight="bold" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
