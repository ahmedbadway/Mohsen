// Resolve a stored content path (as written by the CMS, e.g.
// "/assets/images/project-01/cover.svg") into a URL that respects Vite's
// BASE_URL. Absolute URLs are returned untouched; a leading slash is stripped
// so the value composes correctly under any base path.
export function assetUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
