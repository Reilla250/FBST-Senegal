# FBST-Senegal Website

A Next.js (App Router + TypeScript + Tailwind CSS v4) website for **Fondation La Bonne
Santé Pour Tous (FBST-Senegal)**, built from the provided website-content document.

## What's included

- **13 pages**: Home, About, Programs, a Projects index plus dedicated pages for
  NOUVEAU DÉPART and Dakar Without Fear Initiative (D-WiFI), Impact, How We Work,
  Partnerships, Safeguarding, Get Involved, Resources, Contact, and FAQ.
- **A working contact form backend** at `app/api/contact/route.ts` — validates
  submissions server-side and saves them to `data/submissions.json`, with a
  honeypot field to deter basic spam bots.
- **A custom design system** (see `app/globals.css`): a warm sand / baobab-brown /
  marigold / teal palette, Fraunces (display) + Work Sans (body) + IBM Plex Mono
  (data/stats) type system, and a recurring "horizon arc" motif used at section
  transitions.
- Shared components in `components/`: `Header`, `Footer`, `PageHero`, `Section`,
  `StatGrid`, `StepList`, `HorizonDivider`, and the smaller pieces in `ui.tsx`
  (`BulletList`, `Card`, `CTA`, `ButtonRow`).

## Getting started locally

Requires Node.js 18.18+ (tested on Node 22).

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

To build and run a production server:

```bash
npm run build
npm start
```

## Editing content

All page copy lives directly in each page's `.tsx` file under `app/`, matching the
structure of the original content document — so if you want to change wording,
open the relevant page (e.g. `app/about/page.tsx`) and edit the text in place.
Reusable pieces (nav links, stat numbers, step lists) are just arrays/props passed
into the shared components, so they're easy to extend without touching layout code.

## The contact form backend

`app/api/contact/route.ts` is a real API route that:

1. Validates the submitted fields (name, contact method, reason, message, consent).
2. Rejects anything that fills in the hidden honeypot field.
3. Appends valid submissions to `data/submissions.json` with a timestamp and a
   generated id.

**Important — before deploying to production:**

- **Serverless hosts (Vercel, Netlify, etc.) have a read-only filesystem** outside
  of `/tmp`, so `data/submissions.json` **will not persist** there. On serverless,
  swap the `readAll` / `saveAll` functions in `route.ts` for a real database
  (Postgres, a hosted SQLite like Turso, Airtable, etc.) — the validation logic and
  API shape stay exactly the same, only the storage lines change.
- **On a traditional Node server** (a VPS, Render, Railway, Fly.io, a self-hosted
  box, etc.) the file-based store works as-is, since the filesystem persists.
- Right now nothing *reads* `data/submissions.json` back out through the UI —
  there's no admin page. If you want one, I can add a simple authenticated
  `/admin` page that lists submissions; just ask.
- No outbound email is sent on submission. If you want the team notified by email
  when someone submits the form, that needs an email provider (Resend, SendGrid,
  SES, etc.) wired into the API route — happy to add this once you tell me which
  provider you'd like to use.

## Fonts

Fraunces, Work Sans and IBM Plex Mono are bundled locally via the `@fontsource/*`
npm packages (not loaded from Google Fonts), so the site works fully offline and
has no external font requests.

## Deploying

This is a standard Next.js app, so it deploys to any Next.js-compatible host:

- **Vercel**: connect the repo and deploy — but see the note above about the
  contact-form storage needing a real database there.
- **A VPS / Render / Railway / Fly.io**: `npm run build` then `npm start` behind
  your process manager of choice (pm2, systemd, Docker, etc.). The file-based
  contact form storage works out of the box here.

## Project structure

```
app/
  layout.tsx              root layout (Header + Footer + fonts + metadata)
  globals.css              design tokens, fonts, base styles
  page.tsx                 Home
  about/page.tsx
  programs/page.tsx
  projects/
    page.tsx                Projects index
    nouveau-depart/page.tsx
    dakar-without-fear/page.tsx
  impact/page.tsx
  how-we-work/page.tsx
  partnerships/page.tsx
  safeguarding/page.tsx
  get-involved/page.tsx
  resources/page.tsx
  contact/page.tsx
  faq/page.tsx
  api/contact/route.ts     contact form API (validation + storage)
components/
  Header.tsx, Footer.tsx, PageHero.tsx, Section.tsx,
  StatGrid.tsx, StepList.tsx, HorizonDivider.tsx,
  ContactForm.tsx, ui.tsx (BulletList, Card, CTA, ButtonRow)
lib/
  nav.ts                   shared navigation data
data/
  submissions.json         contact form storage (dev/small-scale use)
```
