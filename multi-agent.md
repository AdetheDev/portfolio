# REAN Campaign Website — Multi-Agent Guide

## Agreed stack

- Next.js App Router with React and TypeScript
- Sanity as the editable content backend for campaign updates
- Vercel for hosting and deployment
- Custom CSS tokens and responsive styles for the UI

## Ownership

### Frontend — Codex

Own the UI under `frontend/src/app/`, `frontend/src/components/`, and frontend styles/assets. Scope includes page layouts, responsive navigation, accessibility, and loading, empty, error, and populated states for newsletter content.

### Backend — Claude

Own Sanity project/schema setup, Studio configuration, server-only CMS client and queries, API route handlers/webhooks and cache revalidation, environment variable documentation, and any mailing-list provider integration.

Claude owns shared types and the data/API contract. Agree on it before connecting UI to live content. The proposed published newsletter item fields are: `slug`, `title`, `excerpt`, `publishedAt`, optional `coverImage`, rich-text `body`, and optional `category`/`author`.

Suggested backend-owned locations:

- `frontend/sanity.config.ts` and `frontend/sanity.cli.ts`
- `frontend/sanity/schemas/newsletterPost.ts`
- `frontend/src/app/studio/[[...tool]]/page.tsx`
- `frontend/src/lib/server/newsletter.ts` for the typed, server-only published-content function
- `frontend/src/app/api/revalidate/route.ts` if webhook-based cache revalidation is used

The newsletter route at `frontend/src/app/newsletter/page.tsx` is the frontend consumer. Once the shared type and function signature are agreed, it should render published posts plus loading, empty, and error states.

## Boundaries and coordination

- Frontend may consume the agreed server-only content function or API, but must not read CMS write tokens or mailing-list secrets in client-side code.
- Backend must not change page markup, shared visual components, or styles without coordinating with the frontend owner.
- `frontend/package.json`, lockfiles, `.env.example`, shared types, and the content contract are shared surfaces. Coordinate before concurrent edits.
- If work crosses an ownership boundary, record the dependency and agree on the changed contract before editing.
- Keep private member data, subscriber data, tokens, and credentials out of source control. Commit placeholders only.
- Newsletter publishing and email subscriptions are separate features. Adding an article to Sanity does not itself email subscribers.

## Workflow

1. Read `AGENTS.md`, `TASKS.md`, and this file when available. Claim work with exact paths in `TASKS.md` before editing when that task board exists.
2. State the file scope before implementation and avoid files in another agent’s active claim.
3. Report changed files, decisions, checks run, and remaining integration work when handing off.

The workspace currently has no `AGENTS.md`, `TASKS.md`, or Git repository. Add or attach those through the project’s normal owner workflow before relying on task claims, branches, commits, or PR coordination.
