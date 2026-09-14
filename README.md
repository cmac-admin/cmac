A minimal Next.js app.

Run the development server with `npm run dev`.

Site data is configured through environment variables so the website can read order links and live metrics from a single Google Sheet without code changes:

- `NEXT_PUBLIC_CMAC_SITE_DATA_SHEET_ID`
- `NEXT_PUBLIC_CMAC_ORDER_SHEET_GID`
- `NEXT_PUBLIC_CMAC_METRICS_SHEET_GID`
- `NEXT_PUBLIC_CMAC_EVENT_STAFFING_SHEET_NAME` (default: `CMAC_EVENT_STAFFING`)
- `NEXT_PUBLIC_CMAC_EVENT_STAFFING_WRITE_URL` (optional Apps Script web-app URL for write-back support)

Copy `.env.example` to `.env.local` and update the values to match the CMAC spreadsheet setup. The staffing dashboard reads the `CMAC_EVENT_STAFFING` tab and, if a write URL is configured, posts saved staffing updates back to the sheet through a Google Apps Script or other proxy endpoint.
