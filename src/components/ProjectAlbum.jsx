import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react'
import { lockScroll, unlockScroll } from '../utils/scrollLock.js'

/**
 * ProjectAlbum — a lightbox that opens over the Projects grid and lets the
 * viewer browse a project's photos like an album.
 *
 * Renders nothing until a `project` is passed in; `onClose` clears it. The
 * dialog traps focus intent, closes on Escape / backdrop click, and locks
 * page scroll while open.
 */
export default function ProjectAlbum({ project, onClose }) {
  const [active, setActive] = useState(0)
  const dialogRef = useRef(null)

  // Photos to page through. Guarded so the hooks below can run unconditionally
  // even when no project is open.
  const photos = project?.gallery ?? []
  // Clamp so a stale index can never read past the end of a shorter album.
  const current = Math.min(active, Math.max(photos.length - 1, 0))

  // Reset to the first slide each time a new album opens.
  useEffect(() => {
    setActive(0)
  }, [project])

  // Lock body scroll and move focus into the dialog while open.
  useEffect(() => {
    if (!project) return undefined
    lockScroll()
    dialogRef.current?.focus()
    return unlockScroll
  }, [project])

  // Keyboard: Escape closes, arrows navigate.
  useEffect(() => {
    if (!project) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight')
        setActive((i) => Math.min(i + 1, photos.length - 1))
      else if (e.key === 'ArrowLeft') setActive((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, photos.length, onClose])

  const go = (dir) =>
    setActive((i) => Math.min(Math.max(i + dir, 0), photos.length - 1))

  return (
    <AnimatePresence>
      {project && photos.length > 0 && (
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
                  <motion.img
                    key={current}
                    src={photos[current]}
                    alt={`${project.title} — photo ${current + 1}`}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="max-h-[54vh] w-full object-contain lg:max-h-[80vh]"
                  />
                </AnimatePresence>

                {/* Prev / Next */}
                {current > 0 && (
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center border hairline bg-jungle/80 text-intense-white transition-colors hover:bg-feldgrau"
                  >
                    <CaretLeft size={18} weight="bold" />
                  </button>
                )}
                {current < photos.length - 1 && (
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center border hairline bg-jungle/80 text-intense-white transition-colors hover:bg-feldgrau"
                  >
                    <CaretRight size={18} weight="bold" />
                  </button>
                )}
              </div>

              {/* Thumbnails — only worth showing for a multi-photo album. */}
              {photos.length > 1 && (
                <div className="flex gap-2 overflow-x-auto border-t hairline p-3">
                  {photos.map((src, i) => (
                    <button
                      key={`${src}-${i}`}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Go to photo ${i + 1}`}
                      aria-current={i === current}
                      className={`relative h-14 w-20 shrink-0 overflow-hidden border transition-opacity ${
                        i === current
                          ? 'border-silver opacity-100'
                          : 'hairline opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
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
                  {project.details}
                </p>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-feldgrau">
                Photo {current + 1} / {photos.length}
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
