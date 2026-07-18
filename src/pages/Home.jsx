import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'
import CountUp from '../components/CountUp.jsx'
import { pageVariants, pageTransition } from '../utils/motion.js'

// Hero background video. Swap assets/videos/hero-bg.mp4 with your own clip
// (same name) — the poster image shows instantly and stays visible until
// the video is loaded, or if no video file is present yet.
const heroVideo = `${import.meta.env.BASE_URL}assets/videos/hero-bg.mp4`
const heroPoster = `${import.meta.env.BASE_URL}assets/images/hero-bg.svg`

// Headline split into lines/words for the staggered clip reveal. The second
// line renders in silver, matching the original two-tone treatment.
const headline = [
  { words: ["Tomorrow's", 'innovation,'], silver: false },
  { words: ["today's", 'reality.'], silver: true },
]

// Studio numbers surfaced as animated counters. All derived from real site
// content: years of practice, projects on the Projects page, and the three
// sectors covered there (Residential / Interior / Commercial).
const stats = [
  { to: 9, prefix: '+', label: 'Years of practice' },
  { to: 6, label: 'Selected projects' },
  { to: 3, label: 'Design sectors' },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export default function Home() {
  const videoRef = useRef(null)
  const reduceMotion = useReducedMotion()

  // iOS Safari quirks: it only autoplays a genuinely muted video (and React
  // does not always reflect the `muted` prop to the DOM attribute), it
  // sometimes ignores the `loop` attribute, and Low Power Mode pauses
  // playback. Force muted, restart manually on `ended`, and resume whenever
  // the tab becomes visible or the user touches the page.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    video.muted = true
    video.setAttribute('muted', '')

    const tryPlay = () => {
      const p = video.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }

    const onEnded = () => {
      video.currentTime = 0
      tryPlay()
    }

    const onVisible = () => {
      if (!document.hidden && video.paused) tryPlay()
    }

    const onTouch = () => {
      if (video.paused) tryPlay()
    }

    video.addEventListener('ended', onEnded)
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('touchstart', onTouch, { passive: true })
    tryPlay()

    return () => {
      video.removeEventListener('ended', onEnded)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('touchstart', onTouch)
    }
  }, [])

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {/* Fixed video background — stays put behind the whole page while the
          content scrolls over it */}
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coldblack via-coldblack/70 to-transparent" />
      </div>

      {/* Hero */}
      <section className="relative min-h-[100svh]">
        <div className="relative mx-auto flex min-h-[100svh] max-w-content flex-col justify-center px-6 py-24">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-silver"
          >
            Architecture &amp; Interior Design Studio
          </motion.p>

          {/* Headline — words rise out of a clipped line, one after another */}
          <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-intense-white sm:text-6xl lg:text-7xl">
            {headline.map(({ words, silver }, li) => (
              <span
                key={words[0]}
                className={`-mb-[0.14em] block overflow-hidden pb-[0.14em] ${
                  silver ? 'text-silver' : ''
                }`}
              >
                {words.map((word, wi) => (
                  <span key={word}>
                    {wi > 0 && ' '}
                    <motion.span
                      className="inline-block will-change-transform"
                      initial={
                        reduceMotion
                          ? { opacity: 0 }
                          : { y: '112%', opacity: 1 }
                      }
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: 0.16 + (li * 2 + wi) * 0.09,
                        type: 'spring',
                        stiffness: 150,
                        damping: 24,
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 bg-intense-white px-7 py-3.5 text-sm font-semibold text-coldblack transition duration-300 hover:bg-silver active:scale-[0.97]"
            >
              View Projects
              <ArrowRight
                size={18}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border hairline px-7 py-3.5 text-sm font-semibold text-intense-white transition duration-300 hover:border-silver hover:text-silver active:scale-[0.97]"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>

        {/* Scroll cue — a light pulse travelling down a hairline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-feldgrau">
            Scroll
          </span>
          <span className="relative block h-12 w-px overflow-hidden bg-silver/20">
            {!reduceMotion && (
              <motion.span
                className="absolute left-0 top-0 h-4 w-px bg-silver"
                animate={{ y: [-16, 48] }}
                transition={{
                  duration: 1.9,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </span>
        </motion.div>
      </section>

      {/* Company intro — translucent panel keeps the copy readable while the
          video continues behind it */}
      <section className="border-t hairline bg-coldblack/85">
        <div className="mx-auto grid max-w-content gap-10 px-6 py-24 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="md:col-span-4"
          >
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-silver">
              The Studio
            </h2>
            <p className="mt-4 font-display text-3xl font-bold text-intense-white">
              <CountUp to={9} prefix="+" className="tabular-nums" /> years
              <span className="block text-base font-medium text-feldgrau">
                shaping spaces that inspire
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              delay: 0.1,
              type: 'spring',
              stiffness: 260,
              damping: 30,
            }}
            className="md:col-span-8"
          >
            <p className="text-lg leading-relaxed text-silver md:text-xl">
              <span className="text-intense-white">Hosni Arc Studio&copy;</span> is a
              dynamic and innovative architectural firm with a deep passion for design
              and a commitment to excellence. For +9 years, we have been dedicated to
              shaping spaces that inspire, while respecting the environment and the
              people who inhabit them.
            </p>

            {/* Studio numbers — counters roll up when scrolled into view */}
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t hairline pt-8">
              {stats.map(({ to, prefix, label }) => (
                <div key={label}>
                  <p className="font-display text-3xl font-bold tabular-nums text-intense-white">
                    <CountUp to={to} prefix={prefix} />
                  </p>
                  <p className="mt-1.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-feldgrau">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/profile"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-intense-white transition-colors duration-300 hover:text-silver"
            >
              More about us
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
