"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CMAC_INVENTORY_SHEET_ID } from "@/lib/site-data";
import { fetchInventoryUsage, type InventoryUsageRecord } from "@/lib/inventory";

type LoadState = "loading" | "ready" | "empty" | "error";

export default function InventoryUsagePage() {
  const [entries, setEntries] = useState<InventoryUsageRecord[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [generatedAt, setGeneratedAt] = useState("");

  const load = useCallback(async () => {
    setState("loading");

    try {
      const rows = await fetchInventoryUsage();
      setEntries(rows);
      setState(rows.length > 0 ? "ready" : "empty");
      setGeneratedAt(
        new Date().toLocaleString("en-US", {
          dateStyle: "long",
          timeStyle: "short",
        })
      );
    } catch {
      setEntries([]);
      setState("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const totals = useMemo(() => {
    const totalIn = entries.reduce((sum, entry) => sum + entry.quantityIn, 0);
    const totalOut = entries.reduce((sum, entry) => sum + entry.quantityOut, 0);
    return { totalIn, totalOut };
  }, [entries]);

  return (
    <main className="subpage inventory-page inventory-report">
      <section className="subpage-hero report-screen-only">
        <p className="subpage-kicker">CMAC Inventory</p>
        <h1>Usage Ledger</h1>
        <p>All inventory movement in date order so board members can review what was used and when.</p>
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
          <a className="apply-btn apply-btn--secondary" href="/cmac/snapshot-c2m0a2c3/inventory/view/">
            View Current Inventory
          </a>
        </div>
      </section>

      <section className="content-card report-sheet">
        <header className="report-head">
          <div className="report-head-main">
            <h2>Comsewogue Music &amp; Arts Corp.</h2>
            <p className="report-subtitle">Inventory Usage Ledger</p>
          </div>
          <div className="report-head-meta">
            <span>Generated</span>
            <strong>{generatedAt || "—"}</strong>
          </div>
        </header>

        {state === "loading" && <p className="inventory-status inventory-status--idle">Loading usage ledger…</p>}

        {state === "error" && (
          <p className="inventory-status inventory-status--error">
            Could not read the usage log. Make sure the CMAC_INVENTORY_LOG sheet is shared and refresh.
            <a
              href={`https://docs.google.com/spreadsheets/d/${CMAC_INVENTORY_SHEET_ID}/edit`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the workbook
            </a>
          </p>
        )}

        {state === "empty" && (
          <>
            <p className="inventory-status inventory-status--warn">
              No inventory usage has been logged yet. Record a used-at-event item to populate this ledger.
            </p>
            <table className="report-table">
              <thead>
                <tr>
                  <th className="report-col-date">Date</th>
                  <th className="report-col-item">Item</th>
                  <th>School</th>
                  <th>Event</th>
                  <th className="report-col-num">In</th>
                  <th className="report-col-num">Out</th>
                  <th className="report-col-num">Total</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", color: "#5b6877", fontStyle: "italic" }}>
                    No transactions recorded yet.
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {state === "ready" && (
          <>
            <table className="report-table">
              <thead>
                <tr>
                  <th className="report-col-date">Date</th>
                  <th className="report-col-item">Item</th>
                  <th>School</th>
                  <th>Event</th>
                  <th className="report-col-num">In</th>
                  <th className="report-col-num">Out</th>
                  <th className="report-col-num">Total</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={`${entry.date}-${entry.itemName}-${entry.school}-${entry.eventName}-${entry.updatedAt}`}>
                    <td>{entry.date || "—"}</td>
                    <td><strong>{entry.itemName || "—"}</strong></td>
                    <td>{entry.school || "—"}</td>
                    <td>{entry.eventName || "—"}</td>
                    <td className="report-col-num">{entry.quantityIn || 0}</td>
                    <td className="report-col-num">{entry.quantityOut || 0}</td>
                    <td className="report-col-num">{entry.quantityTotal || 0}</td>
                    <td>{entry.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={4}>Total movement</th>
                  <td className="report-col-num">{totals.totalIn}</td>
                  <td className="report-col-num">{totals.totalOut}</td>
                  <td className="report-col-num" colSpan={2}>
                    {entries.length} record{entries.length === 1 ? "" : "s"}
                  </td>
                </tr>
              </tfoot>
            </table>

            <footer className="report-foot">
              <span>Comsewogue Music &amp; Arts Corp. · Board inventory usage ledger</span>
              <span>Source: CMAC_INVENTORY_LOG Google Sheet</span>
            </footer>
          </>
        )}
      </section>
    </main>
  );
}
