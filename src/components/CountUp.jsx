import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

/**
 * Number counter that rolls from 0 to `to` the first time it scrolls into
 * view. Writes straight to the DOM node (no re-renders per frame) and snaps
 * instantly for users who prefer reduced motion.
 */
export default function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1.6,
  className,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return undefined

    if (reduceMotion) {
      el.textContent = `${prefix}${to}${suffix}`
      return undefined
    }

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, to, prefix, suffix, duration, reduceMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
