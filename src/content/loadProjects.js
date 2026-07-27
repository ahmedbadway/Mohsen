// Build-time project loader.
//
// Each project is a folder under src/content/projects/<NN>/ containing:
//   info.txt   — Title / Category / Year / Description (one "Key: value" per line)
//   cover.*    — the cover image shown on the card
//   *.svg|jpg… — album images (everything that isn't the cover)
//
// Vite's import.meta.glob reads them all at build time, so editing a file on
// GitHub simply triggers a rebuild — no server, no fetch, no CMS. To add a
// project, drop in a new numbered folder; to edit one, change info.txt or swap
// an image with the same name.

const infoFiles = import.meta.glob('./projects/*/info.txt', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const imageFiles = import.meta.glob('./projects/*/*.{svg,jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Pull the folder key (e.g. "01") out of a glob path like
// "./projects/01/info.txt".
function folderOf(path) {
  return path.split('/')[2]
}

// Parse the forgiving "Key: value" format into an object keyed by lowercase
// field name. Unknown lines and blank lines are ignored.
function parseInfo(raw) {
  const data = {}
  for (const line of raw.split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim().toLowerCase()
    const value = line.slice(idx + 1).trim()
    if (key) data[key] = value
  }
  return data
}

// Group images by folder.
const imagesByFolder = {}
for (const [path, url] of Object.entries(imageFiles)) {
  const folder = folderOf(path)
  ;(imagesByFolder[folder] ||= []).push({ name: path.split('/').pop(), url })
}

const projects = Object.entries(infoFiles)
  .map(([path, raw]) => {
    const folder = folderOf(path)
    const info = parseInfo(raw)
    const images = (imagesByFolder[folder] || []).sort((a, b) =>
      a.name.localeCompare(b.name)
    )
    const coverEntry = images.find((img) => /^cover\./i.test(img.name))
    const rest = images.filter((img) => img !== coverEntry).map((img) => img.url)
    // The album always needs at least one slide: fall back to the cover when
    // a folder holds nothing but the cover image.
    const gallery = rest.length ? rest : [coverEntry?.url].filter(Boolean)

    return {
      slug: folder,
      title: info.title || folder,
      category: info.category || '',
      year: info.year || '',
      details: info.description || '',
      cover: (coverEntry || images[0])?.url || '',
      gallery,
    }
  })
  // A project with no images can't be shown, and would break the album.
  .filter((project) => project.cover)
  // Order by folder name so 01, 02, 03… stay in sequence.
  .sort((a, b) => a.slug.localeCompare(b.slug))

export default projects
