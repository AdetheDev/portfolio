# REAN Campaign Frontend

Next.js App Router frontend for the Alexander Obiechina for REAN President campaign website.

## Stack

- Next.js App Router and React
- TypeScript
- Custom CSS design tokens and responsive styles
- Sanity integration is owned by the backend agent and will be connected through an agreed server-side content interface
- Vercel deployment

## Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. The newsletter page currently shows its CMS-pending empty state until the backend connection is ready.

When creating the Vercel project, set its **Root Directory** to `frontend`.

## Routes

- `/` — campaign home
- `/about` — candidate profile
- `/manifesto` — vision
- `/pillars` — strategic priorities
- `/first-100-days` — proposed opening plan
- `/commitment` — commitment to members
- `/newsletter` — updates archive UI, ready for CMS content
- `/prototypes` — design lab with five homepage concepts and five theme choices per concept

See the repository-root `multi-agent.md` for ownership and integration boundaries.
