export type SheetWriteResult = {
  ok: boolean;
  action?: "created" | "updated";
  error?: string;
  [key: string]: unknown;
};

/**
 * Posts a record to the CMAC Apps Script web app.
 *
 * The body is sent as text/plain on purpose. Apps Script web apps cannot answer
 * a CORS preflight, and an "application/json" content type forces the browser
 * to send one — so the write would fail before it ever reached Google. A
 * text/plain body keeps this a "simple" request with no preflight; the script
 * parses it with JSON.parse either way.
 */
export async function postToSheet(
  endpoint: string,
  payload: { target: "inventory" | "staffing"; record: Record<string, unknown> }
): Promise<SheetWriteResult> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Sheet endpoint returned ${response.status}`);
  }

  const raw = await response.text();

  let parsed: SheetWriteResult;
  try {
    parsed = JSON.parse(raw) as SheetWriteResult;
  } catch {
    throw new Error("The sheet endpoint did not return JSON. Re-deploy the Apps Script as a new version.");
  }

  if (!parsed.ok) {
    throw new Error(parsed.error || "The sheet rejected the record.");
  }

  return parsed;
}
