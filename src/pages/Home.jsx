import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'
import { pageVariants, pageTransition } from '../utils/motion.js'

const heroBg = `${import.meta.env.BASE_URL}assets/hero-bg.svg`

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coldblack via-coldblack/70 to-transparent" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-content flex-col justify-center px-6 py-24">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-silver"
          >
            Architecture &amp; Interior Design Studio
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.12 }}
            className="max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-intense-white sm:text-6xl lg:text-7xl"
          >
            Tomorrow&apos;s innovation,
            <br />
            <span className="text-silver">today&apos;s reality.</span>
          </motion.h1>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 bg-intense-white px-7 py-3.5 text-sm font-semibold text-coldblack transition-colors duration-300 hover:bg-silver"
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
              className="inline-flex items-center gap-2 border hairline px-7 py-3.5 text-sm font-semibold text-intense-white transition-colors duration-300 hover:border-silver hover:text-silver"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Company intro */}
      <section className="border-t hairline">
        <div className="mx-auto grid max-w-content gap-10 px-6 py-24 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-silver">
              The Studio
            </h2>
            <p className="mt-4 font-display text-3xl font-bold text-intense-white">
              +6 years
              <span className="block text-base font-medium text-feldgrau">
                shaping spaces that inspire
              </span>
            </p>
          </div>

          <div className="md:col-span-8">
            <p className="text-lg leading-relaxed text-silver md:text-xl">
              <span className="text-intense-white">Hosni Arc Studio&copy;</span> is a
              dynamic and innovative architectural firm with a deep passion for design
              and a commitment to excellence. For +6 years, we have been dedicated to
              shaping spaces that inspire, while respecting the environment and the
              people who inhabit them.
            </p>

            <Link
              to="/profile"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-intense-white transition-colors duration-300 hover:text-silver"
            >
              More about us
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
