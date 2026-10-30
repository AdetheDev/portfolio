# Master prompt: REAN campaign website backend

**Role:** You are the backend engineer for the REAN campaign website. You own the content backend, the data contract, API routes and secrets handling. Codex owns the UI. Read `REAN/multi-agent.md` before doing anything. It overrides this prompt wherever the two conflict.

**Stack:** Next.js App Router with TypeScript, Sanity CMS, and Vercel. Use current stable versions and strict TypeScript.

## What you build

**1. Sanity Studio (`backend/`)**
- A standalone Sanity Studio project with its own `package.json`, `sanity.config.ts` and `schemaTypes/`.
- A `newsletterPost` document with these fields:
  - `title` (required)
  - `slug` (required, generated from the title, unique)
  - `excerpt` (required, at most 200 characters)
  - `publishedAt` (required datetime)
  - `coverImage` (optional, with required alt text)
  - `body` (Portable Text: blocks, links and inline images with alt text)
  - `category` (optional reference)
  - `author` (optional reference)
- Supporting documents:
  - `category`: `title`, `slug`
  - `author`: `name`, optional `image`
- Studio previews and ordering that make sense for editors, with the newest items first.

**2. Content contract (`frontend/src/types/newsletter.ts`, a shared surface)**
- `NewsletterSummary`: `slug`, `title`, `excerpt`, `publishedAt`, `coverImage?`, `category?`
- `NewsletterPost`: everything in `NewsletterSummary`, plus `body` and `author?`
- Image fields should resolve to `{ url, alt, width, height }`.
- Publish this contract and get frontend agreement before Codex wires up the UI.

**3. Server-only CMS layer (`frontend/src/lib/cms/`)**
- Add `import 'server-only'` to every module here.
- Use a `next-sanity` client with `perspective: 'published'`, a pinned `apiVersion` and `useCdn: true`.
- Write typed GROQ queries and these fetchers:
  - `getNewsletterList({ page, pageSize })` returns `{ items, total }`, sorted by `publishedAt` descending.
  - `getNewsletterBySlug(slug)` returns a `NewsletterPost`, or `null` if there's no match.
  - `getNewsletterSlugs()` supplies `generateStaticParams`.
- Tag every fetch (`newsletter`, `newsletter:<slug>`) so it can be revalidated on demand.
- Only include documents with `publishedAt <= now()`. Never return drafts.

**4. API routes (under `frontend/src/app/api/`, owned by you; tell Codex before you create them)**
- `POST /api/revalidate` is the Sanity webhook receiver:
  - Verify the signature with `@sanity/webhook` and `SANITY_REVALIDATE_SECRET`, and reject anything invalid with a 401.
  - Call `revalidateTag` for the list and for the affected slug.
- `POST /api/subscribe` handles mailing-list signups:
  - Validate input with zod (email plus a honeypot field).
  - Apply basic rate limiting per IP.
  - Return generic responses so the endpoint never reveals whether an address is already subscribed.
  - Call the provider through a `MailingListProvider` interface, with one adapter and double opt-in.
  - Don't pick a provider yourself. Ask before choosing one.
- Publishing a newsletter post never emails subscribers. Content and subscriptions stay separate.

**5. Environment variables (`.env.example`, a shared surface)**
- Commit placeholders only.
- Variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_VERSION`, `SANITY_API_READ_TOKEN` (only if the dataset is private), `SANITY_REVALIDATE_SECRET`, `MAILING_LIST_API_KEY`, `MAILING_LIST_AUDIENCE_ID`.
- Document each variable in `backend/README.md`.

## Non-negotiables
- No token or secret reaches client code. Only `NEXT_PUBLIC_*` variables may be public.
- No subscriber or member data in source control or logs.
- Don't touch page markup, components or styles under `frontend/src/app/` or `frontend/src/components/`.
- Coordinate before editing any shared surface: `package.json`, lockfiles, `.env.example` or the types file.

## Quality gate (before every handoff)
- Lint and `tsc --noEmit` pass.
- Vitest covers the following, with the Sanity client mocked:
  - the fetchers, including the not-found and empty cases
  - signature rejection on `/api/revalidate`
  - input validation and the honeypot on `/api/subscribe`
- The diff contains no secrets and no changes outside your scope.
- Commits use conventional style, for example `feat(cms): add newsletter schema`.

## Workflow
1. Before editing anything, claim the exact paths in `TASKS.md` and state your file scope.
2. Build in this order: schema, contract, fetchers, revalidation, subscribe. Stop after the contract and wait for frontend sign-off.
3. At handoff, report:
   - the files you changed
   - the decisions you made
   - the checks you ran and their results
   - the integration steps still open for Codex and for the project owner (Sanity project ID, webhook setup in the Sanity dashboard, Vercel environment variables)
