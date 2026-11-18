A minimal Next.js app.

Run the development server with `npm run dev`.

The site is deployed at the root of `https://www.comsewoguemusicandarts.org/`.
Keep Next.js `basePath` unset and use root-relative links and public asset URLs
(for example, `/about/` and `/cmac-logo.png`), without the old `/cmac/` prefix.

The snapshot calendar prefers district dates and times, retaining CMAC table details
and curated-only events. A single district occurrence replaces the old date of a
matching single curated event; repeated titles retain their separate performances.
Run the merge regression tests with `node --test scripts/snapshot-events.test.mjs`
(Node.js 22.18+).

Site data is configured through environment variables so the website can read order links and live metrics from a single Google Sheet without code changes:

- `NEXT_PUBLIC_CMAC_SITE_DATA_SHEET_ID`
- `NEXT_PUBLIC_CMAC_ORDER_SHEET_GID`
- `NEXT_PUBLIC_CMAC_METRICS_SHEET_GID`
Copy `.env.example` to `.env.local` and update the values to match the CMAC spreadsheet setup.
