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

## Editing project content

Project content (titles, categories, years, descriptions, cover images,
album galleries and video) lives in **`public/content/projects.json`** and is
rendered on the Projects page at runtime — no code changes needed to update it.

There are two ways to edit it:

### 1. The `/admin` panel (for the client)

The site ships with **Decap CMS** at `/admin`. The client signs in with GitHub
and edits every project through a simple form (including drag-and-drop image
uploads); saving commits to `main` and the live site rebuilds automatically.

**One-time setup** (required before the panel can sign in — GitHub Pages has no
server, so the login step runs on a small free OAuth gateway scoped to this
repo):

1. **Create a GitHub OAuth App** (GitHub → Settings → Developer settings → OAuth
   Apps → New). Homepage URL: `https://www.hosniarcstudio.com`. Authorization
   callback URL: your gateway URL from step 2 + `/callback`. Note the
   **Client ID** and **Client Secret**.
2. **Deploy an OAuth gateway.** Deploy a small free worker such as
   [`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth) (Cloudflare
   Workers) or [`decap-proxy`](https://github.com/sterzim/decap-proxy). Set its
   `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` env vars from step 1. The secret
   lives only in the worker — never in this repo.
3. **Point the CMS at the gateway:** set `backend.base_url` in
   `public/admin/config.yml` to your deployed worker URL.
4. **Give the client access:** add them as a collaborator on this repo so their
   GitHub login can commit.

The client then opens `https://www.hosniarcstudio.com/admin`.

### 2. Editing the JSON directly

Prefer no CMS? Edit `public/content/projects.json` from the GitHub web editor.
Image/video paths are site-root absolute (e.g. `/assets/images/project-01/
cover.svg`); each project owns a folder under `public/assets/images/<slug>/`.
Replace a placeholder by dropping a real file in with the same path.

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
