"use client";

import { useCallback, useEffect, useState } from "react";
import { CMAC_INVENTORY_SHEET_ID, CMAC_INVENTORY_WRITE_URL } from "@/lib/site-data";
import { postToSheet } from "@/lib/sheet-writer";
import { fetchInventory, type InventoryItem } from "@/lib/inventory";

type Mode = "add" | "remove";
type Tone = "idle" | "ok" | "warn" | "error";

type SavedEntry = {
  label: string;
  delta: number;
  detail: string;
  savedAt: string;
  synced: boolean;
};

const TODAY = new Date().toISOString().slice(0, 10);

const BLANK_FORM = {
  name: "",
  description: "",
  quantity: "",
  price: "",
  notes: "",
};

const BLANK_REMOVE_META = {
  date: TODAY,
  school: "",
  event: "",
  notes: "",
};

const QUICK_ITEMS = ["Case Water", "Snacks", "Candy Bars", "Chips", "Pretzels"];

const PENDING_KEY = "cmac-inventory-pending";

function holdLocally(record: Record<string, unknown>) {
  try {
    const pending = JSON.parse(localStorage.getItem(PENDING_KEY) ?? "[]") as unknown[];
    pending.push({ ...record, heldAt: new Date().toISOString() });
    localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  } catch {
    // A full or disabled localStorage should never block the UI.
  }
}

export default function InventoryPage() {
  const [mode, setMode] = useState<Mode>("add");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState<Tone>("idle");
  const [sessionLog, setSessionLog] = useState<SavedEntry[]>([]);
  const [saving, setSaving] = useState(false);

  // Add-stock form state.
  const [form, setForm] = useState(BLANK_FORM);
  const [removeMeta, setRemoveMeta] = useState(BLANK_REMOVE_META);

  // Remove-stock state: the real item list, plus how many of each were used.
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [itemsState, setItemsState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [used, setUsed] = useState<Record<string, number>>({});

  const updateForm = (field: keyof typeof BLANK_FORM, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const logEntry = (label: string, delta: number, detail: string, synced: boolean) => {
    setSessionLog((current) => [
      { label, delta, detail, savedAt: new Date().toLocaleTimeString(), synced },
      ...current,
    ]);
  };

  const loadItems = useCallback(async () => {
    setItemsState("loading");
    try {
      const rows = await fetchInventory();
      setItems(rows);
      setItemsState("ready");
    } catch {
      setItems([]);
      setItemsState("error");
    }
  }, []);

  // The remove tab can only work against real items, so load them on first open.
  useEffect(() => {
    if (mode === "remove" && itemsState === "idle") {
      void loadItems();
    }
  }, [mode, itemsState, loadItems]);

  const switchMode = (next: Mode) => {
    setMode(next);
    setStatusMessage("");
    setStatusTone("idle");
  };

  const setUsedCount = (name: string, value: number, max: number) => {
    const clamped = Math.max(0, Math.min(Number.isFinite(value) ? value : 0, max));
    setUsed((current) => ({ ...current, [name]: clamped }));
  };

  const updateRemoveMeta = (field: keyof typeof BLANK_REMOVE_META, value: string) => {
    setRemoveMeta((current) => ({ ...current, [field]: value }));
  };

  // -------------------------------------------------------------------------
  // Add stock
  // -------------------------------------------------------------------------
  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = form.name.trim();
    const quantity = Number(form.quantity);

    if (!name) {
      setStatusTone("error");
      setStatusMessage("Enter the item name before saving.");
      return;
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      setStatusTone("error");
      setStatusMessage("Enter a quantity greater than zero.");
      return;
    }

    const price = form.price.trim() === "" ? null : Number(form.price);
    if (price !== null && (!Number.isFinite(price) || price < 0)) {
      setStatusTone("error");
      setStatusMessage("Enter a valid price, or leave it blank.");
      return;
    }

    const record = {
      name,
      description: form.description.trim(),
      quantity,
      price,
      notes: form.notes.trim(),
    };

    setSaving(true);

    if (!CMAC_INVENTORY_WRITE_URL) {
      holdLocally(record);
      setStatusTone("warn");
      setStatusMessage(
        "Held in this browser — the Google Sheet connection is not set up yet. Nothing was lost."
      );
      logEntry(name, quantity, "Held in browser", false);
      setForm(BLANK_FORM);
      setSaving(false);
      return;
    }

    try {
      const result = await postToSheet(CMAC_INVENTORY_WRITE_URL, { target: "inventory", record });
      const newTotal = typeof result.quantity === "number" ? result.quantity : quantity;

      setStatusTone("ok");
      setStatusMessage(
        result.action === "updated"
          ? `Added ${quantity} to ${name}. Now ${newTotal} on hand.`
          : `Created ${name} with ${newTotal} on hand.`
      );
      logEntry(name, quantity, `Now ${newTotal} on hand`, true);
      setForm(BLANK_FORM);
      setItemsState("idle");
    } catch (error) {
      holdLocally(record);
      setStatusTone("error");
      setStatusMessage(
        `Could not reach the sheet (${error instanceof Error ? error.message : "unknown error"}). Saved in this browser instead.`
      );
      logEntry(name, quantity, "Held in browser", false);
      setForm(BLANK_FORM);
    } finally {
      setSaving(false);
    }
  };

  // -------------------------------------------------------------------------
  // Remove stock
  // -------------------------------------------------------------------------
  const pendingRemovals = Object.entries(used).filter(([, count]) => count > 0);

  const handleRemove = async () => {
    if (pendingRemovals.length === 0) {
      setStatusTone("error");
      setStatusMessage("Enter how many of at least one item were used.");
      return;
    }

    if (!removeMeta.date) {
      setStatusTone("error");
      setStatusMessage("Choose the date for this event usage.");
      return;
    }

    if (!removeMeta.school.trim()) {
      setStatusTone("error");
      setStatusMessage("Enter the school where the items were used.");
      return;
    }

    if (!removeMeta.event.trim()) {
      setStatusTone("error");
      setStatusMessage("Enter the event name for this usage record.");
      return;
    }

    setSaving(true);

    if (!CMAC_INVENTORY_WRITE_URL) {
      pendingRemovals.forEach(([name, count]) => {
        holdLocally({
          name,
          quantity: -count,
          date: removeMeta.date,
          school: removeMeta.school,
          event: removeMeta.event,
          notes: removeMeta.notes,
        });
        logEntry(name, -count, `${removeMeta.school} · ${removeMeta.event}`, false);
      });
      setStatusTone("warn");
      setStatusMessage("Held in this browser — the Google Sheet connection is not set up yet.");
      setUsed({});
      setSaving(false);
      return;
    }

    let succeeded = 0;
    const failures: string[] = [];

    for (const [name, count] of pendingRemovals) {
      try {
        const result = await postToSheet(CMAC_INVENTORY_WRITE_URL, {
          target: "inventory",
          record: {
            name,
            quantity: -count,
            date: removeMeta.date,
            school: removeMeta.school,
            event: removeMeta.event,
            notes: removeMeta.notes,
          },
        });
        const remaining = typeof result.quantity === "number" ? result.quantity : null;
        succeeded += 1;
        logEntry(
          name,
          -count,
          `${removeMeta.school} · ${removeMeta.event} · ${remaining !== null ? `${remaining} left` : "Removed"}`,
          true
        );
      } catch {
        holdLocally({
          name,
          quantity: -count,
          date: removeMeta.date,
          school: removeMeta.school,
          event: removeMeta.event,
          notes: removeMeta.notes,
        });
        failures.push(name);
        logEntry(name, -count, `${removeMeta.school} · ${removeMeta.event} · Held in browser`, false);
      }
    }

    if (failures.length === 0) {
      setStatusTone("ok");
      setStatusMessage(`Recorded usage for ${succeeded} item${succeeded === 1 ? "" : "s"} at ${removeMeta.school}.`);
    } else {
      setStatusTone("error");
      setStatusMessage(`Could not save: ${failures.join(", ")}. Held in this browser so nothing was lost.`);
    }

    setUsed({});
    setRemoveMeta((current) => ({ ...current, date: TODAY, notes: "" }));
    setSaving(false);
    void loadItems();
  };

  return (
    <main className="subpage inventory-page">
      <section className="subpage-hero">
        <p className="subpage-kicker">CMAC Inventory</p>
        <h1>Update Inventory</h1>
        <p>
          Add what you bought, or record what was used at an event. Either way the CMAC inventory sheet stays
          accurate.
        </p>
        <div className="snapshot-actions">
          <a className="apply-btn apply-btn--secondary" href="/cmac/snapshot-c2m0a2c3/inventory/view/">
            View Current Inventory
          </a>
          <a className="apply-btn apply-btn--secondary" href="/cmac/snapshot-c2m0a2c3/inventory/usage/">
            View Usage Ledger
          </a>
        </div>
      </section>

      <section className="content-card">
        <div className="inv-tabs" role="tablist" aria-label="Inventory action">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "add"}
            className={`inv-tab ${mode === "add" ? "inv-tab--active" : ""}`}
            onClick={() => switchMode("add")}
          >
            <span className="inv-tab-icon" aria-hidden="true">
              +
            </span>
            Bought Stock
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "remove"}
            className={`inv-tab ${mode === "remove" ? "inv-tab--remove" : ""}`}
            onClick={() => switchMode("remove")}
          >
            <span className="inv-tab-icon" aria-hidden="true">
              −
            </span>
            Used At Event
          </button>
        </div>

        <p className="inv-tab-hint">
          {mode === "add"
            ? "Just back from a supply run — log what you purchased."
            : "Event is over — tap the items you used and enter how many."}
        </p>

        {statusMessage && (
          <p className={`inventory-status inventory-status--${statusTone}`} role="status">
            {statusMessage}
          </p>
        )}

        {mode === "add" ? (
          <>
            <div className="inventory-quick-row">
              <span className="inventory-quick-label">Quick pick</span>
              {QUICK_ITEMS.map((quickItem) => (
                <button
                  key={quickItem}
                  type="button"
                  className="inventory-quick-btn"
                  onClick={() => updateForm("name", quickItem)}
                >
                  {quickItem}
                </button>
              ))}
            </div>

            <form onSubmit={handleAdd} className="inventory-form">
              <div className="staffing-form-grid">
                <label className="staffing-field">
                  <span>Item Name *</span>
                  <input
                    value={form.name}
                    onChange={(event) => updateForm("name", event.target.value)}
                    placeholder="Case Water"
                    autoComplete="off"
                  />
                </label>

                <label className="staffing-field">
                  <span>Quantity Purchased *</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    value={form.quantity}
                    onChange={(event) => updateForm("quantity", event.target.value)}
                    placeholder="12"
                  />
                </label>

                <label className="staffing-field">
                  <span>Description</span>
                  <input
                    value={form.description}
                    onChange={(event) => updateForm("description", event.target.value)}
                    placeholder="24-pack, 16.9 oz bottles"
                    autoComplete="off"
                  />
                </label>

                <label className="staffing-field">
                  <span>Price Each</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={form.price}
                    onChange={(event) => updateForm("price", event.target.value)}
                    placeholder="6.99"
                  />
                </label>

                <label className="staffing-field staffing-field--wide">
                  <span>Notes</span>
                  <textarea
                    value={form.notes}
                    onChange={(event) => updateForm("notes", event.target.value)}
                    placeholder="Sam's Club run for the winter concerts"
                  />
                </label>
              </div>

              <div className="staffing-actions">
                <button type="submit" className="apply-btn" disabled={saving}>
                  {saving ? "Saving…" : "Add To Inventory"}
                </button>
                <button
                  type="button"
                  className="apply-btn apply-btn--secondary"
                  onClick={() => {
                    setForm(BLANK_FORM);
                    setStatusMessage("");
                    setStatusTone("idle");
                  }}
                >
                  Clear
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            {itemsState === "loading" && (
              <p className="inventory-status inventory-status--idle">Loading your items…</p>
            )}

            {itemsState === "error" && (
              <p className="inventory-status inventory-status--error">
                Could not read the inventory sheet.{" "}
                <button type="button" className="inv-link-btn" onClick={() => void loadItems()}>
                  Try again
                </button>
              </p>
            )}

            {itemsState === "ready" && items.length === 0 && (
              <p className="inventory-status inventory-status--warn">
                Nothing is being tracked yet. Use the Bought Stock tab first.
              </p>
            )}

            {itemsState === "ready" && items.length > 0 && (
              <>
                <div className="staffing-form-grid">
                  <label className="staffing-field">
                    <span>Date *</span>
                    <input
                      type="date"
                      value={removeMeta.date}
                      onChange={(event) => updateRemoveMeta("date", event.target.value)}
                    />
                  </label>

                  <label className="staffing-field">
                    <span>School *</span>
                    <input
                      value={removeMeta.school}
                      onChange={(event) => updateRemoveMeta("school", event.target.value)}
                      placeholder="JFK Middle School"
                      autoComplete="off"
                    />
                  </label>

                  <label className="staffing-field staffing-field--wide">
                    <span>Event *</span>
                    <input
                      value={removeMeta.event}
                      onChange={(event) => updateRemoveMeta("event", event.target.value)}
                      placeholder="Winter Concert / Drama Night / Art Show"
                      autoComplete="off"
                    />
                  </label>

                  <label className="staffing-field staffing-field--wide">
                    <span>Notes</span>
                    <textarea
                      value={removeMeta.notes}
                      onChange={(event) => updateRemoveMeta("notes", event.target.value)}
                      placeholder="Used for the event, students assigned, any special notes"
                    />
                  </label>
                </div>

                <ul className="inv-use-list">
                  {items.map((entry) => {
                    const count = used[entry.name] ?? 0;
                    const remaining = entry.quantity - count;
                    return (
                      <li key={entry.name} className={`inv-use-row ${count > 0 ? "inv-use-row--active" : ""}`}>
                        <div className="inv-use-info">
                          <strong>{entry.name}</strong>
                          <span className="inv-use-onhand">
                            {entry.quantity} on hand
                            {count > 0 && <em> → {remaining} left</em>}
                          </span>
                        </div>
                        <div className="inv-stepper">
                          <button
                            type="button"
                            className="inv-step-btn"
                            aria-label={`Use one fewer ${entry.name}`}
                            disabled={count <= 0}
                            onClick={() => setUsedCount(entry.name, count - 1, entry.quantity)}
                          >
                            −
                          </button>
                          <input
                            type="number"
                            className={`inv-step-input ${count > 0 ? "inv-step-input--subtract" : ""}`}
                            inputMode="numeric"
                            min="0"
                            max={entry.quantity}
                            value={count === 0 ? "" : count}
                            placeholder="0"
                            aria-label={`Quantity of ${entry.name} used`}
                            onChange={(event) =>
                              setUsedCount(entry.name, Number(event.target.value), entry.quantity)
                            }
                          />
                          <button
                            type="button"
                            className="inv-step-btn"
                            aria-label={`Use one more ${entry.name}`}
                            disabled={count >= entry.quantity}
                            onClick={() => setUsedCount(entry.name, count + 1, entry.quantity)}
                          >
                            +
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="inv-sticky-save">
                  <span className="inv-sticky-summary">
                    {pendingRemovals.length === 0
                      ? "Nothing selected yet"
                      : `${pendingRemovals.length} item${pendingRemovals.length === 1 ? "" : "s"} · ${pendingRemovals.reduce((sum, [, n]) => sum + n, 0)} units`}
                  </span>
                  <div className="inv-sticky-buttons">
                    {pendingRemovals.length > 0 && (
                      <button
                        type="button"
                        className="apply-btn apply-btn--secondary"
                        onClick={() => setUsed({})}
                        disabled={saving}
                      >
                        Reset
                      </button>
                    )}
                    <button
                      type="button"
                      className="apply-btn"
                      onClick={() => void handleRemove()}
                      disabled={saving || pendingRemovals.length === 0}
                    >
                      {saving ? "Saving…" : "Record Usage"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {!CMAC_INVENTORY_WRITE_URL && (
          <p className="muted-copy inventory-setup-note">
            Setup needed: deploy <code>scripts/apps-script/cmac-sheet-writer.gs</code> and set{" "}
            <code>NEXT_PUBLIC_CMAC_INVENTORY_WRITE_URL</code>.{" "}
            <a
              href={`https://docs.google.com/spreadsheets/d/${CMAC_INVENTORY_SHEET_ID}/edit`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the sheet
            </a>
          </p>
        )}
      </section>

      {sessionLog.length > 0 && (
        <section className="content-card">
          <h2>Changed This Session</h2>
          <ul className="inventory-session-log">
            {sessionLog.map((entry, index) => (
              <li key={`${entry.label}-${index}`}>
                <strong className={entry.delta < 0 ? "inv-delta-down" : "inv-delta-up"}>
                  {entry.delta > 0 ? `+${entry.delta}` : entry.delta}
                </strong>
                <span>{entry.label}</span>
                <span
                  className={
                    entry.synced ? "inventory-chip inventory-chip--ok" : "inventory-chip inventory-chip--warn"
                  }
                >
                  {entry.detail}
                </span>
                <span className="inventory-time">{entry.savedAt}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
