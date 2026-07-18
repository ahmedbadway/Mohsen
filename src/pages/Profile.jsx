import { motion } from 'motion/react'
import { Users, Handshake, Leaf } from '@phosphor-icons/react'
import DiagonalDecor from '../components/DiagonalDecor.jsx'
import { pageVariants, pageTransition } from '../utils/motion.js'

const values = [
  {
    icon: Users,
    title: 'Client-centric',
    description:
      'We work closely with every client to understand their unique needs, vision and style.',
  },
  {
    icon: Handshake,
    title: 'Collaborative',
    description:
      'Design is a dialogue. We build ideas together, across disciplines, from concept to detail.',
  },
  {
    icon: Leaf,
    title: 'Environmentally responsible',
    description:
      'We respect the environment and the people who inhabit the spaces we create.',
  },
]

export default function Profile() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {/* Intro */}
      <section className="relative overflow-hidden border-b hairline">
        <DiagonalDecor className="pointer-events-none absolute -right-20 top-0 h-full w-[520px] opacity-70" />
        <div className="relative mx-auto max-w-content px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-silver">
            About Us
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-intense-white sm:text-5xl">
            At Hosni Architecture Studio, we design exceptional spaces where
            luxury meets functionality.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-silver md:text-xl">
            With a passion for timeless architecture and refined interiors, we
            create bespoke environments that elevate everyday living through
            precision, elegance, and innovation.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section>
        <div className="mx-auto grid max-w-content gap-10 px-6 py-24 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-silver">
              Our Mission
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg leading-relaxed text-silver md:text-xl">
              To transform visions into exceptional spaces by delivering bespoke
              architectural and interior design solutions that blend luxury,
              functionality, and timeless elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t hairline bg-jungle/10">
        <div className="mx-auto max-w-content px-6 py-24">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="font-display text-3xl font-bold tracking-tight text-intense-white">
              What guides our work
            </h2>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-silver">
              +9 years of practice
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  delay: i * 0.1,
                  type: 'spring',
                  stiffness: 260,
                  damping: 30,
                }}
                className="border hairline bg-coldblack/40 p-7"
              >
                <Icon size={28} weight="light" className="text-silver" />
                <h3 className="mt-5 font-display text-lg font-semibold text-intense-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-silver">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
