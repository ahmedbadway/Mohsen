// Shared page-scroll lock.
//
// Both the mobile menu and the project album need to freeze the page while
// they're open. Each writing document.body.style directly would let whichever
// closes first unlock the page under the other, so locks are counted here and
// the original overflow value is only restored when the last one releases.
let locks = 0
let previousOverflow = ''

export function lockScroll() {
  if (locks === 0) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  locks += 1
}

export function unlockScroll() {
  locks = Math.max(locks - 1, 0)
  if (locks === 0) {
    document.body.style.overflow = previousOverflow
  }
}
