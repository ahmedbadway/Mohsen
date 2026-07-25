import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

/**
 * Number counter that rolls from 0 to `to` the first time it scrolls into
 * view. Writes straight to the DOM node (no re-renders per frame) and snaps
 * instantly for users who prefer reduced motion.
 */
export default function CountUp({ to, prefix = '', suffix = '', className }) {
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

    // Underdamped spring: the number overshoots its target and settles back
    // with a couple of visible bounces, instead of easing straight in.
    const controls = animate(0, to, {
      type: 'spring',
      stiffness: 14,
      damping: 5.5,
      mass: 1.4,
      restDelta: 0.001,
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`
      },
      onComplete: () => {
        el.textContent = `${prefix}${to}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, to, prefix, suffix, reduceMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
