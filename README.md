A minimal Next.js app.

Run the development server with `npm run dev`.

Site data is configured through environment variables so the website can read order links and live metrics from a single Google Sheet without code changes:

- `NEXT_PUBLIC_CMAC_SITE_DATA_SHEET_ID`
- `NEXT_PUBLIC_CMAC_ORDER_SHEET_GID`
- `NEXT_PUBLIC_CMAC_METRICS_SHEET_GID`
Copy `.env.example` to `.env.local` and update the values to match the CMAC spreadsheet setup.
