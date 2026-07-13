import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { List, X } from 'phosphor-react'
import Logo from './Logo.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/profile', label: 'Profile' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }) =>
    [
      'relative text-sm font-medium tracking-wide transition-colors duration-300',
      isActive ? 'text-intense-white' : 'text-silver hover:text-intense-white',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b hairline bg-coldblack/80 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-content items-center justify-between px-6">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className={linkClass}>
                {({ isActive }) => (
                  <span className="relative inline-block py-1">
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 h-px w-full bg-silver"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-intense-white md:hidden"
        >
          <List size={26} weight="light" />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-coldblack md:hidden"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <Logo onClick={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-intense-white"
              >
                <X size={26} weight="light" />
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.06,
                    type: 'spring',
                    stiffness: 320,
                    damping: 30,
                  }}
                >
                  <NavLink
                    to={l.to}
                    end={l.end}
                    className={({ isActive }) =>
                      [
                        'block border-b hairline py-5 font-display text-3xl font-semibold tracking-wide',
                        isActive ? 'text-intense-white' : 'text-silver',
                      ].join(' ')
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
