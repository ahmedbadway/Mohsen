import { useEffect } from 'react'

const SITE = 'https://www.hosniarcstudio.com'

// Keeps <title>, the meta description and the canonical link in sync with
// the active route, so each page has its own search-result entry. React 18
// has no built-in document head API, so this writes to the DOM directly.
function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

export default function PageMeta({ title, description, path }) {
  useEffect(() => {
    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', `${SITE}${path}`)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', `${SITE}${path}`)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
  }, [title, description, path])

  return null
}
