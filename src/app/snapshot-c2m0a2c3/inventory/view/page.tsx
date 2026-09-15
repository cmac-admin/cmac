"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CMAC_INVENTORY_SHEET_ID } from "@/lib/site-data";
import { fetchInventory, type InventoryItem } from "@/lib/inventory";

type LoadState = "loading" | "ready" | "empty" | "error";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function ViewInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [generatedAt, setGeneratedAt] = useState("");

  const load = useCallback(async () => {
    setState("loading");

    try {
      const rows = await fetchInventory();
      const sorted = [...rows].sort((a, b) => a.name.localeCompare(b.name));
      setItems(sorted);
      setState(sorted.length > 0 ? "ready" : "empty");
      setGeneratedAt(
        new Date().toLocaleString("en-US", {
          dateStyle: "long",
          timeStyle: "short",
        })
      );
    } catch {
      setItems([]);
      setState("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const totals = useMemo(() => {
    const units = items.reduce((sum, entry) => sum + (Number.isFinite(entry.quantity) ? entry.quantity : 0), 0);
    const value = items.reduce((sum, entry) => {
      if (entry.price === null || !Number.isFinite(entry.price)) return sum;
      return sum + entry.price * (Number.isFinite(entry.quantity) ? entry.quantity : 0);
    }, 0);
    const outOfStock = items.filter((entry) => entry.quantity <= 0).length;
    return { units, value, outOfStock };
  }, [items]);

  return (
    <main className="subpage inventory-page inventory-report">
      {/* Screen-only controls; hidden when printed. */}
      <section className="subpage-hero report-screen-only">
        <p className="subpage-kicker">CMAC Inventory</p>
        <h1>Inventory Report</h1>
        <p>Current quantities on hand, pulled live from the CMAC inventory sheet.</p>
        <div className="snapshot-actions">
          <button type="button" className="apply-btn" onClick={() => window.print()}>
            Print Report
          </button>
          <button type="button" className="apply-btn apply-btn--secondary" onClick={() => void load()}>
            Refresh
          </button>
          <a className="apply-btn apply-btn--secondary" href="/cmac/snapshot-c2m0a2c3/inventory/">
            Update Inventory
          </a>
          <a className="apply-btn apply-btn--secondary" href="/cmac/snapshot-c2m0a2c3/inventory/usage/">
            View Usage Ledger
          </a>
        </div>
      </section>

      <section className="content-card report-sheet">
        {/* Report letterhead — only meaningful on paper, but harmless on screen. */}
        <header className="report-head">
          <div className="report-head-main">
            <h2>Comsewogue Music &amp; Arts Corp.</h2>
            <p className="report-subtitle">Inventory On Hand Report</p>
          </div>
          <div className="report-head-meta">
            <span>Generated</span>
            <strong>{generatedAt || "—"}</strong>
          </div>
        </header>

        {state === "loading" && <p className="inventory-status inventory-status--idle">Loading inventory…</p>}

        {state === "error" && (
          <p className="inventory-status inventory-status--error">
            Could not read the inventory sheet. Make sure it is shared as &ldquo;Anyone with the link can
            view&rdquo;, then refresh.{" "}
            <a
              href={`https://docs.google.com/spreadsheets/d/${CMAC_INVENTORY_SHEET_ID}/edit`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the sheet
            </a>
          </p>
        )}

        {state === "empty" && (
          <p className="inventory-status inventory-status--warn">
            No inventory is being tracked yet.
          </p>
        )}

        {state === "ready" && (
          <>
            <table className="report-table">
              <thead>
                <tr>
                  <th className="report-col-item">Item</th>
                  <th className="report-col-desc">Description</th>
                  <th className="report-col-num">Qty On Hand</th>
                  <th className="report-col-num">Unit Price</th>
                  <th className="report-col-num">Value</th>
                </tr>
              </thead>
              <tbody>
                {items.map((entry) => {
                  const hasPrice = entry.price !== null && Number.isFinite(entry.price);
                  const lineValue = hasPrice ? (entry.price as number) * entry.quantity : null;
                  return (
                    <tr key={entry.name} className={entry.quantity <= 0 ? "report-row--empty" : undefined}>
                      <td className="report-col-item">
                        <strong>{entry.name}</strong>
                      </td>
                      <td className="report-col-desc">{entry.description || "—"}</td>
                      <td className="report-col-num report-qty">{entry.quantity}</td>
                      <td className="report-col-num">{hasPrice ? currency.format(entry.price as number) : "—"}</td>
                      <td className="report-col-num">{lineValue !== null ? currency.format(lineValue) : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={2} className="report-col-item">
                    Totals — {items.length} item{items.length === 1 ? "" : "s"}
                  </th>
                  <td className="report-col-num report-qty">{totals.units}</td>
                  <td className="report-col-num">—</td>
                  <td className="report-col-num">{currency.format(totals.value)}</td>
                </tr>
              </tfoot>
            </table>

            {totals.outOfStock > 0 && (
              <p className="report-flag">
                {totals.outOfStock} item{totals.outOfStock === 1 ? " is" : "s are"} out of stock and may need
                restocking before the next event.
              </p>
            )}

            <footer className="report-foot">
              <span>Comsewogue Music &amp; Arts Corp. · Board inventory report</span>
              <span>Source: CMAC_INVENTORY Google Sheet</span>
            </footer>
          </>
        )}
      </section>
    </main>
  );
}
