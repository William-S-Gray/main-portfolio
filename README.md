# William S. Gray — Portfolio

Personal portfolio of **William S. Gray**, Software Engineer & AI Full-Stack Systems Builder. A modern, responsive site built with a claymorphism design system, featuring light/dark mode, animated transitions, a filterable project showcase, and a working contact form.

🔗 **Live:** https://www.williamgray.dev/

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS + custom claymorphism tokens
- **Animation:** Framer Motion
- **Routing:** React Router
- **Validation:** Zod
- **Email:** EmailJS
- **Theming:** next-themes (light / dark)
- **Analytics:** Vercel Web Analytics

## Features

- 🎨 Claymorphism UI with theme-aware light & dark modes
- 📱 Fully responsive across mobile, tablet, and desktop
- 🗂️ Filterable project gallery with branded gradient placeholders for projects without screenshots
- ✉️ Contact form with client-side validation, EmailJS delivery, toast feedback, and a honeypot spam trap
- 🤖 "Ask my AI" chat answered offline from a local knowledge base (`src/data/assistant.ts`) — no API calls
- 📚 Case studies with architecture, key decisions, and measured results
- ⚡ Route-level code splitting for fast initial loads
- 🔍 SEO: per-route meta, Open Graph, Twitter cards, JSON-LD (`ProfilePage`/`Person`), sitemap & robots

## Getting Started

Requires [Node.js](https://nodejs.org) 18+.

```sh
npm install       # install dependencies
npm run dev       # start dev server (http://localhost:8080)
npm run build     # production build
npm run preview   # preview the production build
npm run test      # run tests
npm run lint      # lint
```

## Project Structure

```
public/
├── projects/       # project screenshots
└── robots.txt
src/
├── components/     # Navbar, Footer, Layout, ProjectCard, AskAI, CommandPalette, Seo, …
├── data/           # projects, posts, certificates, resume, assistant knowledge
├── lib/            # project category icons, colours, status badges
└── pages/          # Index, About, Services, Projects, ProjectDetail, Blog, Contact, …
vercel.json         # SPA fallback for deep links
```

## Customization

- **Projects:** edit `src/data/projects.ts`. Drop a screenshot in `public/projects/` and set the optional `image` field; omit `image` to fall back to a generated gradient placeholder.
- **Theme colors & claymorphism shadows:** `src/index.css` (CSS variables for light and `.dark`).
- **SEO / structured data:** primary `Person`/`ProfilePage` JSON-LD lives in `index.html`; per-route titles and descriptions are set via `src/components/Seo.tsx`.
- **Contact form:** update the EmailJS service/template IDs in `src/pages/Contact.tsx`.
- **Résumé:** `/resume` is rendered from `src/data/resume.ts` (also emitted as `/resume.json`) — edit that file; visitors use "Save as PDF" on the page.

## Deployment

Deployed on Vercel at https://www.williamgray.dev. `vercel.json` rewrites every path to `index.html` so deep links (`/about`, `/projects/…`) resolve on direct hits and crawls. The build also emits `sitemap.xml`, `rss.xml`, and `resume.json` from `src/data`.

**Weekly analytics email.** `api/analytics-report.ts` runs every Monday 07:00 UTC (Vercel Cron, `vercel.json`), reads last week's Vercel Web Analytics and emails a summary via EmailJS. It needs these environment variables in the Vercel project:

- `CRON_SECRET` — any long random string (Vercel sends it to authorise the cron call)
- `VERCEL_TOKEN` — a Vercel access token that can read this project's analytics
- `EMAILJS_PRIVATE_KEY` — EmailJS private key, with "Allow EmailJS API for non-browser applications" enabled

## License

Personal project — all rights reserved © William S. Gray.
