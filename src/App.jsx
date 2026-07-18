import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { AnimatePresence } from 'motion/react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

// Home stays eager (it's the landing page / LCP); the rest are code-split so
// they only download when navigated to.
const Projects = lazy(() => import('./pages/Projects.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

export default function App() {
  const location = useLocation()

  // Scroll to top on every route change.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Suspense fallback={null}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
