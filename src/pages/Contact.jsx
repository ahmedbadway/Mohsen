import { motion } from 'motion/react'
import { Phone, EnvelopeSimple, MapPin, Globe } from '@phosphor-icons/react'
import { pageVariants, pageTransition } from '../utils/motion.js'

// Replace YOUR_FORM_ID with the real Formspree endpoint after creating a
// form at https://formspree.io (see README). Until then the form posts to a
// placeholder and will not deliver email.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

const details = [
  { icon: Phone, label: 'Phone', value: '+20 01016070633', href: 'tel:+2001016070633' },
  {
    icon: EnvelopeSimple,
    label: 'Email',
    value: 'Hosni@hosniarcstudio.com',
    href: 'mailto:Hosni@hosniarcstudio.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Mansoura, Jehan St., Jehan Medical Center, 2nd Floor',
  },
  {
    icon: Globe,
    label: 'Website',
    value: 'hosniarcstudio.com',
    href: 'https://hosniarcstudio.com',
  },
]

const fieldClass =
  'w-full border hairline bg-coldblack/40 px-4 py-3 text-sm text-intense-white placeholder:text-feldgrau transition-colors duration-300 focus:border-silver'

export default function Contact() {
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
          Get in Touch
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-intense-white sm:text-5xl">
          Contact
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-silver">
          Tell us about your space and your ambitions. We&apos;ll get back to you to
          discuss how we can bring the project to life.
        </p>
      </header>

      <div className="mt-14 grid gap-14 md:grid-cols-12">
        {/* Form */}
        <form
          action={FORMSPREE_ENDPOINT}
          method="POST"
          className="md:col-span-7"
        >
          <div className="grid gap-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-silver">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your full name"
                className={fieldClass}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-silver">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-silver">
                  Phone <span className="text-feldgrau">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+20 ..."
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-silver">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your project..."
                className={`${fieldClass} resize-y`}
              />
            </div>

            <button
              type="submit"
              className="group inline-flex w-fit items-center gap-2 bg-intense-white px-8 py-3.5 text-sm font-semibold text-coldblack transition-colors duration-300 hover:bg-silver"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Contact details */}
        <aside className="md:col-span-5">
          <ul className="space-y-8">
            {details.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex gap-4">
                <Icon size={22} weight="light" className="mt-0.5 shrink-0 text-silver" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-feldgrau">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="mt-1 block text-intense-white transition-colors duration-300 hover:text-silver"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-intense-white">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </motion.div>
  )
}
