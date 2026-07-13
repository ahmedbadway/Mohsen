# Hosni Arc Studio

Static marketing site for **Hosni Arc Studio©** — an architecture & interior
design studio based in Mansoura, Egypt.

> Tomorrow's innovation, today's reality.

Built with **React + Vite + Tailwind CSS**, animated with **Motion**, and
designed for deployment to **GitHub Pages**.

## Pages

- **Home** (`/`) — hero + studio introduction
- **Projects** (`/projects`) — grid of project cards (SVG placeholders)
- **Profile** (`/profile`) — about, mission and values
- **Contact** (`/contact`) — Formspree contact form + studio details

Routing uses `HashRouter`, so all four pages work on GitHub Pages with no
extra configuration.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to /dist
npm run preview  # preview the production build
```

## Brand tokens

Defined once as CSS variables in `src/styles/index.css` and exposed to
Tailwind (`tailwind.config.js`):

| Name          | Hex       | Usage                       |
| ------------- | --------- | --------------------------- |
| Jungle Green  | `#1A3633` | Primary dark / buttons      |
| Quick Silver  | `#9CABA1` | Secondary text / details    |
| Cold Black    | `#090A0C` | Deepest background          |
| Feldgrau      | `#445A58` | Mid-tone / gradients        |
| Intense White | `#F8F9FA` | Light surfaces / text       |

Fonts: **Sora** (geometric headings/logotype, a substitute for TT Hoves Pro)
and **Inter** (body), loaded from Google Fonts.

## Contact form (WhatsApp)

The contact form has no backend — on submit it opens **WhatsApp** with the
name, message and optional phone prefilled, addressed to the studio number.

To change the destination number, edit `WHATSAPP_NUMBER` in
`src/pages/Contact.jsx` (and the matching `wa.me` links in
`src/components/Footer.jsx`). Use international format with no `+` and no
leading `0` — e.g. `+20 010 1607 0633` becomes `201016070633`.

## Replacing project images

Placeholder SVGs live in `public/assets/` and are named `project-01.svg`
… `project-06.svg` (plus `hero-bg.svg`). Drop real images in with the same
filenames — or update the `image` fields in `src/pages/Projects.jsx` — to
swap them in.

## Deploying to GitHub Pages

1. Build: `npm run build` (outputs to `/dist`; `base: './'` in
   `vite.config.js` keeps asset paths relative).
2. Publish the `dist/` folder to GitHub Pages (via a GitHub Action, or by
   pushing `dist` to a `gh-pages` branch).
3. In the repo: **Settings → Pages** and select the publishing source.

The site will be available at `https://<username>.github.io/<repo>/`.

## Still to do (out of scope for v1)

- Connect the custom domain (`hosniarcstudio.com`)
- Replace SVG placeholders with real project photography
- SEO polish (meta tags, sitemap)
