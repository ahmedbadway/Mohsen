import { Link } from 'react-router-dom'
import { Phone, WhatsappLogo, EnvelopeSimple, MapPin, Globe } from '@phosphor-icons/react'
import Logo from './Logo.jsx'

const contact = [
  {
    icon: Phone,
    label: '+201005566336',
    href: 'tel:+201005566336',
  },
  {
    icon: WhatsappLogo,
    label: '+201005566336',
    href: 'https://wa.me/201005566336',
  },
  {
    icon: EnvelopeSimple,
    label: 'Hosniarcstudio@gmail.com',
    href: 'mailto:Hosniarcstudio@gmail.com',
  },
  {
    icon: Globe,
    label: 'ahmedbadway.github.io/Mohsen',
    href: 'https://ahmedbadway.github.io/Mohsen/',
  },
]

export default function Footer() {
  return (
    <footer className="border-t hairline bg-jungle/20">
      <div className="mx-auto max-w-content px-6 py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Logo withSub />
            <p className="mt-5 text-sm leading-relaxed text-silver">
              Tomorrow&apos;s innovation, today&apos;s reality.
            </p>
          </div>

          <ul className="space-y-4">
            {contact.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="group inline-flex items-center gap-3 text-sm text-silver transition-colors duration-300 hover:text-intense-white"
                >
                  <Icon
                    size={18}
                    weight="light"
                    className="text-feldgrau transition-colors duration-300 group-hover:text-silver"
                  />
                  {label}
                </a>
              </li>
            ))}
            <li className="inline-flex items-start gap-3 text-sm text-silver">
              <MapPin size={18} weight="light" className="mt-0.5 text-feldgrau" />
              <span>Cairo</span>
            </li>
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t hairline pt-6 text-xs text-silver sm:flex-row sm:items-center">
          <p>All rights reserved &copy; 2025</p>
          <nav className="flex gap-6">
            <Link to="/projects" className="transition-colors hover:text-intense-white">
              Projects
            </Link>
            <Link to="/profile" className="transition-colors hover:text-intense-white">
              Profile
            </Link>
            <Link to="/contact" className="transition-colors hover:text-intense-white">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
