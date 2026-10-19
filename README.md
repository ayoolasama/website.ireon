# Ireon Ventures — website

The marketing site for **Ireon Ventures** — _where ideas are built and given room to fly._

Built with React 18, TypeScript (strict), Vite and React Router. Styling is plain CSS Modules on top of
the Ireon design tokens (Cobalt & Lime), so there is no CSS framework to learn or upgrade.

---

## Quick start

Requires Node.js 18.18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command           | What it does                                               |
| ----------------- | ---------------------------------------------------------- |
| `npm run dev`     | Local dev server with hot reload                           |
| `npm run build`   | Type-checks, then builds the production site into `dist/`  |
| `npm run preview` | Serves the production build locally                        |
| `npm run test`    | Runs the test suite once (Vitest + Testing Library)        |
| `npm run lint`    | ESLint, including React hooks and accessibility (jsx-a11y) |
| `npm run format`  | Formats everything with Prettier                           |
| `npm run check`   | Typecheck → lint → test → build. Run before every release. |

---

## Project structure

```
src/
├── main.tsx               App entry: router + global styles
├── App.tsx                Route table (/, /how-we-work, /ventures, /contact, 404)
├── styles/
│   ├── tokens.css         Design tokens — colours (light + dark), spacing, radii, fonts
│   └── global.css         Base element styles, .container, focus ring, reduced motion
├── data/                  ← Content lives here, not in components
│   ├── site.ts            Company name, tagline, contact details, navigation
│   ├── content.ts         The four pillars, the Build/Grow/Fly journey, "What we look for"
│   └── ventures.ts        Portfolio entries shown on /ventures
├── components/            Reusable building blocks, each with its own CSS Module
│   ├── Button/            Button and ButtonLink (primary · secondary · ghost · spark)
│   ├── Tag/               Track and status labels
│   ├── TextField/         Labelled input / textarea with hint and error
│   ├── VentureCard/       Portfolio card with the arch monogram
│   ├── SectionIntro/      Eyebrow + section heading
│   ├── Arch/              The brand's arch motif
│   ├── HeroArt/           Home-page hero composition
│   └── CtaBand/           "Have an idea worth building?" band
├── layout/                Header, footer, skip link, scroll/focus reset on navigation
├── pages/                 One file per route, plus the contact form
└── lib/
    ├── contact.ts         Form validation and submission
    ├── usePageTitle.ts    Per-page <title> and meta description
    └── cx.ts              Class-name helper
```

---

## Common changes

**Update contact details or the tagline** → `src/data/site.ts`. Every page reads from here.

**Add real ventures** → replace the placeholders in `src/data/ventures.ts`. Each venture needs a
`name`, a `track` (`roots` for established businesses, `signal` for technology), a `stage`, a
`sector` and a one-sentence `summary`. Add `href` to make the card a link.

**Edit page copy** → the pillars and journey are in `src/data/content.ts`; page-specific headlines are
in the page files under `src/pages/`.

**Change a colour** → `src/styles/tokens.css`. Keep it in step with the Ireon Ventures design system.
Components use tokens only — never paste hex values into component styles.

---

## Contact form

The form validates in the browser (plain-language errors, focus moves to the first problem) and then
submits in one of two ways:

1. **With an endpoint (recommended for production).** Copy `.env.example` to `.env` and set
   `VITE_CONTACT_ENDPOINT` to any service that accepts a JSON `POST` — e.g. Formspree, Basin, Getform,
   or your own API. The payload is:

   ```json
   {
     "name": "…",
     "email": "…",
     "intent": "own-idea | build-ireon-idea | partner",
     "intentLabel": "…",
     "message": "…",
     "source": "ireon.org"
   }
   ```

2. **Without an endpoint.** The form opens the visitor's email app with a message to hello@ireon.org
   already written, so no enquiry is lost while the endpoint is being set up.

Set the variable in your host's dashboard too (Netlify/Vercel → Environment variables) — Vite bakes it
in at build time.

---

## Deploying

`npm run build` produces a static site in `dist/` that can be hosted anywhere.

- **Netlify** — build command `npm run build`, publish directory `dist`. `public/_redirects` is
  included so deep links like `/contact` work.
- **Vercel** — framework preset _Vite_. `vercel.json` is included for the same reason.
- **Any other static host** (S3 + CloudFront, Cloudflare Pages, Nginx) — serve `dist/` and rewrite
  unknown paths to `/index.html`.

`public/robots.txt` and `public/sitemap.xml` assume the site lives at **https://ireon.org**.

---

## Quality bar

- **Accessibility** — semantic landmarks, skip link, visible focus ring (`--focus-ring`), labelled
  form controls with `aria-describedby` errors, current page marked with `aria-current`, focus moved to
  the new page on navigation, reduced-motion respected, and text contrast at WCAG AA or better.
- **Responsive** — every grid collapses to one column on phones; tested at 390px and 1440px.
- **Tests** — routing, navigation state, form validation, submission success/failure and the email
  fallback (`src/**/*.test.ts(x)`).

---

## Before launch

- [ ] Replace the placeholder ventures in `src/data/ventures.ts`
- [ ] Set `VITE_CONTACT_ENDPOINT`
- [ ] Add a favicon to `public/` and link it in `index.html`
- [ ] Add a social sharing image (`og:image`) to `index.html`
- [ ] Confirm the company registration details shown in the footer
