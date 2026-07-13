// Shared route-transition motion. Used by every page so navigation feels
// consistent. mode="wait" in App.jsx ensures the outgoing page finishes its
// exit before the next one enters (no overlap).
export const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

// Custom cubic-bezier (ease-out expo-ish) for a smooth, premium feel.
export const pageTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
}
