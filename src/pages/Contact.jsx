import { motion } from 'motion/react'
import { Phone, EnvelopeSimple, MapPin, Globe, WhatsappLogo } from '@phosphor-icons/react'
import { pageVariants, pageTransition } from '../utils/motion.js'

// Studio WhatsApp number in international format (no +, no leading 0) for
// wa.me links. Source: +201005566336 → Egypt (20) + 1005566336.
const WHATSAPP_NUMBER = '201005566336'

const details = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+201005566336',
    href: 'tel:+201005566336',
  },
  {
    icon: WhatsappLogo,
    label: 'WhatsApp',
    value: '+201005566336',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    icon: EnvelopeSimple,
    label: 'Email',
    value: 'Hosniarcstudio@gmail.com',
    href: 'mailto:Hosniarcstudio@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Cairo',
  },
  {
    icon: Globe,
    label: 'Website',
    value: 'ahmedbadway.github.io/Mohsen',
    href: 'https://ahmedbadway.github.io/Mohsen/',
  },
]

const fieldClass =
  'w-full border hairline bg-coldblack/40 px-4 py-3 text-sm text-intense-white placeholder:text-feldgrau transition-colors duration-300 focus:border-silver'

export default function Contact() {
  // Build a WhatsApp message from the form fields and open the chat. No
  // backend needed — the message opens prefilled in WhatsApp.
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = (data.get('name') || '').toString().trim()
    const phone = (data.get('phone') || '').toString().trim()
    const message = (data.get('message') || '').toString().trim()

    const lines = ['Hello Hosni Arc Studio,']
    if (name) lines.push(`My name is ${name}.`)
    if (message) lines.push('', message)
    if (phone) lines.push('', `Phone: ${phone}`)

    const text = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener')
  }

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
          Tell us about your space and your ambitions. Send us the details and
          we&apos;ll continue the conversation on WhatsApp.
        </p>
      </header>

      <div className="mt-14 grid gap-14 md:grid-cols-12">
        {/* Form → WhatsApp */}
        <form onSubmit={handleSubmit} className="md:col-span-7">
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
              <WhatsappLogo size={18} weight="fill" />
              Send via WhatsApp
            </button>
          </div>
        </form>

        {/* Contact details */}
        <aside className="md:col-span-5">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-8 inline-flex items-center gap-2 border hairline px-6 py-3.5 text-sm font-semibold text-intense-white transition-colors duration-300 hover:border-silver hover:text-silver"
          >
            <WhatsappLogo size={18} weight="fill" className="text-silver" />
            Chat on WhatsApp
          </a>

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
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
