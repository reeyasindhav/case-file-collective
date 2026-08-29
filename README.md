# Case File Collective

Casebook - True Crime Community & Database 

Please create a UI/UX design for this website make sure to have design focused pages. make sure to use and iterate on the given images to create ui, the final site should be production ready with functional implementation. It should include a minimum of 8 to 10 pages, including login signup pages an authenticated pages like the dashboard. the focus should be on design while maintaining all mockup data. Add animations to the site and give a simple user floe in response

make sure to use open source images where needed and do not generate images in here

Problem Statement:

Casebook is a dedicated community and database designed for true crime enthusiasts to explore detailed case files, track ongoing investigations, and discuss theories together. Built with a dark, investigative aesthetic, the platform features dossier-style case cards, interactive suspect timelines, and digital evidence boards to help users piece together clues while easily accessing related podcasts and documentary links.

Project Description:

A platform where true crime enthusiasts explore case files, follow ongoing cases, and discuss theories.

Ask if you have any question.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6b9ab7c8-d471-48d0-9d11-e78b4a4b5b0b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

I've laid the foundation for Casebook but ran out of room before finishing — here's where things stand.

Done so far

- Dark investigative design system in `src/styles.css` (charcoal/ember/brass palette, Instrument Serif + Inter Tight + JetBrains Mono, dossier card, grain, scan-line, redact, rise-in/pulse animations)
- `src/lib/data.ts` — full mockup dataset: 6 case files with suspects, timelines and evidence manifests, 6 discussions, 6 podcast/documentary items, private notes, stats (images via open-source picsum, none generated)
- `src/lib/auth.tsx` — mock session + saved-cases store on localStorage
- `src/components/site-chrome.tsx` and `case-card.tsx` — header/footer/shell, status chips, dossier case cards
- `src/routes/__root.tsx` — fonts, Casebook metadata, AuthProvider, toaster
- `src/routes/index.tsx` — landing page (hero, featured dossier, how-it-works, community preview, submit CTA)

Still to build (the current TypeScript errors are just missing routes — they clear once these files exist):
`cases.index.tsx`, `cases.$slug.tsx` (dossier with timeline/evidence/suspect tabs), `community.index.tsx`, `community.$id.tsx`, `media.tsx`, `about.tsx`, `login.tsx`, `signup.tsx`, plus the `_authenticated` gate with `dashboard`, `board` (evidence board), `saved`, `notes` and `submit`. One small fix also needed: guard `cases[0]` with a non-null access in `index.tsx`.

User flow
Landing → browse Case files → open a case dossier (timeline, suspects, evidence) → join a discussion → prompted to sign up/login → authenticated workspace: dashboard → saved cases, evidence board, private notes, submit a case → sign out back to landing.
