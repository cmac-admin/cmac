import {
  buildGoogleSheetQueryUrl,
  CMAC_INVENTORY_SHEET_ID,
  CMAC_INVENTORY_SHEET_NAME,
} from "@/lib/site-data";

/**
 * Mirrors the CMAC_INVENTORY sheet columns:
 * item_id | Item_name | Item_description | Item_qty | Item_Price | Item_Notes
 */
export type InventoryItem = {
  itemId: string;
  name: string;
  description: string;
  quantity: number;
  price: number | null;
  notes: string;
};

export function normalizeText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const cleaned = normalizeText(value).replace(/[^0-9.-]/g, "");
  if (!cleaned) return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function stripGoogleJsonWrapper(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return raw;

  return trimmed.startsWith("/*O_o*/")
    ? trimmed
        .replace(/^\/\*O_o\*\/\s*google\.visualization\.Query\.setResponse\(/, "")
        .replace(/\);?\s*$/, "")
    : trimmed;
}

const normalizeHeader = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "");

export function parseInventoryRows(raw: string): InventoryItem[] {
  const payload = stripGoogleJsonWrapper(raw);

  try {
    const parsed = JSON.parse(payload) as {
      table?: {
        cols?: Array<{ label?: string | null } | null>;
        rows?: Array<{ c?: Array<{ v?: string | number | null } | null> | undefined }>;
      };
    };

    const rows = parsed.table?.rows ?? [];
    const colLabels = (parsed.table?.cols ?? []).map((col) => normalizeHeader(normalizeText(col?.label ?? "")));

    // gviz usually promotes row 1 to column labels, but if the sheet was read
    // without headers the first data row carries them instead.
    const firstRow = (rows[0]?.c ?? []).map((cell) => normalizeHeader(normalizeText(cell?.v ?? "")));
    const headerInFirstRow = firstRow.includes("itemname") || firstRow.includes("item") || firstRow.includes("itemqty");

    const headers = headerInFirstRow ? firstRow : colLabels;
    const dataRows = headerInFirstRow ? rows.slice(1) : rows;

    const indexOf = (aliases: string[]) => {
      const normalized = aliases.map(normalizeHeader);
      return headers.findIndex((header) => normalized.includes(header));
    };

    const idIndex = indexOf(["item_id", "itemid", "id"]);
    const nameIndex = indexOf(["item_name", "itemname", "item", "name", "product"]);
    const descriptionIndex = indexOf(["item_description", "itemdescription", "description", "desc"]);
    const qtyIndex = indexOf(["item_qty", "itemqty", "qty", "quantity", "on_hand", "onhand", "count"]);
    const priceIndex = indexOf(["item_price", "itemprice", "price", "cost"]);
    const notesIndex = indexOf(["item_notes", "itemnotes", "notes", "note", "comments"]);

    const cellAt = (
      cells: Array<{ v?: string | number | null } | null> | undefined,
      index: number
    ) => (index >= 0 ? cells?.[index]?.v ?? "" : "");

    const byName = new Map<string, InventoryItem>();

    for (const row of dataRows) {
      const cells = row.c ?? [];
      const name = normalizeText(cellAt(cells, nameIndex));
      if (!name) continue;

      const quantity = toNumber(cellAt(cells, qtyIndex)) ?? 0;
      const price = toNumber(cellAt(cells, priceIndex));
      const key = name.toLowerCase();
      const existing = byName.get(key);

      if (existing) {
        // Safety net in case the sheet ever ends up with duplicate item rows.
        existing.quantity += quantity;
        existing.description = existing.description || normalizeText(cellAt(cells, descriptionIndex));
        existing.notes = existing.notes || normalizeText(cellAt(cells, notesIndex));
        if (existing.price === null) existing.price = price;
        continue;
      }

      byName.set(key, {
        itemId: normalizeText(cellAt(cells, idIndex)),
        name,
        description: normalizeText(cellAt(cells, descriptionIndex)),
        quantity,
        price,
        notes: normalizeText(cellAt(cells, notesIndex)),
      });
    }

    return Array.from(byName.values()).sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

export async function fetchInventory(): Promise<InventoryItem[]> {
  const sheetUrl = buildGoogleSheetQueryUrl(CMAC_INVENTORY_SHEET_NAME, CMAC_INVENTORY_SHEET_ID);
  const response = await fetch(sheetUrl, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Inventory sheet request failed with ${response.status}`);
  }

  return parseInventoryRows(await response.text());
}
